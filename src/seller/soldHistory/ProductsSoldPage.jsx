import React, { useEffect,useState } from 'react'
import PetSold from './PetSold'
import FoodSold from './FoodSold'
import AcceSold from './AcceSold'
import { toast } from 'react-toastify'
import sellerAxiosInstance from '../../helper/sellerAxios'

const ProductsSoldPage = () => {

  const [soldorders, setSoldOrders] = useState([]);

  useEffect(()=>{

    (async()=>{
      try {
        const response = await sellerAxiosInstance.get('api/seller/get/order/sold');
        if(response.status == 200 && response.data){
          console.log(response.data);
          setSoldOrders(response.data);
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

  }, []);
  return (
  <>
  <h1>Sold History</h1>
  {
    soldorders.map((order, index)=>{
      if(order.productCategory == 'pet'){
        return(
          <PetSold
          orderid={order._id}
          orderDate={order.orderDate}
          Breed={order.productType}
          pImage={order.photo}
          gender={order.gender}
          Quantity={order.quantity}
          payment={order.paymentMode}
          Price={order.totalAmount}
          />
        )
      }else if(order.productCategory=='food'){
        return(
          <FoodSold
          orderid={order._id}
          orderDate={order.orderDate}
          productType={order.productType}
          companyName={order.companyName}
          pImage={order.photo}
          gender={order.gender}
          Quantity={order.quantity}
          Weight={order.weight}
          payment={order.paymentMode}
          Price={order.totalAmount}
          />
        )
      }else if(order.productCategory=='accessory'){
        return(
          <AcceSold
          orderid={order._id}
          orderDate={order.orderDate}
          productType={order.productType}
          pName={order.productTitle}
          companyName={order.companyName}
          pImage={order.photo}
          Quantity={order.quantity}
          Weight={order.weight}
          payment={order.paymentMode}
          Price={order.totalAmount}
          />
        )
      }

      })
    }
  </>
  )
}

export default ProductsSoldPage
