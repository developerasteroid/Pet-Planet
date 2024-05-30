import React, { useState } from 'react';
import './css/SellerManagePetComponent.css';
import sellerAxiosInstance from '../helper/sellerAxios';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import qr from './assets/qr.jpg'

const SellerManagePetAcceComponent = (props) => {

    
  const [isChanged, setIsChanged] = useState(false);
  const [quantity, setQuantity] = useState(props.Quantity);

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

  const handleSaveChanges = async(e) => {

    e.preventDefault();

      const isConfirmed = window.confirm('Are you sure you want to edit this product');

      if (isConfirmed) {
        if(data.Quantity > quantity){

          const pricePerPiece = 50;
  
          const result = await Swal.fire({
            title: `Pay ${ pricePerPiece * (data.Quantity - quantity)}Rs`,
            text: 'Are you sure you want to update this product?',
            imageUrl: qr, // Use the imported image here
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
            showCancelButton: true,
            confirmButtonText: 'Yes, Update Product!',
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
            if (!result.isConfirmed){
              return;
            }
  
          }
        setIsChanged(false);
        try{
          const response = await sellerAxiosInstance.post('api/seller/update/product',{productId:props.id, quantity: data.Quantity, price: data.Price});

          if(response.status == 200){
            toast.success("Product updated successfully");
            setIsChanged(false);
            setQuantity(data.Quantity);

          }
        }
        catch (error) {
          setIsChanged(true);
          if(error.response){
            if(error.response.status === 401){
              navigate('/seller/login', {replace: true});
            } else if(error.response.data && error.response.data.message){
              toast.error(error.response.data.message);
            } else {
                toast.error(error.message);
            }
          } else {
            toast.error(error.message);
          }
        }
      } else {
        console.log('data updation cancelled.');
      } 
  };

  const handleDeleteBtn = async() => {
    const isConfirmed = window.confirm('Are you sure you want to delete this product');
    if (isConfirmed) {
      try {
        const response = await sellerAxiosInstance.post('api/seller/delete/product', {productId:props.id});
        if(response.status == 200){
          props.removeCallBack(props.id);
          toast.success("Product Deleted successfully");
        }
      } catch (error) {
        if(error.response){
          if(error.response.status === 401){
            navigate('/seller/login', {replace: true});
          } else if(error.response.data && error.response.data.message){
            toast.error(error.response.data.message);
          } else {
              toast.error(error.message);
          }
        } else {
          toast.error(error.message);
        }
      }
    }
  };
  return (
    <div className="ManagePet-Card">
      <h2>Manage Pet Accessory</h2>
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
