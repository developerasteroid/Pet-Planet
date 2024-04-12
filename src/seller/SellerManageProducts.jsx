import React from 'react'
import SellerManagePetComponent from './SellerManagePetComponent'
import SellerManagePetFoodComponent from './SellerManagePetFoodComponent'
import SellerManagePetAcceComponent from './SellerManagePetAcceComponent'

const SellerManageProducts = () => {
  return (
    <>
     <SellerManagePetComponent petName={""} petBreed={""} petImage={""} gender={""} Quantity={""} Price={""}/>
    <SellerManagePetFoodComponent foodType={""} companyName={""} foodImage={""} Quantity={""} Weight={""} Price={""} />
    <SellerManagePetAcceComponent AcceType={""} companyName={""} acceImage={""} Quantity={""} Price={""}/>
    </>
   
  )
}

export default SellerManageProducts;
