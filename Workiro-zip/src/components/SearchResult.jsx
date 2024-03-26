import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

function SearchResult({myTotalTasks,myDocuments}) {
    const [searchParams,setSearchParams] = useSearchParams();
    const target = searchParams.get("str");
    const [filteredTasks,setFilteredTasks] = useState([]);

    useEffect(()=>{
        let fltTasks = myTotalTasks.filter(itm=>itm.Subject.toLowerCase().includes(target.toLowerCase()));
        setFilteredTasks(fltTasks);
    },[target]);
    // console.log("dsljldsfskf TASKS",myTotalTasks);
    // console.log("dsljldsfskf DOCUMENTS",myDocuments);
  return (
    <>
    <h3>Tasks: {target}</h3>
    {filteredTasks.length>0 && filteredTasks.slice(0,5).map(itm=>{
        return <p>{itm.Subject}</p>
    })}

    <h3>Documents: {target}</h3>
    {myDocuments.length>0 && myDocuments.slice(0,5).map(itm=>{
        return <p>{itm.Description}</p>
    })}
    </>
  )
}

export default SearchResult
