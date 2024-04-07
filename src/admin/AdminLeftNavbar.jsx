import React from 'react';
import './css/AdminLeftNavbar.css';
import {useNavigate} from 'react-router-dom';


const LeftNavbar = () => {
  const navigate = useNavigate();
  return (
    <div className='AdminLeftNavbar-container'>
      <div className="Adminnav-contents">
        <div className="Admincontent">Add Product</div>
      </div>
      <div className="Adminnav-contents">
        <div className="Admincontent">Manage Product</div>
      </div>
      <div className="Adminnav-contents">
        <div className="Admincontent">Order Request</div>
      </div>
      <div className="Adminnav-contents">
        <div className="Admincontent">Sold History</div>
      </div>
      <div className="Adminnav-contents">
        <div className="Admincontent">Manage Return Request</div>
      </div>
      <div className="Adminnav-contents" onClick={()=>{localStorage.removeItem('adminToken'); navigate('/admin/login', {replace: true});}}>
        <div className="Admincontent">Logout</div>
      </div>
    </div>
  );
};

export default LeftNavbar;
