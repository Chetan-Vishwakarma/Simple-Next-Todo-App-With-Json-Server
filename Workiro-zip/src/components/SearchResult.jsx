import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

function SearchResult({ myTotalTasks, myDocuments }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const target = searchParams.get("str");
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [filteredDocuments, setFilteredDocuments] = useState([]);

    useEffect(() => {
        let fltTasks = myTotalTasks.filter(itm => itm.Subject.toLowerCase().includes(target.toLowerCase()));
        setFilteredTasks(fltTasks);
        let fltDocuments = myDocuments.filter(itm => itm.Description.toLowerCase().includes(target.toLowerCase()));
        setFilteredDocuments(fltDocuments);
    }, [target]);

    return (
        <>
            <h3>Tasks: {target}</h3>
            {filteredTasks.length > 0 && filteredTasks.slice(0, 5).map(itm => {
                return <p>{itm.Subject}</p>
            })}

            <h3>Documents: {target}</h3>
            {filteredDocuments.length > 0 && filteredDocuments.slice(0, 5).map(itm => {
                return <p>{itm.Description}</p>
            })}
        </>
    )
}

export default SearchResult
