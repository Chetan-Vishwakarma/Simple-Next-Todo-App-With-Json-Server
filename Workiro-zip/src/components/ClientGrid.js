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
import { useNavigate } from 'react-router-dom';



const ClientGrid = () => {

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

    const navigate = useNavigate();

    const handleContactNavigattion = (originator_no, contact_no) => {
        console.log("sdfsf",{
            originator_no:originator_no,
            contact_no:contact_no
        });
        navigate('/dashboard/ContactDetails', {
            state: {
                agrno: agrno,
                Email: Email,
                password: password,
                folderId: folderId,
                originatorNo: originator_no,
                contactNo: contact_no
            }
        })
    }

    function onSelectionChanged(e) {
        handleContactNavigattion(e.selectedRowsData[0].OriginatorNo,e.selectedRowsData[0].ContactNo);
        console.log("sdfkjh",{
            selectedRowsData: e.selectedRowsData
        });
    }

    return (
        <div style={{ height: 'auto', overflowY: 'auto',width:'86vw' }}>
            <DataGrid
                id="dataGrid"
                ref={dataGridRef}
                dataSource={clientList}
                keyExpr="OriginatorNo"
                columnAutoWidth={true}
                showBorders={true}
                onSelectionChanged={onSelectionChanged}>
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
    );
};

export default ClientGrid;
