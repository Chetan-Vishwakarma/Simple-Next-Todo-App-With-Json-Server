import React,{useEffect,useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CommanCLS from '../../services/CommanService';
import DataGrid, {
    Column, FilterRow, Search, SearchPanel, Selection,
    HeaderFilter, Scrolling,
    FilterPanel,
    Pager, Paging, DataGridTypes,
} from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

export default function DocumentList() {
    const baseUrl = "https://practicetest.docusoftweb.com/PracticeServices.asmx/";
    let Cls = new CommanCLS(baseUrl, '0003', 'patrick@docusoft.net', 'UGF0cmljazEyMy4=');
    const [documents,setDocuments] = useState([]);
    const Json_ExplorerSearchDoc = () => {
        try {
            let obj = {};
            obj.ProjectId = '15';
            obj.ClientId = '222/111';
            obj.sectionId = "-1";
            Cls.Json_ExplorerSearchDoc(obj, function (sts, data) {
                if (sts && data) {
                    console.log("ExplorerSearchDoc", JSON.parse(data));
                    let json = JSON.parse(data);
                    let docs = json.Table6.length>=100? json.Table6.slice(0,80) : json.Table6;
                    setDocuments(docs);
                }
            })
        } catch (error) {
            console.log("ExplorerSearchDoc", error)
        }
    }
    useEffect(() => {
        Json_ExplorerSearchDoc();
    }, []);
    return (
        <>
        {/* {documents.length>0 && <DataGrid
                id="dataGrid"
                style={{width:"1600px"}}
                dataSource={documents}
                keyExpr="Registration No."
                columnAutoWidth={true}
                showBorders={true}>
                <FilterRow visible={true} />
                <FilterPanel visible={true} />
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
            </DataGrid>} */}
            
        <TableContainer component={Paper} style={{height: "600px", overflow:"auto"}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Description</TableCell>
                        <TableCell align="right">Section</TableCell>
                        <TableCell align="right">Sub</TableCell>
                        <TableCell align="right">Doc. Date</TableCell>
                        <TableCell align="right">Recieved Date</TableCell>
                        <TableCell align="right">Category</TableCell>
                        <TableCell align="right">Reference</TableCell>
                        <TableCell align="right">FileSize</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {documents.length>0 && documents.map((row,i) => (
                        <TableRow
                            key={i}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.Description? row.Description: ""}
                            </TableCell>
                            <TableCell align="right">{row.Section? row.Section: ""}</TableCell>
                            <TableCell align="right">{row.SubSection? row.SubSection: ""}</TableCell>
                            <TableCell align="right">{row["Item Date"]? row["Item Date"]: ""}</TableCell>
                            <TableCell align="right">{row["Received Date"]? row["Received Date"]: ""}</TableCell>
                            <TableCell align="right">{row.Category? row.Category: ""}</TableCell>
                            <TableCell align="right">{row.Client? row.Client: ""}</TableCell>
                            <TableCell align="right">{row["FileSize"]? row["FileSize"]: ""}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
            );
}
