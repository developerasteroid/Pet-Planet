import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/SellerAddFood.css';

const SellerAddFood = () => {

    const [isSubmitted, setIsSubmitted] = useState(false);

    const [formData, setFormData] = useState({
      foodType: '',
      companyName:'',
      quantity: '',
      foodImage: null,
      weight: '',
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

      if(isSubmitted){
        return;
      }

      if(formData.quantity <= 0){
        toast.error('Invalid Quantity Value');
        return;
      }
      const isConfirmed = window.confirm('Are you sure you want sell this product');

      if (isConfirmed) {
        isSubmitted(true);

        try{

        const formDataToSend = new FormData();

        formDataToSend.append('companyName',formData.companyName);
        formDataToSend.append('type',formData.foodType);
        formDataToSend.append('photo',formData.foodImage);
        formDataToSend.append('price',formData.price);

        if(formData.quantity > 0){
          formDataToSend.append('quantity', formData.quantity);
        }
        formDataToSend.append('weight', formData.weight);
        formDataToSend.append('description', formData.description);
      }
      catch{
        
      }
    }
    };
  
    return (
      <>
        <ToastContainer />
        <div className="food-mainContainer">
          <div className="food-form-container">
            <h2 className="food-form-title">Sell Pet-Food</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="foodType">Select Type of food:</label>
              <select
                name="foodType"
                id="foodType"
                className="food-input-field"
                value={formData.foodType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select</option>
                <option value="Dry">Kibble/Dry</option>
                <option value="Canned">Canned</option>
                <option value="Semi_Moist">Semi-Moist</option>
                <option value="Raw">Raw</option>
                <option value="Other">Other</option>

              </select>

              
  
              <label htmlFor="companyName">Company Name:</label>
              <input
                type="text"
                name="companyName"
                id="companyName"
                className="food-input-field"
                value={formData.companyName}
                onChange={handleInputChange}
                required
              />
  
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                className="food-input-field"
                value={formData.quantity}
                onChange={handleInputChange}
                required
              />

  
              <label htmlFor="foodImage">Food Picture:</label>
              <input
                type="file"
                name="foodImage"
                id="foodImage"
                className="food-input-field"
                onChange={handleFileUpload}
                required
              />

              <label htmlFor="price">Price:</label>
              <input
                  type="number"
                  name="price"
                  id="price"
                  className="food-input-field"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
              />

              <label htmlFor="weight">Weight per packet/per piece:</label>
              <input
                  type="number"
                  name="weight"
                  id="price"
                  className="food-input-field"
                  value={formData.weight}
                  onChange={handleInputChange}
                  required
              />
  
              <label htmlFor="description">Description:</label>
              <textarea
                name="description"
                id="description"
                className="food-input-field"
                value={formData.description}
                onChange={handleInputChange}
              />
  
              <button type="submit" className="food-submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      </>
    );
  };
  
export default SellerAddFood;

