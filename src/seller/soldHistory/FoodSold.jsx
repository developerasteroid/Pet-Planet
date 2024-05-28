import React from 'react'

const FoodSold = (props) => {
  return (
    <div className="ManagePet-Card">
    <h2>Pet Food</h2>
    <div className="ManagePet-Content">
      <div className="ManagePet-Field">
        <span>Order id:</span> {props.orderid}
      </div>
      <div className="ManagePet-Field">
      <span>Order date:</span> {props.orderDate}
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


 </div>
</div>
  )
}

export default FoodSold
