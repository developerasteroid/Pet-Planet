import React from 'react'
import PetSold from './PetSold'
import FoodSold from './FoodSold'
import AcceSold from './AcceSold'

const ProductsSoldPage = () => {
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
