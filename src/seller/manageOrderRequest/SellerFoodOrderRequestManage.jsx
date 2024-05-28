import React from 'react'
import '../css/SellerManagePetComponent.css';


const SellerFoodOrderRequestManage = (props) => {

  const handleAccept = () => {
    const isConfirmed = window.confirm('Are you sure you want Accept the order');

    if (isConfirmed) {
      props.accept(props.orderid);
    } 

};

const handleDecline = () => {
  const isConfirmed = window.confirm('Are you sure you want Decline the order request');

    if (isConfirmed) {
      props.decline(props.orderid);
    }
};

  return (
    <div className="ManagePet-Card">
      <h2>Pet Food</h2>
    <div className="ManagePet-Content">
      <div className="ManagePet-Field">
        <span>Order id:</span> {props.orderid}
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
        <span>Product Type:</span> {props.productType}
      </div>
      <div className="ManagePet-Field">
        <span>Company Name:</span> {props.companyName}
      </div>
      <div className="ManagePet-Field">
      <span><div>Image:</div></span> <img src={props.pImage} alt="food-picture" />
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

export default SellerFoodOrderRequestManage
