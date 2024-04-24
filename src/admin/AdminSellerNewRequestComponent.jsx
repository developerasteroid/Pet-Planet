import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types';
import './css/AdminSellerNewRequestComponent.css';
import { toast } from "react-toastify";
import adminAxiosInstance from '../helper/adminAxios';




const AdminSellerNewRequestComponent = (props) => {
  const isClicked = useRef(false);

  const updateApproval = async(sellerID, action) => {
    if(isClicked.current){
      return;
    }
    isClicked.current = true;
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
    isClicked.current = false;
  }
  return (

        <div className="ManagePet-Card">
        <h2>New Request</h2>
          <div className="ManagePet-Content">
          <div className="ManagePet-Field">
            <span>Picture :</span> <div><img src={props.img} alt="seller-picture" /></div>
          </div>
          <div className="ManagePet-Field">
            <span>Name:</span> {props.sellername}
          </div>
          <div className="ManagePet-Field">
            <span>Shop Name:</span> {props.sellershopname}
          </div>
          <div className="ManagePet-Field">
            <span>E-mail :</span> {props.selleremail}
          </div>
          <div className="ManagePet-Field">
            <span>Seller d.o.b:</span> {props.sellerdob}
          </div>
          <div className="ManagePet-Field">
            <span>Ph.no:</span> {props.sellerphno}
          </div>
          <div className="ManagePet-Field">
            <span>Adhaar no:</span> {props.selleradhaarnumber}
          </div>
          <div className="ManagePet-Field">
            <span>Bank Account No:</span> {props.selleraccountnumber}
          </div>

              </div>
              <div className="ManagePet-Actions">
        <button className="Accept" onClick={()=>{updateApproval(props.sellerID, true)}}>
              Accept
            </button>
          <button className="Decline" onClick={()=>{updateApproval(props.sellerID, false)}}>
            Decline
          </button>
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

