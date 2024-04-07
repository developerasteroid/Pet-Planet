import React from 'react'
import TopNavbar from './TopNAvbar'
import LeftNavbar from './LeftNavbar'
import './css/Seller.css'
import APPage from './APPage'
import SellerAddPet from './SellerAddPet'


function Seller() {
  return (
    <>
    {/* <SellerRegister/> */}
    {/* <LoginForm/> */}
    <TopNavbar/>
    <div className="container">
      <LeftNavbar/>
      {/* <APPage/> */}
      <SellerAddPet/>
    </div>
    </>
  )
}

export default Seller