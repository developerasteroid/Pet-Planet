import React from 'react'

const PetSold = (props) => {
  return (
    <div className="ManagePet-Card">
    <h2>Pet</h2>
  <div className="ManagePet-Content">
    <div className="ManagePet-Field">
      <span>Order id:</span> {props.orderid}
    </div>
    <div className="ManagePet-Field">
      <span>Order date:</span> {props.orderDate}
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
      <span>Price:</span> {props.Price}
    </div>

  
  </div>
</div>
  )
}

export default PetSold
