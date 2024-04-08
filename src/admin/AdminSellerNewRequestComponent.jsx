import React, { useState } from 'react'
import PropTypes from 'prop-types';
import './css/AdminSellerNewRequestComponent.css';
import { toast } from "react-toastify";
import adminAxiosInstance from '../helper/adminAxios';




const AdminSellerNewRequestComponent = (props) => {
  const updateApproval = async(sellerID, action) => {
    try {
      const response = await adminAxiosInstance.post('api/admin/new/registered/seller/update', {sellerID, action});
      if(response.status === 200 && response.data && response.data.message){
          if(action){
            toast.success(response.data.message);
          } else {
            toast.warning(response.data.message);
          }
          props.removeCallback();
      } else {
        throw new Error('Error in fetching new sellers list');
      }
    } catch (error) {
      if(error.response){
        if(error.response.status === 401){
          navigate('/admin/login', {replace: true});
        } else if(error.response.data && error.response.data.message){
          toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        }
      } else {
        toast.error(error.message);
      }
    }
  }
  return (
    <div className='admin-SellerNewRequestComponent-container'>

      <div className='Adminseller-info-container'>

      

        <div>Picture: <div className='admin-sellerProfile'><img src={props.img} alt="seller-picture" /></div></div>
        <div>Name: <div>{props.sellername}</div></div>
        <div>Shop-Name: <div>{props.sellershopname}</div></div>
        <div>e-mail: <div>{props.selleremail}</div></div>
        <div>dob: <div>{props.sellerdob}</div></div>
        <div>Ph-no: <div>{props.sellerphno}</div></div>
        <div>Adhaar-number: <div>{props.selleradhaarnumber}</div></div>
        <div>Bank-account-number: <div>{props.selleraccountnumber}</div></div>

        </div>

        <div className="AdminButton-container">
          <button className='Admin-btn-rccept' onClick={()=>{updateApproval(props.sellerID, true)}}>Accept</button>
          <button className='Admin-btn-reject' onClick={()=>{updateApproval(props.sellerID, false)}}>Decline</button>
        </div>
      
    </div>
  )
}

AdminSellerNewRequestComponent.propTypes = {
    img: PropTypes.string.isRequired,
    sellername: PropTypes.string.isRequired,
    sellershopname: PropTypes.string.isRequired,
    selleremail: PropTypes.string.isRequired,
    sellerdob: PropTypes.string.isRequired,
    sellerphno: PropTypes.number.isRequired,
    selleradhaarnumber: PropTypes.number.isRequired,
    selleraccountnumber: PropTypes.number.isRequired,

    
  };

export default AdminSellerNewRequestComponent

