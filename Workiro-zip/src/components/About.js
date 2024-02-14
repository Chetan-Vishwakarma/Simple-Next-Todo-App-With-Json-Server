import React from 'react'
import { Link, Outlet } from "react-router-dom";

function About() {
  return (
    <div>
      <div style={{"display":"flex"}}>
      <div style={{"width":"20%"}}>
        <br/>
        <div>
          <Link to={"/about"}><button>About</button></Link>
        </div>
        <br/>
        <div>
          <Link to={"reduxCounter"}><button>ReduxCounter</button></Link>
        </div>
        <br/>
        <div>
          <Link to={"reduxCrud"}><button>ReduxCrud</button></Link>
        </div>
        <br/>
      </div>
      <div style={{"width":"80%"}}>
      {/* <h1>About Page</h1> */}
        <Outlet/>
      </div>
      </div>
    </div>
  )
}

export default About
