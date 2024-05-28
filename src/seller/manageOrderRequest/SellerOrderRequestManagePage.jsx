import React, { useEffect, useState } from 'react'
import SellerPetOrderRequestManage from './SellerPetOrderRequestManage'
import SellerFoodOrderRequestManage from './SellerFoodOrderRequestManage'
import SellerAcceOrderRequestManage from './SellerAcceOrderRequestManage'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import sellerAxiosInstance from '../../helper/sellerAxios'

const SellerOrderRequestManagePage = () => {
  const [orders, setOrders] = useState([]);
  const [actionedOrder, setActionedOrder] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const navigate = useNavigate();


  useEffect(()=>{
    (async()=>{
      try {
        const response = await sellerAxiosInstance.get('api/seller/get/order/request');
        if(response.status == 200 && response.data){
          // console.log(response.data);
          setOrders(response.data);
          setIsDataLoaded(true);
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
    })();
  },[]);

  const acceptOrderRequest = async(orderId) => {
    try {
      setActionedOrder((prev) => [...prev, orderId])
      const response = await sellerAxiosInstance.post('api/seller/order/accept',{orderId})
    } catch (error){
      setActionedOrder((prev) => prev.filter(id => id != orderId));
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

  const declineOrderRequest = async(orderId) => {
    try {
      setActionedOrder((prev) => [...prev, orderId])
      const response = await sellerAxiosInstance.post('api/seller/order/cancel',{orderId})
    } catch (error){
      setActionedOrder((prev) => prev.filter(id => id != orderId));
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
    <h1 align="center">Manage Order Request</h1>
    {
      orders.map((order, index)=>{
        if(actionedOrder.includes(order._id)){
          return null;
        }
        if(order.productCategory == 'pet'){
          return (
                  <SellerPetOrderRequestManage 
                    key={index}
                    oderid={order._id}
                    pName={order.productTitle}
                    customerName={order.customerName}
                    customerMobile={order.customerNumber}
                    customerEmail={order.customerEmail}
                    customerAddress={order.address}
                    Breed={order.productType}
                    pImage={order.photo}
                    gender={order.gender}
                    Quantity={order.quantity}
                    payment={order.paymentMode}
                    Price={order.totalAmount}
                    accept={acceptOrderRequest}
                    decline={declineOrderRequest}
                  />
                );
        } else if(order.productCategory == 'food'){
            return (
                    <SellerFoodOrderRequestManage 
                      key={index}
                      oderid={order._id}
                      pName={order.productTitle}
                      customerName={order.customerName}
                      customerAddress={order.address}
                      customerMobile={order.customerNumber}
                      customerEmail={order.customerEmail}
                      productType={order.productType}
                      companyName={order.companyName}
                      pImage={order.photo}
                      Quantity={order.quantity}
                      Weight={order.weight}
                      payment={order.paymentMode}
                      Price={order.totalAmount}
                      accept={acceptOrderRequest}
                      decline={declineOrderRequest}
                    />
                  );
        } else if(order.productCategory == 'accessory'){
            return (
                    <SellerAcceOrderRequestManage 
                      key={index}
                      oderid={order._id}
                      pName={order.productTitle}
                      customerName={order.customerName}
                      customerMobile={order.customerNumber}
                      customerEmail={order.customerEmail}
                      customerAddress={order.address}
                      productType={order.productType}
                      companyName={order.companyName}
                      pImage={order.photo}
                      Quantity={order.quantity}
                      Weight={order.weight}
                      payment={order.paymentMode}
                      Price={order.totalAmount}
                      accept={acceptOrderRequest}
                      decline={declineOrderRequest}
                    />
                  );
        } else {
          return (<h3>Unknown Category :{'('}</h3>);
        }
      })
    }
    
    </>
  )
}

export default SellerOrderRequestManagePage
