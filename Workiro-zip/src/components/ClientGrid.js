import React, { useCallback, useEffect, useRef, useState } from 'react';
import DataGrid, {
    Column, FilterRow, Search, SearchPanel, Selection,
    HeaderFilter, Scrolling,
    FilterPanel,
    Pager, Paging, DataGridTypes,
} from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';

// import LoginDetails from "../../services/Utils";
import CommanCLS from '../services/CommanService';



const ClientGrid = ({selectedChoice,data,handleContactNavigattion,handleClientNavigation}) => {

    const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
    const [password, setPassword] = useState(localStorage.getItem("Password"));
    const [Email, setEmail] = useState(localStorage.getItem("Email"));
    const [folderId, setFolderId] = useState(localStorage.getItem("FolderId"));

    const [clientList, setClientList] = useState([]);
    const dataGridRef = useRef(null);

    const clearFilter = useCallback(() => {
        dataGridRef.current.instance.clearFilter();
    }, []);
    
    const baseUrl = "https://practicetest.docusoftweb.com/PracticeServices.asmx/";// base url for api

    //   let dt = new LoginDetails();
    let cls = new CommanCLS(baseUrl, agrno, Email, password);

    function Json_GetSupplierListByProject() {
        let o = {};
        o.ProjectId = folderId;
        cls.Json_GetSupplierListByProject(o, function (sts, data) {
            if (sts) {
                let js = JSON.parse(data);
                console.log("Supplier List", js)
                let tbl = js.Table;
                setClientList(tbl)
            }
        })
    }

    useEffect(() => {
        setAgrNo(localStorage.getItem("agrno"));
        setFolderId(localStorage.getItem("FolderId"));
        setPassword(localStorage.getItem("Password"));
        setEmail(localStorage.getItem("Email"));
        Json_GetSupplierListByProject();
    }, [])

    const handleRowDoubleClick = (e) => {
        // Handle double click event on the row
        console.log('Row double-clicked:', e.data);
        if(selectedChoice==="All" || selectedChoice==="Contacts"){
            let orgNo = e.data.OriginatorNo;
            let contactNo = e.data.ContactNo;
            handleContactNavigattion(orgNo, contactNo);
        }else{
            let originatorNo = e.data.OriginatorNo;
            handleClientNavigation(originatorNo);
        }
      };

    return (
        <>
        <div className='white-box table-grid table-grid-2' >
{/* style={{ height: 'auto', overflowY: 'auto',width:'85vw' }} */}
            
            <DataGrid
                id="dataGrid"
                ref={dataGridRef}
                dataSource={data}
                // keyExpr={}
                columnAutoWidth={true}
                onRowDblClick={handleRowDoubleClick}
                showBorders={true}>
                {/* onSelectionChanged={onSelectionChanged} */}
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

            </DataGrid>

        </div>
        </>
    );
};

export default ClientGrid;
