import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import DocumentList from '../client/client-components/DocumentList';

function SearchResult({ myTotalTasks, myDocuments }) {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const target = searchParams.get("str");
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [filteredDocuments, setFilteredDocuments] = useState([]);

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const day = date.getDate();
        const month = date.getMonth() + 1; // January is 0, so add 1 to get the correct month
        const year = date.getFullYear();
        const paddedDay = day < 10 ? `0${day}` : day;
        const paddedMonth = month < 10 ? `0${month}` : month;
        return `${paddedDay}/${paddedMonth}/${year}`;
    }

    useEffect(() => {
        let fltTasks = myTotalTasks.filter(itm => itm.Subject.toLowerCase().includes(target.toLowerCase()));
        setFilteredTasks(fltTasks);
        let fltDocuments = myDocuments.filter(itm => itm.Description.toLowerCase().includes(target.toLowerCase()));
        setFilteredDocuments(fltDocuments);
        fltDocuments.map(itm=>{
            itm["Item Date"] = formatDate(itm["Item Date"])
        })
        // console.log("fkjhdkjs",fltDocuments);
    }, [target]);

    const handleDocumentNavigation=()=>{
        navigate("/dashboard/DocumentList",{state:{globalSearchDocs:filteredDocuments}});
        // navigate("/dashboard/clientDetails?val=5",{
        //     state:{
        //         agrno: "",
        //         Email: "",
        //         password: "",
        //         folderId: "",
        //         originatorNo: "",
        //         globalSearchDocs:filteredDocuments
        //     }
        // });
    }
    return (
        <>
            <h3>Tasks: {target}</h3>

            {filteredTasks.length > 0 && filteredTasks.slice(0, 10).map(itm => {
                return <p>{itm.Subject}</p>
            })}
            {filteredTasks.length>10 && <button>View More</button>}

            <h3>Documents: {target}</h3>
            {filteredDocuments.length > 0 && filteredDocuments.slice(0, 10).map(itm => {
                return <p>{itm.Description}</p>
            })}
            {filteredDocuments.length>10 && <button onClick={handleDocumentNavigation}>View More</button>}

            {/* <DocumentList clientId={""} globalSearchDocs={filteredDocuments}/> */}
        </>
    )
}

export default SearchResult
