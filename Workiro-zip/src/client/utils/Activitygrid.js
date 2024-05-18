import React from 'react';
import DataGrid, {
  Column, SearchPanel, Selection,
  HeaderFilter, Scrolling,
  Pager, Paging,
} from 'devextreme-react/data-grid';
import { Box } from '@mui/material';
import 'devextreme/dist/css/dx.light.css';
export default function Activitygrid({grid,selectedDocument,call_Json_GetAudit,getAudit,tempdatafilter}) {

  return (
    <div><Box className=''>
    <DataGrid
        ref={grid}
        id="dataGrid"
        className='table-grid'
        // style={{ width: "100%" }}
        dataSource={tempdatafilter.length > 0 ? tempdatafilter : getAudit.length > 0 ? getAudit : []}
        keyExpr="Activity ID"
        columnAutoWidth={true}
        showBorders={true}>
        <Column dataField="Actioned Date" dataType="date" caption="Date"  format="M/d/yyyy, HH:mm" />
        <Column dataField="Comments" dataType="string" caption="Activity" />
        <Column dataField="ForwardedBy" dataType="string" caption="User" />
        <HeaderFilter visible={true} />
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
    </DataGrid>
</Box></div>
  )
}
