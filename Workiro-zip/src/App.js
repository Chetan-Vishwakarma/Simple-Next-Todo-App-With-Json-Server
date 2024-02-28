import React from 'react'
import SidebarNav from "./components/SidebarNav"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import ClientDetails from './client/client-components/ClientDetails'
import ContactDetails from './contact/contact-components/ContactDetails'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/dashboard' element={<SidebarNav/>}>
            <Route path="clientDetails" element={<ClientDetails />} />
            <Route path="ContactDetails" element={<ContactDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
