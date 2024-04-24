import React, { useEffect } from 'react'
// import AdminLogin from './AdminLogin'
import AdminTopNavbar from './AdminTopNavbar'
import AdminLeftNavbar from './AdminLeftNavbar'
import AdminSellerNewRequest from './AdminSellerNewRequest'
import './css/Admin.css';
import adminAxiosInstance from '../helper/adminAxios';
import { ToastContainer, toast } from "react-toastify";
import {useNavigate, Outlet} from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();


  useEffect(()=>{
    const authenticate = async() => {
      try {
        const response = await adminAxiosInstance.get('api/admin/authenticate');
      } catch (error) {
        if(error.response){
          if(error.response.status === 401){
            navigate('/admin/login', {replace: true});
          } else if(error.response.data && error.response.data.message){
            toast.error(error.response.data.message);
          } else {
              toast.error(error.message);
          }
        } else {
          toast.error(error.message);
        }
      }
    }
    authenticate();
  }, []);


  return (
    <>
      {/* <ToastContainer />
       <AdminTopNavbar/>
    <div className="admin-container">
      <AdminLeftNavbar/>
      <AdminSellerNewRequest/>
    </div> */}

    <AdminTopNavbar/>
      <div className="container">
        <AdminLeftNavbar />
        <div className="scrollable-content">
        <div className="scrollable-content-inner"> 
          <Outlet/>
           
            {/* <AdminSellerNewRequest/> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Admin
