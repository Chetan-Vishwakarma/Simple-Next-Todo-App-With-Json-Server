import React, { useCallback, useEffect, useRef, useState } from 'react';

import DataGrid, {
  Column, FilterRow, Search, SearchPanel, Selection,
  HeaderFilter, Scrolling,
  FilterPanel,
  Pager, Paging, DataGridTypes,
} from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';
import { useSelector } from 'react-redux';
import ToggleButton from '@mui/material/ToggleButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Workbook } from 'exceljs';
import saveAs from "file-saver";
import SelectBox, { SelectBoxTypes } from 'devextreme-react/select-box';
import CheckBox, { CheckBoxTypes } from 'devextreme-react/check-box';
import CommanCLS from '../../services/CommanService';
import CustomLoader from '../../components/CustomLoader';
import DataNotFound from '../../components/DataNotFound';
import DownloadIcon from '@mui/icons-material/Download';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Fileformat from '../../images/files-icon/pdf.png';

const saleAmountEditorOptions = { format: 'currency', showClearButton: true };
const filterLabel = { 'aria-label': 'Filter' };




const applyFilterTypes = [{
  key: 'auto',
  name: 'Immediately',
}, {
  key: 'onClick',
  name: 'On Button Click',
}];

const saleAmountHeaderFilter = [{
  text: 'Less than $3000',
  value: ['SaleAmount', '<', 3000],
}, {
  text: '$3000 - $5000',
  value: [
    ['SaleAmount', '>=', 3000],
    ['SaleAmount', '<', 5000],
  ],
}, {
  text: '$5000 - $10000',
  value: [
    ['SaleAmount', '>=', 5000],
    ['SaleAmount', '<', 10000],
  ],
}, {
  text: '$10000 - $20000',
  value: [
    ['SaleAmount', '>=', 10000],
    ['SaleAmount', '<', 20000],
  ],
}, {
  text: 'Greater than $20000',
  value: ['SaleAmount', '>=', 20000],
}];

const getOrderDay = (rowData) => (new Date(rowData.OrderDate)).getDay();

function calculateFilterExpression(value, target) {
  const column = this;

  if (target === 'headerFilter' && value === 'weekends') {
    return [[getOrderDay, '=', 0], 'or', [getOrderDay, '=', 6]];
  }

  return column.defaultCalculateFilterExpression(value, target);
}

const orderHeaderFilter = (data) => {
  data.dataSource.postProcess = (results) => {
    results.push({
      text: 'Weekends',
      value: 'weekends',
    });

    return results;
  };
};

