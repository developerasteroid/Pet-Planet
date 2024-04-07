import React from 'react';
import logo from './assets/logo.png';
import './css/AdminTopNavbar.css';

const TopNavbar = () => {
  return (
    <div className="AdminTopNavbar-container">
      <div className="Adminleft-content">
        <img src={logo} alt="Pet Planet Logo" />
        <div className="Adminname">Pet-Planet</div>
      </div>
      <div className="Adminmiddle-content">
        <div className="Adminpage-name">Dashboard</div>
      </div>
      <div className="Adminright-content">
        <div className="Adminprofile">P</div>
      </div>
    </div>
  );
};

export default TopNavbar;
