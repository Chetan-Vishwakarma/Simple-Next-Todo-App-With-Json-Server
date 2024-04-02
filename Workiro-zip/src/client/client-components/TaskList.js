import React, { useCallback, useEffect, useRef, useState } from 'react';

import DataGrid, {
  Column, FilterRow, Search, SearchPanel, Selection,
  HeaderFilter, Scrolling,
  FilterPanel,
  Pager, Paging, DataGridTypes,
} from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';


import SelectBox, { SelectBoxTypes } from 'devextreme-react/select-box';
import CheckBox, { CheckBoxTypes } from 'devextreme-react/check-box';
import CommanCLS from '../../services/CommanService';

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


function TaskList() {

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


  const [outlookTaskList, setOutlookTaskList] = useState([]);

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
            console.log("Json_CRM_GetOutlookTask", json?.Table);
            if (json?.Table.length > 0) {
              setOutlookTaskList(json.Table)
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

  return (
    <div className='table-responsive table-grid table-grid-2'>
      <DataGrid
        id="gridContainer"
        ref={dataGridRef}
        dataSource={outlookTaskList}
        keyExpr="ID"
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
          format="M/d/yyyy"
        />
        <Column dataField="EndDateTime"
          dataType="date"
          format="M/d/yyyy"
        />
        <Column dataField="Subject" />
        <Column
          dataField="mstatus"
        />
        <Column
          dataField="Source"
        />

      </DataGrid>

    </div>
  )
}

export default TaskList


