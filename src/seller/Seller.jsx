import React from 'react'
// import RegistrationForm from './RegistrationForm'
import TopNavbar from './TopNAvbar'
import LeftNavbar from './LeftNavbar'
import APCategoryComponent from './APCategoryComponent'
import './css/Seller.css'

function Seller() {
  return (
    <>
    {/* <RegistrationForm/> */}
    <TopNavbar/>
    <div className="container">
      <LeftNavbar/>
      <APCategoryComponent/>
    </div>
    </>
  )
}

export default Seller