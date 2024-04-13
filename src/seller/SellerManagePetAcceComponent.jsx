import React, { useState } from 'react';
import './css/SellerManagePetComponent.css';

const SellerManagePetAcceComponent = (props) => {

    
  const [isChanged, setIsChanged] = useState(false);
  const [data, setData] = useState({
    Quantity: props.Quantity || 0,
    Weight: props.Weight || 0,
    Price: props.Price || 0
  });

  const handleInputChange = (e) => {
    setIsChanged(true);
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSaveChanges = (e) => {

    e.preventDefault();

      const isConfirmed = window.confirm('Are you sure you want to edit this product');

      if (isConfirmed) {
        console.log('Form edited successfully!');
        console.log('Form Data:', data);
      } else {
        console.log('data updation cancelled.');
      } 
 
  };

  const handleDeleteBtn = () => {
    console.log('Deleted');
  };
  return (
    <div className="ManagePet-Card">
    <div className="ManagePet-Content">
      <div className="ManagePet-Field">
        <span>Accessory Type:</span> {props.AcceType}
      </div>
      <div className="ManagePet-Field">
        <span>Company Name:</span> {props.companyName}
      </div>
      <div className="ManagePet-Field">
      <span><div>Image:</div></span> <img src={props.acceImage} alt="acce-picture" />
      </div>
      <div className="ManagePet-Field">
        <span>Quantity:</span>{' '}
        <input
          type="number"
          className="ManagePet-Input"
          name="Quantity"
          id="Quantity"
          value={data.Quantity}
          onChange={handleInputChange}
        />
      </div>

      <div className="ManagePet-Field">
        <span>Price:</span>{' '}
        <input
          type="number"
          className="ManagePet-Input"
          name="Price"
          id="Price"
          value={data.Price}
          onChange={handleInputChange}
        />
      </div>
    </div>
    <div className="ManagePet-Actions">
      {isChanged && (
        <button className="btn-save-changes" onClick={handleSaveChanges}>
          Save changes
        </button>
      )}
      <button className="btn-delete" onClick={handleDeleteBtn}>
        Delete
      </button>
    </div>
  </div>
  )
}

export default SellerManagePetAcceComponent
