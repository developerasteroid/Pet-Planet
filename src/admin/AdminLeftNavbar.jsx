import React from 'react';
import './css/AdminLeftNavbar.css';
import {useNavigate} from 'react-router-dom';


const LeftNavbar = () => {
  const navigate = useNavigate();
  return (
    <div className='AdminLeftNavbar-container'>
      <div className="Adminnav-contents" onClick={()=>{navigate('')}}>
        <div className="Admincontent">Manage New Seller</div>
      </div>
      <div className="Adminnav-contents" onClick={()=>{navigate('manage/sellers')}}>
        <div className="Admincontent">Manage Sellers</div>
      </div>
      <div className="Adminnav-contents">
        <div className="Admincontent">Manage Customer</div>
      </div>
      <div className="Adminnav-contents" onClick={()=>{navigate('orders/delivered')}}>
        <div className="Admincontent">Orders delivered</div>
      </div>
      
      <div className="Adminnav-contents" onClick={()=>{localStorage.removeItem('adminToken'); navigate('/admin/login', {replace: true});}}>
        <div className="Admincontent">Logout</div>
      </div>
    </div>
  );
};

export default LeftNavbar;
