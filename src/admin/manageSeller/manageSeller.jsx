import React from 'react'
import manageSellerComponent from './manageSellerComponent'
const manageSeller = () => {
  return (
    <manageSellerComponent
    sellerID = {seller._id}
    sellername={seller.fullName} 
    img={seller.profileImageUrl}
    sellershopname={seller.shopName}
    selleremail={seller.email}
    sellerdob={seller.dateOfBirth}
    sellerphno={seller.mobileNumber}
    selleraccountnumber={seller.bankAccountNumber}
    selleradhaarnumber={seller.adharNumber}
    removeCallback={()=>{removeSeller(index)}}
  />
  )
}

export default manageSeller
