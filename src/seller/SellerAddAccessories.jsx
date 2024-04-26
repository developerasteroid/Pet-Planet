import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/SellerAddAccessories.css';

const SellerAddAccessories = () => {
    const [formData, setFormData] = useState({
      acceType: '',
      name:'',
      companyName:'',
      quantity: '',
      length: '',
      width: '',
      thick: '',
      weight:'',
      acceImage: null,
      price:'',
      description: '',
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleFileUpload = (e) => {
      const file = e.target.files[0];
      setFormData({ ...formData, [e.target.name]: file });
    };
  
    const handleSubmit = (e) => {
        e.preventDefault();

        const isConfirmed = window.confirm('Are you sure you want sell this product');

        if (isConfirmed) {
          console.log('Form submitted successfully!');
          console.log('Form Data:', formData);
        } else {
          console.log('Form submission cancelled.');
        }
      };
      
  
    return (
      <>
        <ToastContainer />
        <div className="acce-mainContainer">
          <div className="acce-form-container">
            <h2 className="acce-form-title">Sell Pet-Accesories</h2>

            <form onSubmit={handleSubmit}>

              <label htmlFor="petType">Select Accessories:</label>
              <select
                name="acceType"
                id="acceType"
                className="acce-input-field"
                value={formData.acceType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select</option>
                <option value="Bedding">Bedding</option>
                <option value="Bowls">Bowls</option>
                <option value="Clothing">Clothing</option>
                <option value="Collars">Collars</option>
                <option value="leash">Leash</option>
                <option value="poobags">Poo-bags</option>
                <option value="Toys">Toys</option>
    

              </select>
  
              <label htmlFor="name">Specific name of product:</label>
              <input
                type="text"
                placeholder='Specific Name of your product (*Required)'
                name="name"
                id="name"
                className="acce-input-field"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
               <label htmlFor="companyName">Company Name:</label>
              <input
                type="text"
                name="companyName"
                placeholder='Enter the company name'
                id="companyName"
                className="acce-input-field"
                value={formData.companyName}
                onChange={handleInputChange}
                required
              />
  
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                placeholder='Quantity in number (*Required)'
                name="quantity"
                id="quantity"
                className="acce-input-field"
                value={formData.quantity}
                onChange={handleInputChange}
                required
              />
  
            
  
              <label htmlFor="length">Length of Product:</label>
              <input
                type="number"
                name="length"
                placeholder='Lenght in cm (*Required)'
                id="length"
                className="acce-input-field"
                value={formData.length}
                onChange={handleInputChange}
                required
              />
  
              <label htmlFor="width">Width of Product:</label>
              <input
                type="number"
                name="width"
                placeholder='Width in cm (*Required)'
                id="width"
                className="acce-input-field"
                value={formData.width}
                onChange={handleInputChange}
                required
              />

            <label htmlFor="thick">Thickness of Product:</label>
              <input
                type="number"
                name="thick"
                placeholder='Thickness in cm (*Required)'
                id="thick"
                className="acce-input-field"
                value={formData.thick}
                onChange={handleInputChange}
                required
              />

            <label htmlFor="weight">Current weight of Product:</label>
              <input
                type="number"
                name="weight"
                placeholder='Weight in kg (*Required)'
                id="weight"
                className="acce-input-field"
                value={formData.weight}
                onChange={handleInputChange}
                required
              />
  
              <label htmlFor="petImage">Picture of product:</label>
              <input
                type="file"
                name="acceImage"
                id="acceImage"
                className="acce-input-field"
                onChange={handleFileUpload}
                required
              />

            <label htmlFor="price">Price:</label>
            <input
                type="number"
                name="price"
                placeholder="In Rupees (*Required)"
                id="price"
                className="acce-input-field"
                value={formData.price}
                onChange={handleInputChange}
                required
            />
  
              <label htmlFor="description">Description:</label>
              <textarea
                name="description"
                placeholder='write description of your pet (Optional)'
                id="description"
                className="acce-input-field"
                value={formData.description}
                onChange={handleInputChange}
              />
  
              <button type="submit" 
              className="acce-submit-button"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </>
    );
  };
  
export default SellerAddAccessories;
 
