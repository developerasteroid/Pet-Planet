import React, { useEffect } from 'react'
import PetSold from './PetSold'
import FoodSold from './FoodSold'
import AcceSold from './AcceSold'
import { toast } from 'react-toastify'
import sellerAxiosInstance from '../../helper/sellerAxios'

const ProductsSoldPage = () => {

  useEffect(()=>{

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
