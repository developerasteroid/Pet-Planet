import React, { useState } from 'react';
import './css/SellerManagePetComponent.css';
import { useNavigate } from 'react-router-dom';
import sellerAxiosInstance from '../helper/sellerAxios';
import { toast } from 'react-toastify';


const SellerManagePetFoodComponent = (props) => {

  const [isChanged, setIsChanged] = useState(false);
  const navigate= useNavigate();
  const [data, setData] = useState({
    Quantity: props.Quantity || 0,
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
        setIsChanged(false);
        try{
          const response = await sellerAxiosInstance.post('api/seller/update/product',{productId:props.id, quantity: data.Quantity, price: data.Price});

          if(response.status == 200){
            toast.success("Product updated successfully");
            setIsChanged(false);
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
      <h2>Manage Pet Food</h2>
    <div className="ManagePet-Content">
      <div className="ManagePet-Field">
        <span>Food Type:</span> {props.foodType}
      </div>
      <div className="ManagePet-Field">
        <span>Company Name:</span> {props.companyName}
      </div>
      <div className="ManagePet-Field">
      <span><div>Image:</div></span> <img src={props.foodImage} alt="food-picture" />
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

export default SellerManagePetFoodComponent
