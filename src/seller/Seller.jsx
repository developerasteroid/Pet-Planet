import React from 'react'
import SellerRegister from './SellerRegister'
import TopNavbar from './TopNAvbar'
import LeftNavbar from './LeftNavbar'
import './css/Seller.css'
import APPage from './APPage'
import LoginForm from './LoginForm'

function Seller() {
  return (
    <>
    {/* <SellerRegister/> */}
    {/* <LoginForm/> */}
    <TopNavbar/>
    <div className="container">
      <LeftNavbar/>
      <APPage/>
    </div>
    </>
  )
}

export default Seller