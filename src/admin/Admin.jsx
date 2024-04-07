import React from 'react'
// import AdminLogin from './AdminLogin'
import AdminTopNavbar from './AdminTopNavbar'
import AdminLeftNavbar from './AdminLeftNavbar'
import AdminSellerNewRequest from './AdminSellerNewRequest'
import './css/Admin.css'

const Admin = () => {
  return (
    <>
       <AdminTopNavbar/>
    <div className="admin-container">
      <AdminLeftNavbar/>
      <AdminSellerNewRequest/>
    </div>
    </>
  )
}

export default Admin
