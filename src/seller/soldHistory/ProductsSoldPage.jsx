import React, { useEffect } from 'react'
import PetSold from './PetSold'
import FoodSold from './FoodSold'
import AcceSold from './AcceSold'
import { toast } from 'react-toastify'
import sellerAxiosInstance from '../../helper/sellerAxios'

const ProductsSoldPage = () => {

  const [orders, setOrders] = useState([]);

  useEffect(()=>{

    (async()=>{
      try {
        const response = await sellerAxiosInstance.get('api/seller/get/order/request');
        if(response.status == 200 && response.data){
          // console.log(response.data);
          setOrders(response.data);
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
    <PetSold/>
    <FoodSold/>
    <AcceSold/>
    
  </>
  )
}

export default ProductsSoldPage
