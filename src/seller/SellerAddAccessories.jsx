import React, { useState } from 'react';
import { ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/SellerAddAccessories.css';
import sellerAxiosInstance from '../helper/sellerAxios'
import Swal from 'sweetalert2'
import qr from './assets/qr.jpg'

const SellerAddAccessories = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
      acceType: '',
      name:'',
      companyName:'',
      quantity: '',
      length: '',
      width: '',
      height: '',
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
  
    const handleSubmit = async(e) => {
      e.preventDefault();

      if(isSubmitted){
        return;
      }

      if(formData.quantity <= 0){
        toast.error('Invalid Quantity Value');
        return;
      }
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Are you sure you want to sell this product?',
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

        formDataToSend.append('type',formData.acceType);
        formDataToSend.append('name',formData.name);
        formDataToSend.append('companyName',formData.companyName);
        formDataToSend.append('photo',formData.acceImage);
        formDataToSend.append('price',formData.price);
        formDataToSend.append('quantity', formData.quantity);
        formDataToSend.append('weight', formData.weight);
        formDataToSend.append('length', formData.length);
        formDataToSend.append('width', formData.width);
        formDataToSend.append('height', formData.height);
        formDataToSend.append('description', formData.description);

        const response = await sellerAxiosInstance.post('api/seller/add/product/accessory',formDataToSend,{
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
               <label htmlFor="name">Title of product:</label>
              <input
                type="text"
                placeholder='Title of product'
                name="name"
                id="name"
                className="acce-input-field"
                value={formData.name}
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

            <label htmlFor="height">Height of Product:</label>
              <input
                type="number"
                name="height"
                placeholder='Height in cm (*Required)'
                id="height"
                className="acce-input-field"
                value={formData.height}
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
 
