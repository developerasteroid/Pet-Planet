import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/SellerAddFood.css';
import sellerAxiosInstance from '../helper/sellerAxios'
import Swal from 'sweetalert2'
import qr from './assets/qr.jpg'

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
  
    const handleSubmit = async(e) => {

      e.preventDefault();

      if(isSubmitted){
        return;
      }

      if(formData.quantity <= 0){
        toast.error('Invalid Quantity Value');
        return;
      }
      const pricePerPiece = 25;
      const result = await Swal.fire({
        title: `Pay ${ pricePerPiece * formData.quantity}Rs`,
        text: `Are you sure you want to sell this product?`,
        imageUrl: qr, // Use the imported image here
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        showCancelButton: true,
        confirmButtonText: 'Yes, Add Product!',
        cancelButtonText: 'No, cancel!',
        input: 'text',
        inputLabel: 'Transaction ID',
        inputPlaceholder: 'Enter Transaction ID',
        inputValidator: (value) => {
            if (!value) {
                return 'You need to enter the Transaction ID!';
            }
        },
        preConfirm: (value) => {
            if (!value) {
                Swal.showValidationMessage('Transaction ID is required');
            }
            return value;
        }
        });

      if (result.isConfirmed) {
        setIsSubmitted(true);

        try{

        const formDataToSend = new FormData();

        formDataToSend.append('companyName',formData.companyName);
        formDataToSend.append('name',formData.name);
        formDataToSend.append('type',formData.foodType);
        formDataToSend.append('photo',formData.foodImage);
        formDataToSend.append('price',formData.price);
        formDataToSend.append('quantity', formData.quantity);
        formDataToSend.append('weight', formData.weight);
        formDataToSend.append('description', formData.description);

        const response = await sellerAxiosInstance.post('api/seller/add/product/food',formDataToSend,{
          headers: {
            'Content-Type':'multipart/form-data'
          }
        });
        if(response.status===200 && response.data && response.data.message){
          toast.success(response.data.message)
        }
        console.log(response);
      }
      catch(error){
        if(error.response){
          if(error.response.status === 401){
            navigate('/seller/login',{replace: true});
          }
          else if(error.response.data && error.response.data.message){
            toast.error(error.response.data.message);
          } else{
            toast.error(error.message)
          }
        } else{
          toast.error(error.message)
        }
      }
      setIsSubmitted(false);
    }
    else{
      //if cancelled
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

            <label htmlFor="name">Title of Porduct:</label>
              <input
                type="text"
                name="name"
                id="name"
                className="food-input-field"
                value={formData.name}
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

