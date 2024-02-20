import React from 'react'
import { useNavigate } from 'react-router-dom';

function ContactPage() {
    const navigate = useNavigate();
  return (
    <>
      <h1>
      Contact Page
      </h1>
      <button onClick={()=>navigate("/")}>Go Back To Home</button>
    </>
  )
}

export default ContactPage
