import React from 'react'
import '../css/SellerManagePetComponent.css';

const SellerPetOrderRequestManage = (props) => {

  const handleAccept = (e) => {

    e.preventDefault();

      const isConfirmed = window.confirm('Are you sure you want Accept the order');

      if (isConfirmed) {
        console.log('accepted');
      } else {
        console.log('declined');
      } 
 
  };

  const handleDecline = (e) => {
    console.log('Declined');
  };


  return (
    <div className="ManagePet-Card">
    <div className="ManagePet-Content">
      <div className="ManagePet-Field">
        <span>Order id:</span> {props.oderid}
      </div>
      <div className="ManagePet-Field">
        <span>Customer Name:</span> {props.customerName}
      </div>
      <div className="ManagePet-Field">
        <span>Customer Address:</span> {props.customerAddress}
      </div>

      <div className="ManagePet-Field">
        <span>Customer Mobile No:</span> {props.customerMbNo}
      </div>
      <div className="ManagePet-Field">
        <span>Category:</span> {props.category}
      </div>
      <div className="ManagePet-Field">
        <span>Product Type:</span> {props.productType}
      </div>
      <div className="ManagePet-Field">
        <span> Name:</span> {props.pName}
      </div>
      <div className="ManagePet-Field">
      <span><div>Image:</div></span> <img src={props.pImage} alt="food-picture" />
      </div>
      <div className="ManagePet-Field">
        <span>Gender:</span> {props.gender}
      </div>
      <div className="ManagePet-Field">
        <span>Quantity:</span> {props.Quantity}
      </div>

      <div className="ManagePet-Field">
        <span>Price:</span> {props.Price}
      </div>

    </div>
    <div className="ManagePet-Actions">
        <button className="Accept" onClick={handleAccept}>
          Accept
        </button>
      <button className="Decline" onClick={handleDecline}>
        Decline
      </button>
    </div>
  </div>
  )
}

export default SellerPetOrderRequestManage
