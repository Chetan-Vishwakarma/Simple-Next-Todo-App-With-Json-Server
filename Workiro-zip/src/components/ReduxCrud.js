import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers, deleteUser, updateUser } from "../redux/reducers/crudSlice.js"

function ReduxCrud() {
    const dispatch = useDispatch();
    const data = useSelector((state)=>state.users.value);
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [id,setID] = useState("");
    const [isEdit, setEdit] = useState(false);
    useEffect(()=>{
        dispatch(getUsers());
    },[]);
  return (
    <div>
      <h1>ReduxCrud</h1>
      <div>
        {/* {
            isEdit && <div>
              <input onChange={(e)=>setUsername(e.target.value)} value={username} type='text'/><br/>
              <input onChange={(e)=>setUsername(e.target.value)} value={email} type='text'/><button onClick={()=>{
                setEdit(false);
                dispatch(updateUser({id:id,username:username,email:email,obj:data}));
              }}>Update</button>
            </div>
        } */}
        {data.length>0 && (
            <table style={{"textAlign":"center"}}>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item,i)=>{
                        return <tr key={i}>
                            <td>{item?.id}</td>
                            <td>{item?.username}</td>
                            <td>{item?.email}</td>
                            <td><button onClick={()=>{
                                dispatch(deleteUser({id:item?.id,obj:data}));
                            }}>Delete</button></td>
                        </tr>
                    })}
                </tbody>
            </table>
        )}
      </div>
    </div>
  )
}

export default ReduxCrud
