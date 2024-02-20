import React from 'react'
import { useNavigate } from 'react-router-dom'

function ClientPage() {
    const navigate = useNavigate();
  return (
    <>
      <h1>
      Client Page
      </h1>
      <button onClick={()=>navigate("/")}>Go Back To Home</button>
    </>
  )
}

export default ClientPage
