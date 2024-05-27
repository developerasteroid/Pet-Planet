import React from 'react'
import SellerPetOrder from './SellerPetOrder'
import SellerFoodOrder from './SellerFoodOrder'
import SellerAcceOrder from './SellerAcceOrder'

const ManageOrders = () => {
  return (
    <>
    <h1>Manage Orders</h1>
    <SellerPetOrder/>
    <SellerFoodOrder/>
    <SellerAcceOrder/>
    </>
  )
}

export default ManageOrders
