import React, { useEffect, useState } from 'react'
import AdminSellerNewRequestComponent from './AdminSellerNewRequestComponent'
import dogimg2 from "./assets/dogimg2.jpg";
import {useNavigate} from 'react-router-dom';
import adminAxiosInstance from '../helper/adminAxios';
import { toast } from "react-toastify";
// import logo from './assets/logo.png';



const AdminSellerNewRequest = () => {
  const navigate = useNavigate();
  const [newSellers, setNewSellers] = useState([]);

  const removeSeller = (indexToRemove) => {
    const updatedItems = newSellers.filter((_, index) => index !== indexToRemove);
    setNewSellers(updatedItems);
  }

  useEffect(()=>{
    const getNewRegisteredSeller = async() => {
      try {
        const response = await adminAxiosInstance.get('api/admin/new/registered/sellers');
        if(response.status === 200){
          setNewSellers(response.data);
        } else {
          throw new Error('Error in fetching new sellers list');
        }
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
    getNewRegisteredSeller()
  }, []);
  return (

    <div className='AdminSellerNewRequest-maincontainer'>
      {
        newSellers.map((seller, index) => {
          return(
            <AdminSellerNewRequestComponent 
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
        })
      }

        {/* <AdminSellerNewRequestComponent 
          sellername='here seller name' 
          img={dogimg2}
          sellershopname='here seller shop name'
          selleremail='hereselleremail@gmail.com'
          sellerdob='here seller dob'
          sellerphno={9876543210}
          selleraccountnumber={123456}
          selleradhaarnumber={9876543210010}
        /> */}
    </div>
  )
}

export default AdminSellerNewRequest
