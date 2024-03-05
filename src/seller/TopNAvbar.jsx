import React from 'react'
import logo from './assets/logo.png'
import './css/TopNavbar.css'

const TopNavbar = () => {
  return (
   
    <div className="TopNavbar-container">
        <div className="left-content">
            <img src={logo} alt="" />
            <div className="name">
              Pet-Planet
            </div>
        </div>
        <div className="middle-content">
            <div className="page-name">Dashboard</div>
        </div>
        <div className="right-content">
            <div className='profile'>
              P
            </div>
        </div>
    </div>
  )
}

export default TopNavbar