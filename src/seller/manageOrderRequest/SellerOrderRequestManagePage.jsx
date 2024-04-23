import React from 'react'
import SellerPetOrderRequestManage from './SellerPetOrderRequestManage'
import SellerFoodOrderRequestManage from './SellerFoodOrderRequestManage'
import SellerAcceOrderRequestManage from './SellerAcceOrderRequestManage'

const SellerOrderRequestManagePage = () => {
  return (
    <>
    <h1 align="center">Manage Order Request</h1>
    <SellerPetOrderRequestManage/>
    <SellerFoodOrderRequestManage/>
    <SellerAcceOrderRequestManage/>
    </>
  )
}

export default SellerOrderRequestManagePage
