import React from 'react';
import './css/LeftNavbar.css';
import {useNavigate} from 'react-router-dom';

const LeftNavbar = () => {
  const navigate = useNavigate();
  return (
    <div className='LeftNavbar-container'>
      <div className="nav-contents" onClick={()=>{navigate('')}}>
        <div className="content">Add Product</div>
      </div>
      <div className="nav-contents" onClick={()=>{navigate('manage/product')}}>
        <div className="content">Manage Product</div>
      </div>
      <div className="nav-contents" onClick={()=>{navigate('manage/orderrequest')}}>
        <div className="content">Manage Order Request</div>
      </div>
      <div className="nav-contents">
        <div className="content">Sold History</div>
      </div>
      <div className="nav-contents">
        <div className="content">Manage Return Request</div>
      </div>
      <div className="nav-contents" onClick={()=>{localStorage.removeItem('sellerToken'); navigate('/seller/login', {replace: true});}}>
        <div className="content">Logout</div>
      </div>
    </div>
  );
};

export default LeftNavbar;