let exportTaskData = [];
function TaskList({ clientName }) {
  const reduxData = useSelector((state) => state.counter.reduxData);
  console.log(reduxData,"reduxdatasonam");
  const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
  const [password, setPassword] = useState(localStorage.getItem("Password"));
  const [Email, setEmail] = useState(localStorage.getItem("Email"));
  const [folderId, setFolderId] = useState(localStorage.getItem("FolderId"));
  const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";// base url for api

  //   let dt = new LoginDetails();
  let cls = new CommanCLS(baseUrl, agrno, Email, password);

  const [showFilterRow, setShowFilterRow] = useState(true);
  const [showHeaderFilter, setShowHeaderFilter] = useState(true);
  const [currentFilter, setCurrentFilter] = useState(applyFilterTypes[0].key);

  const [anchorElDown, setAnchorElDown] = useState(null);
  const [outlookTaskList, setOutlookTaskList] = useState([]);
  const [ExportTaskListData, setExportTaskListData] = useState([]);
  const [dataNotFound, setDataNotFound] = useState(false);

  const dataGridRef = useRef(null);

  // const clearFilter = useCallback(() => {
  //     dataGridRef.current.instance.clearFilter();
  // }, []);

  // const onShowFilterRowChanged = useCallback((e) => {
  //     setShowFilterRow(e.value);
  //     clearFilter();
  // }, [clearFilter]);

  // const onShowHeaderFilterChanged = useCallback((e) => {
  //     setShowHeaderFilter(e.value);
  //     clearFilter();
  // }, [clearFilter]);

  // const onCurrentFilterChanged = useCallback((e) => {
  //     setCurrentFilter(e.value);
  // }, []);


  const Json_CRM_GetOutlookTask = () => {
    try {
      cls.Json_CRM_GetOutlookTask_ForTask((sts, data) => {
        if (sts) {
          if (data) {
            let json = JSON.parse(data);
            console.log("Json_CRM_GetOutlookTasksonam", json?.Table);
            if (json?.Table.length > 0) {
              let filteredData = json.Table.filter(itm => itm["EndDateTime"] !== null && !itm["EndDateTime"].split("").includes("-") && itm["Start"] !== null && !itm["Start"].split("").includes("-") && itm.Client === clientName);
              filteredData.map(itm => {
                const timeStamp1 = parseInt(itm["EndDateTime"].match(/\d+/)[0]);
                itm["EndDateTime"] = new Date(timeStamp1);
                const timeStamp2 = parseInt(itm["Start"].match(/\d+/)[0]);
                itm["Start"] = new Date(timeStamp2);
              })
              if (filteredData.length === 0) {
                setDataNotFound(true);
              }
              console.log("filteredData", filteredData)
              setOutlookTaskList(filteredData);
              exportTaskData = [...filteredData];
              setExportTaskListData([...filteredData]);
            }

          }
        }
      });
    } catch (err) {
      console.log("Error while calling Json_CRM_GetOutlookTask", err);
    }
  }

  useEffect(() => {
    Json_CRM_GetOutlookTask();

  }, [])

  const cellRender = (data) => {
    if (data) {
      let dt = data.data;
      let statusClass = '';
      switch (dt.mstatus) {
        case "Not Started":
          statusClass = 'badge text-bg-danger';
          break;
        case "Completed":
          statusClass = 'badge text-bg-success';
          break;
        case "On Hold":
          statusClass = 'badge text-bg-warning';
          break;
        case "In Progress":
          statusClass = 'badge text-bg-primary';
          break;
        default:
          statusClass = 'badge text-bg-info';
      }
      return <span className={statusClass}>{dt.mstatus}</span>;
    }
  };
  const handleMenuOpen = (event) => {
    setAnchorElDown(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElDown(null);
  };
  const exportexcel = (data) => {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("SheetName");
    console.log(data, "worksheetdata");
    // Add column headers
    const headerRow = worksheet.addRow(["ClientNo", "Client", "Section", "Forwarded By", "Start", "EndDateTime", "Subject", "mstatus", "Source"]);

    // Apply bold formatting to header row
    headerRow.eachCell((cell, colNumber) => {
      cell.font = { bold: true };
    });

    // Add data rows
    data.forEach((item, index) => {
      let timestamp;
      let date;
      // if (item["EndDateTime"]) {
      // timestamp = parseInt(item["EndDateTime"].slice(6, -2));
      // date = startFormattingDate(timestamp);
      // } else {
      // date = '';
      // }
      worksheet.addRow([
        item?.ClientNo,
        item?.Client,
        item?.Section,
        item["Forwarded By"],
        item?.Start,
        item?.EndDateTime,
        item?.Subject,
        item?.mstatus,
        item?.Source
      ]);
    });

    // Set column widths to add space between columns (in pixels)
    worksheet.columns.forEach(column => {
      column.width = 30; // Adjust as needed
    });

    workbook.xlsx.writeBuffer().then(function (buffer) {
      saveAs(
        new Blob([buffer], { type: "application/octet-stream" }),
        `${clientName+"_Tasks" ? clientName+"_Tasks" : ""}.xlsx`
      );
    });
  };

  const ExportData = useCallback(() => {
    console.log("exportData", ExportTaskListData);
    exportexcel(ExportTaskListData ? ExportTaskListData : []); // Export data from 
    setAnchorElDown(null);
  }, [ExportTaskListData]);
  const handleRowDoubleClick = (e) => {
    // Handle double click event on the row
    console.log('Row double-clicked sdaskldjsajlaj:', e.data);
    // if(selectedChoice==="All" || selectedChoice==="Contacts"){
    //     let orgNo = e.data.OriginatorNo;
    //     let contactNo = e.data.ContactNo;
    //     handleContactNavigattion(orgNo, contactNo);
    // }else{
    //     let originatorNo = e.data.OriginatorNo;
    //     handleClientNavigation(originatorNo);
    // }
  };

  return (
    <>
      <div className='btn-downloads'>
        <ToggleButton
          size='small'
          value="check" className='mx-2'
          onClick={handleMenuOpen}
        >
          <DownloadIcon />
        </ToggleButton><Menu
          anchorEl={anchorElDown}
          open={Boolean(anchorElDown)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={ExportData}><InsertDriveFileIcon />  Export to Excel</MenuItem>
        </Menu>
      </div>
      <div className='table-responsive table-grid table-grid-2'>

        {dataNotFound ? <DataNotFound /> : (outlookTaskList.length > 0 ? <DataGrid
          id="gridContainer"
          className='client-card-task-grid'
          ref={dataGridRef}
          dataSource={outlookTaskList}
          keyExpr="ID"
          onRowDblClick={handleRowDoubleClick}
          showBorders={true}>
          <FilterRow visible={true} />
          <FilterPanel visible={true} />
          <HeaderFilter visible={true} />
          {/* <Scrolling  rowRenderingMode="virtual" /> */}
          <Scrolling mode="standard" />
          <Selection
            mode="multiple"
          />
          <Paging defaultPageSize={20} />
          <Pager
            visible={true} />
          <SearchPanel
            visible={true}
            width={240}
            placeholder="Search..." />


          <Column
            dataField="ID"
            caption="Client ID">
            {/* <HeaderFilter groupInterval={10000} /> */}
          </Column>
          <Column
            dataField="Client"
            // alignment="right"
            caption="Client Name"
          // format="M/d/yyyy, HH:mm"
          />
          <Column
            dataField="Section"
            // alignment="right"
            caption="Section"
          // format="M/d/yyyy, HH:mm"
          />

          <Column
            dataField="Forwarded By"
            // alignment="right"
            caption="Forwarded By"
          // format="M/d/yyyy, HH:mm"
          />


          <Column
            dataField="Start"
            dataType="date"
            format="d/M/yyyy"
          />
          <Column dataField="EndDateTime"
            dataType="date"
            format="d/M/yyyy"
          />
          <Column dataField="Subject" />
          <Column
            dataField="mstatus"
            cellRender={cellRender}
          />
          <Column
            dataField="Source"
          />

        </DataGrid> : <CustomLoader />)}
      </div>
    </>
  )
}

export default TaskList


