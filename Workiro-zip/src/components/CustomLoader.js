import React from 'react'
import "./CustomLoader.css"
import logo from "../images/docu-icon.svg"

function CustomLoader() {
  return (
    <div id="preloader" class="" style={{"display": "block"}}>
        <div class="ctn-preloader" id="ctn-preloader">
            <div class="round_spinner">
                <div class="spinner"></div>
                <div class="text">
                    <img src={logo} />
                    <h4>
                        <span>Docusoft</span>
                    </h4>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default CustomLoader
