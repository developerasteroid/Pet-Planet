import React, { useState, useEffect } from 'react';

const SellerFoodOrder = (props) => {
  const [isOutForDelivery, setIsOutForDelivery] = useState(props.status === 'out for delivery');
  const [isDelivered, setIsDelivered] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpErrorMessage, setOtpErrorMessage] = useState('');
  const [otpSending, setOtpSending] = useState(false);

  useEffect(() => {
    setIsOutForDelivery(props.status === 'out for delivery');
  }, [props.status]);

  const handleOutForDelivery = (e) => {
    setIsOutForDelivery(e.target.checked);
    if (!e.target.checked) {
      setIsDelivered(false);
    }
  };

  const handleDelivered = (e) => {
    if (isOutForDelivery) {
      setIsDelivered(e.target.checked);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm('Are you sure you want to make changes in the status of the order');
    if (isConfirmed) {
      if (props.status !== 'out for delivery' && isOutForDelivery) {
        props.upgradeAction(props.orderid);
      } else if (props.status === 'out for delivery' && isDelivered && otp) {
        props.upgradeAction(props.orderid, otp);
        setIsDelivered(false);
      } else if (props.status === 'out for delivery' && isDelivered && !otp) {
        setOtpErrorMessage('OTP is required.');
      }
    }
  };

  const handleInputChange = (e) => {
    setOtp(e.target.value);
    if(e.target.value){
      setOtpErrorMessage('');
    }
  }

  const handleSendOtp = async () => {
    setOtpSending(true);
    const result = await props.sendOtp(props.orderid);
    if (result) {
      setTimeout(() => {
        setOtpSending(false);
      }, 60000);
    } else {
      setOtpSending(false);
    }
  }

  return (
    <div className="ManagePet-Card">
      <h2>Pet Food</h2>
      <div className="ManagePet-Content">
        <div className="ManagePet-Field">
          <span>Order id:</span> {props.orderid}
        </div>
        <div className="ManagePet-Field">
          <span>Customer Name:</span> {props.customerName}
        </div>
        <div className="ManagePet-Field">
          <span>Customer Address:</span> {props.customerAddress}
        </div>
        <div className="ManagePet-Field">
          <span>Customer Email:</span> {props.customerEmail}
        </div>
        <div className="ManagePet-Field">
          <span>Customer Ph.no:</span> {props.customerphno}
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
              disabled={props.status === 'out for delivery'}
            />
          </div>
          {props.status === 'out for delivery' && 
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
          }
          {isDelivered &&
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
              {otpErrorMessage && <span style={{color:'#f00', fontSize:14}}>{otpErrorMessage}</span>}
            </>
          }
        </div>
      </div>
      <div className="ManagePet-Actions">
        {props.status === 'out for delivery' &&
          <button className="Accept" onClick={handleSendOtp} disabled={otpSending}>
            Send OTP
          </button>
        }
        <button className="Accept" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  )
}

export default SellerFoodOrder;
