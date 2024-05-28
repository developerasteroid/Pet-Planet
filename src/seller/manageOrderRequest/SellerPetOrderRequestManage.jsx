import React from 'react'
import '../css/SellerManagePetComponent.css';

const SellerPetOrderRequestManage = (props) => {

  const handleAccept = () => {
      const isConfirmed = window.confirm('Are you sure you want Accept the order');

      if (isConfirmed) {
        props.accept(props.oderid);
      } 
 
  };

  const handleDecline = () => {
    const isConfirmed = window.confirm('Are you sure you want Decline the order request');

      if (isConfirmed) {
        props.decline(props.oderid);
      }
  };


  return (
    <div className="ManagePet-Card">
      <h2>Pet</h2>
    <div className="ManagePet-Content">
      <div className="ManagePet-Field">
        <span>Order id:</span> {props.oderid}
      </div>
      <div className="ManagePet-Field">
        <span>Product Name:</span> {props.pName}
      </div>
      <div className="ManagePet-Field">
        <span>Customer Name:</span> {props.customerName}
      </div>
      <div className="ManagePet-Field">
        <span>Customer Number:</span> {props.customerMobile}
      </div>
      <div className="ManagePet-Field">
        <span>Customer Email:</span> {props.customerEmail}
      </div>
      <div className="ManagePet-Field">
        <span>Customer Address:</span> {props.customerAddress}
      </div>
  
      <div className="ManagePet-Field">
        <span> Breed:</span> {props.Breed}
      </div>
      <div className="ManagePet-Field">
      <span><div>Image:</div></span> <img src={props.pImage} alt="Pet-picture" />
      </div>
      <div className="ManagePet-Field">
        <span>Gender:</span> {props.gender}
      </div>
      <div className="ManagePet-Field">
        <span>Quantity:</span> {props.Quantity}
      </div>
      <div className="ManagePet-Field">
        <span>Mode of Payment:</span> {props.payment}
      </div>


      <div className="ManagePet-Field">
        <span>Total Price:</span> {props.Price}/-
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
