import React, { useCallback, useEffect, useRef, useState } from 'react';

import DataGrid, {
  Column, FilterRow, Search, SearchPanel, Selection,
  HeaderFilter, Scrolling,
  FilterPanel,
  Pager, Paging, DataGridTypes,
} from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';

import { Workbook } from 'exceljs';
import saveAs from "file-saver";
import SelectBox, { SelectBoxTypes } from 'devextreme-react/select-box';
import CheckBox, { CheckBoxTypes } from 'devextreme-react/check-box';
import CommanCLS from '../../services/CommanService';
import CustomLoader from '../../components/CustomLoader';
import { useNavigate } from 'react-router';
import DataNotFound from '../../components/DataNotFound';
import DownloadIcon from '@mui/icons-material/Download';
import ToggleButton from '@mui/material/ToggleButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
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
function Contact({ clientId,clientName }) {
  console.log(clientName,"clientNamefjdsfjerio", typeof clientId);
  const navigate = useNavigate();

  const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
  const [password, setPassword] = useState(localStorage.getItem("Password"));
  const [Email, setEmail] = useState(localStorage.getItem("Email"));
  const [folderId, setFolderId] = useState(localStorage.getItem("FolderId"));
  const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";// base url for api
  const [anchorElDown, setAnchorElDown] = useState(null);
  //   let dt = new LoginDetails();
  let cls = new CommanCLS(baseUrl, agrno, Email, password);

  const [showFilterRow, setShowFilterRow] = useState(true);
  const [showHeaderFilter, setShowHeaderFilter] = useState(true);
  const [currentFilter, setCurrentFilter] = useState(applyFilterTypes[0].key);

  const [allContactList, setAllContactList] = useState([]);
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
  const Json_GetContactListByFolder = () => {
    try {
      let obj = { intFolderId: folderId };
      cls.Json_GetContactListByFolder(obj, (sts, data) => {
        if (sts && data) {
          if (data) {
            let js = JSON.parse(data);
            console.log("Json_GetContactListByFolder", js?.Table);
            if (js && js?.Table.length > 0) {
              let res = js.Table.map((el) => {
                el["Date Of Birth"] = cls.DateFormateDate(el["Date Of Birth"]);
                return el;
              }).filter(itm => itm.OriginatorNo === clientId);
              exportTaskData = [...res];
              console.log(res,"resdata");
              setAllContactList(res)
              if (res.length === 0) {
                setDataNotFound(true);
              }
            }
          }

        }
      })
    } catch (error) {
      console.log({ "Message": "Data Not Found NetWork Error", Error: error })
    }
  }
  useEffect(() => {
    Json_GetContactListByFolder();

  }, [])

  const handleRowDoubleClick = (e) => {
    navigate(`/dashboard/ContactDetails?originatorNo=${e.data.OriginatorNo}&contactNo=${e.data.ContactNo}`, {
      state: {
        agrno: agrno,
        Email: Email,
        password: password,
        folderId: folderId,
        originatorNo: e.data.OriginatorNo,
        contactNo: e.data.ContactNo
      }
    })
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
    const headerRow = worksheet.addRow(["OriginatorNo", "First Name", "Last Name", "Main Contact", "ManagerName", "Folder", "Note", "Date Of Birth"]);

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
        item?.OriginatorNo,
        item["First Name"],
        item["Last Name"],
        item["Main Contact"],
        item?.ManagerName,
        item?.Folder,
        item?.Note,
        item["Date Of Birth"]
      ]);
    });

    // Set column widths to add space between columns (in pixels)
    worksheet.columns.forEach(column => {
      column.width = 30; // Adjust as needed
    });

    workbook.xlsx.writeBuffer().then(function (buffer) {
      saveAs(
        new Blob([buffer], { type: "application/octet-stream" }),
        `${clientName+"_Contacts" ? clientName+"_Contacts" : ""}.xlsx`
      );
    });
  };

  const ExportData = useCallback(() => {
    console.log("exportData", exportTaskData);
    exportexcel(exportTaskData ? exportTaskData : []); // Export data from 
    setAnchorElDown(null);
  }, []);
  console.log(allContactList, "exportData1");
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


        {dataNotFound ? <DataNotFound /> : (allContactList.length > 0 ?
          <><DataGrid
            id="gridContainer"
            className='client-card-contact-grid'
            ref={dataGridRef}
            dataSource={allContactList}
            onRowDblClick={handleRowDoubleClick}
            keyExpr="E-Mail"
            showBorders={true}>
            <FilterRow visible={true} />
            <FilterPanel visible={true} />
            <HeaderFilter visible={true} />
            {/* <Scrolling  rowRenderingMode="virtual" /> */}
            <Scrolling mode="standard" />
            <Selection
              mode="multiple" />
            <Paging defaultPageSize={20} />
            <Pager
              visible={true} />
            <SearchPanel
              visible={true}
              width={240}
              placeholder="Search..." />


            <Column
              dataField="OriginatorNo"
              caption="OriginatorNo">
              {/* <HeaderFilter groupInterval={10000} /> */}
            </Column>
            <Column
              dataField="First Name"
              // alignment="right"
              caption="First Name" />
            <Column
              dataField="Last Name"
              // alignment="right"
              caption="Last Name" />

            <Column
              dataField="Main Contact"
              // alignment="right"
              caption="Main Contact" />


            <Column dataField="ManagerName" />
            <Column dataField="Folder" />
            <Column dataField="Note" />
            <Column
              dataField="Date Of Birth"
              // alignment="right"
              dataType="date"
              caption="Date Of Birth"
              // format="M/d/yyyy, HH:mm" 
              format="d/M/yyyy" 
              />
          </DataGrid></> : <CustomLoader />)}
      </div>
    </>
  )
}

export default Contact


const orders = [{
  ID: 1,
  OrderNumber: 35703,
  OrderDate: '2017/04/10',
  DeliveryDate: '2017/04/13 9:00',
  SaleAmount: 11800,
  Terms: '15 Days',
  CustomerStoreCity: 'Los Angeles, CA',
  Employee: 'Harv Mudd',
}, {
  ID: 4,
  OrderNumber: 35711,
  OrderDate: '2017/01/12',
  DeliveryDate: '2017/01/13 9:00',
  SaleAmount: 16050,
  Terms: '15 Days',
  CustomerStoreCity: 'San Jose, CA',
  Employee: 'Jim Packard',
},
];
