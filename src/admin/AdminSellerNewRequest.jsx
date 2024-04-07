import React from 'react'
import AdminSellerNewRequestComponent from './AdminSellerNewRequestComponent'
import dogimg2 from "./assets/dogimg2.jpg";
// import logo from './assets/logo.png';



const AdminSellerNewRequest = () => {
  return (

    <div className='AdminSellerNewRequest-maincontainer'>

        <AdminSellerNewRequestComponent 
          sellername='here seller name' 
          img={dogimg2}
          sellershopname='here seller shop name'
          selleremail='hereselleremail@gmail.com'
          sellerdob='here seller dob'
          sellerphno={9876543210}
          selleraccountnumber={123456}
          selleradhaarnumber={9876543210010}
        />
    </div>
  )
}

export default AdminSellerNewRequest
