import React from 'react'

const AcceSold = (props) => {
  return (
    <div className="ManagePet-Card">
    <h2>Pet Accessory</h2>
  <div className="ManagePet-Content">
    <div className="ManagePet-Field">
      <span>Order id:</span> {props.orderid}
    </div>
    <div className="ManagePet-Field">
      <span>Order date:</span> {props.orderDate}
    </div>
    <div className="ManagePet-Field">
      <span>Accessory Type:</span> {props.productType}
    </div>
    <div className="ManagePet-Field">
      <span>Product Name:</span> {props.pName}
    </div>
    <div className="ManagePet-Field">
      <span>Company Name:</span> {props.companyName}
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
</div>
  )
}

export default AcceSold
