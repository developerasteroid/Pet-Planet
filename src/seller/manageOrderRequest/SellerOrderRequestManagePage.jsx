import React from 'react'
import SellerPetOrderRequestManage from './SellerPetOrderRequestManage'
import SellerFoodOrderRequestManage from './SellerFoodOrderRequestManage'
import SellerAcceOrderRequestManage from './SellerAcceOrderRequestManage'

const SellerOrderRequestManagePage = () => {
  return (
    <>
    <SellerPetOrderRequestManage/>
    <SellerFoodOrderRequestManage/>
    <SellerAcceOrderRequestManage/>
    </>
  )
}

export default SellerOrderRequestManagePage
