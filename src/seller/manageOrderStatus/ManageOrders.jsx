import React, { useEffect, useState } from 'react'
import SellerPetOrder from './SellerPetOrder'
import SellerFoodOrder from './SellerFoodOrder'
import SellerAcceOrder from './SellerAcceOrder'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import sellerAxiosInstance from '../../helper/sellerAxios'



const ManageOrders = () => {
  const [data, setData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const navigate = useNavigate();

  const fetchOrderActive = async()=>{
    try {
      const response = await sellerAxiosInstance.get('api/seller/get/order/active');
      if(response.status == 200 && response.data){
        console.log(response.data);
        setData(response.data);
      }
    } catch(error){
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

  useEffect(()=>{
    fetchOrderActive();
  },[]);

  const upgradeAction = async(orderId, otp='') => {
    try {
      const response = await sellerAxiosInstance.post('api/seller/order/upgrade', {orderId, otp})
      toast.success('Status upgraded');
      fetchOrderActive();
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


  const sendOtpAction = async(orderId) => {
    console.log('sending');
    try {
      const response = await sellerAxiosInstance.post('api/seller/order/send/otp', {orderId});
      if(response.status == 200){
        toast.success('OTP sent to user successfully');
        return true;
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



  return (
    <>
    <h1>Manage Orders</h1>
    {
      data.map((item, index) => {
        if(item.productCategory == 'pet'){
          return (
            <SellerPetOrder
              key={index}
              oderid={item._id}
              customerName={item.customerName}
              customerAddress={item.address}
              customerphno={item.customerNumber}
              customerEmail={item.customerEmail}
              Breed={item.productType}
              pImage={item.photo}
              gender={item.gender}
              Quantity={item.quantity}
              payment={item.paymentMode}
              Price={item.totalAmount}
              status={item.status}
              sendOtp={sendOtpAction}
              upgradeAction={upgradeAction}
              // status={'out for delivery'}
            />
          )
        } else if(item.productCategory == 'food'){
          return (
            <SellerFoodOrder
              key={index}
            />
          )
        } else if(item.productCategory == 'accessory'){
          return (
            <SellerAcceOrder
              key={index}
            />
          )
        } else {
          return (<h3>Unknown Category :{'('}</h3>);
        }
      })
    }
    
    </>
  )
}

export default ManageOrders
