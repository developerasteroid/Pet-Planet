import React, { useState } from 'react';

const SellerFoodOrder = (props) => {

  const [isOutForDelivery, setIsOutForDelivery] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);
  const [otp, setopt]= useState('');

  const handleOutForDelivery = (e) => {
    setIsOutForDelivery(e.target.checked);
    // If the first checkbox is unchecked, disable the second checkbox
    if (!e.target.checked) {
      setIsDelivered(false);
    }
  };

  const handleDelivered = (e) => {
    // Allow changing the state of the second checkbox only if the first checkbox is checked
    if (isOutForDelivery) {
      setIsDelivered(e.target.checked);
    }
  };
  
  const handleSubmit = (e) => {
  
    e.preventDefault();

      const isConfirmed = window.confirm('Are you sure you want make changes in the status of order');

      if (isConfirmed) {
        console.log('Changes Submitted');
      } else {
        console.log('Changes declined');
      } 
 
  };
  const handleInputChange = (e) =>{
    setopt(e.target.value);
  }


  return (
          <div className="ManagePet-Card">
          <h2>Pet Food</h2>
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
            <span>Customer Ph.no:</span> {props.customerphno}
          </div>
            <div className="ManagePet-Field">
              <span>Product Type:</span> {props.productType}
            </div>
            <div className="ManagePet-Field">
              <span>Company Name:</span> {props.category}
            </div>
            <div className="ManagePet-Field">
            <span><div>Image:</div></span> <img src={props.pImage} alt="food-picture" />
            </div>
            <div className="ManagePet-Field">
              <span>Quantity:</span> {props.Quantity}
            </div>
            <div className="ManagePet-Field">
              <span>Mode of Payment:</span> {props.payment}
            </div>

            <div className="ManagePet-Field">
              <span>Price:</span> {props.Price}
            </div>

            <div className="Checkboxes">
          <div>
            <span>Out for delivery:</span>{' '}
            <input
              type="checkbox"
              id="firstCheckbox"
              checked={isOutForDelivery}
              onChange={handleOutForDelivery}
            />
          </div>
          <div>
            <span>Delivered:</span>{' '}
            <input
              type="checkbox"
              id="secondCheckbox"
              checked={isDelivered}
              onChange={handleDelivered}
              disabled={!isOutForDelivery}
            />
          </div>

          {isDelivered ?
           <>
             <div className="ManagePet-Field">
              <span>OTP :</span>{' '}
              <input
                type="number"
                className="ManagePet-Input"
                name="otp"
                id="otp"
                value={otp}
                onChange={handleInputChange}
                />
            </div>
          </> : <>
          
          </>}
        </div>

        </div>
        <div className="ManagePet-Actions">
            <button className="Accept" onClick={handleSubmit}>
              Accept
            </button>
        </div>
      </div>
  )
}

export default SellerFoodOrder;
