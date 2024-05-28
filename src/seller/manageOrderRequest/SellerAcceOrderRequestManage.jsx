import React from 'react'
import '../css/SellerManagePetComponent.css';


const SellerAcceOrderRequestManage = (props) => {

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
      <h2>Pet Accessory</h2>
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
        <span>Accessory Type:</span> {props.productType}
      </div>
      <div className="ManagePet-Field">
        <span>Product Name:</span> {props.pName}
      </div>
      <div className="ManagePet-Field">
        <span>Company Name:</span> {props.pName}
      </div>
      <div className="ManagePet-Field">
      <span><div>Image:</div></span> <img src={props.pImage} alt="Acce-picture" />
      </div>
      <div className="ManagePet-Field">
        <span>Quantity:</span> {props.Quantity}
      </div>
      <div className="ManagePet-Field">
        <span>Weight:</span> {props.Weight}
      </div>

      <div className="ManagePet-Field">
        <span>Mode of Payment:</span> {props.payment}
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

export default SellerAcceOrderRequestManage
