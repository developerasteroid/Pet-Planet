import React from 'react'
import './css/LeftNavbar.css'

const LeftNavbar = () => {
  return (

        <div className='LeftNavbar-container'>

            <div className="nav-contents">
                <div className="content">Add Product</div>
            </div>

            <div className="nav-contents">
                <div className="content">Manage Product</div>
            </div>

            <div className="nav-contents">
                <div className="content">Order Request</div>
            </div>

            <div className="nav-contents">
                <div className="content">Sold History</div>
            </div>

            <div className="nav-contents">
                <div className="content">Manage Return Request</div>
            </div>

            <div className="nav-contents">
                <div className="content">Logout</div>
            </div>
            
            
        </div>

  )
}

export default LeftNavbar
