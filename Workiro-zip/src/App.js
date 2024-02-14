import React from 'react'
import SidebarNav from "./components/SidebarNav"
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <div>
      <BrowserRouter>
        <SidebarNav/>
      </BrowserRouter>
    </div>
  )
}

export default App
