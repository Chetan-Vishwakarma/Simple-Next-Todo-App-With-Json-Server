import React from 'react'
import SidebarNav from "./components/SidebarNav"
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import ClientDetails from './client/client-components/ClientDetails'
import ContactDetails from './contact/contact-components/ContactDetails'
import TodoList from './components/TodoList'
import NewTodoList from './components/NewTodoList'
import Logout from './components/Logout'
import SearchResult from './components/SearchResult'
import DocumentList from './client/client-components/DocumentList';
import AddContacts from './components/AddContacts';

import { ToastContainer, toast } from "react-toastify";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/dashboard' element={<PrivateRoute/>}>
            <Route path="Connections" element={<ClientDetails />} />
            <Route path="clientDetails" element={<ClientDetails />} />
            <Route path="ContactDetails" element={<ContactDetails />} />
            <Route path="MyTask" element={<TodoList />} />
            <Route path="TodoList" element={<NewTodoList />} />
            <Route path="SmartViews" element={<></>} />
            <Route path="SearchResult" element={<SearchResult /> } />
            <Route path="SearchResult/Doc" element={<DocumentList clientId=""/> } />
            <Route path="AddContacts" element={<AddContacts />} />
            <Route path="Logout" element={<Logout/>} />
            
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer style={{ zIndex: "9999999" }}></ToastContainer>
    </div>
  )
}

function PrivateRoute(){
  let isLoggedIn=true;
    let email =localStorage.getItem('Email');
    let pass = localStorage.getItem('Password');
    let agrno = localStorage.getItem('agrno');
    console.log("isLoggedIn",isLoggedIn);
    if(email && pass && agrno) {
        isLoggedIn=true;
    }
    else{
        isLoggedIn=false;  
    }
  return isLoggedIn ? (
        <SidebarNav></SidebarNav>
    ) : (
        <Navigate to="/" />
    );
}

export default App
