import React, { useEffect, useState } from 'react'
import SellerManagePetComponent from './SellerManagePetComponent'
import SellerManagePetFoodComponent from './SellerManagePetFoodComponent'
import SellerManagePetAcceComponent from './SellerManagePetAcceComponent'
import sellerAxiosInstance from '../helper/sellerAxios'
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';

const SellerManageProducts = () => {
  const navigate = useNavigate();
  const [productsData, setProductsData] = useState([]);

  const removeCallBack = (id) => {
    const updatedProducts = productsData.filter((e) => e._id != id);
    setProductsData(updatedProducts);
    console.log(updatedProducts);
  }


  useEffect(()=>{
    const getProducts = async() => {
      try {
        const response = await sellerAxiosInstance.get('api/seller/get/my/products');
        if(response.status == 200 && response.data){
          setProductsData(response.data);
        } else {
            toast.error("Something went wrong!");
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
    getProducts();
  }, []);


  return (
    <>
    {
      productsData.map((product, index) => {
        if(product.category == "pet"){
          return(
            <SellerManagePetComponent key={index} id={product._id} removeCallBack={removeCallBack} petName={product.name} petBreed={product.breed} petImage={product.photo} gender={product.gender} Quantity={product.quantity} Price={product.price}/>
          );
        } else if(product.category == "food") {
          return(
            <SellerManagePetFoodComponent key={index} id={product._id} foodType={product.type} companyName={product.companyName} foodImage={product.photo} Quantity={product.quantity} Weight={product.weight} Price={product.price} />
          );
        } else if(product.category == "accessory"){
          return(
            <SellerManagePetAcceComponent key={index} id={product._id} AcceType={product.type} companyName={product.companyName} acceImage={product.photo} Quantity={product.quantity} Price={product.price}/>
          );
        }
      })
    }
    </>
   
  )
}

export default SellerManageProducts;
