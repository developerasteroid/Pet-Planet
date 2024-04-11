import React, { useEffect } from 'react';
import TopNavbar from './TopNavbar';
import LeftNavbar from './LeftNavbar';
import './css/Seller.css';
import APPage from './APPage';
import SellerAddPet from './SellerAddPet';
import SellerAddFood from './SellerAddFood';
import SellerAddAccessories from './SellerAddAccessories';
import SellerRegister from './SellerRegister';
import SellerManageProducts from './SellerManageProducts';
import sellerAxiosInstance from '../helper/sellerAxios';
import {useNavigate, Outlet} from 'react-router-dom';

function Seller() {

  const navigate = useNavigate();
  useEffect(()=>{
    const authenticate = async() => {
      try {
        const response = await sellerAxiosInstance.get('api/seller/authenticate');
      } catch (error) {
        if(error.response){
          if(error.response.status === 401){
            navigate('/seller/login', {replace: true});
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
      {/* <SellerRegister/> */}
      {/* <LoginForm/> */}
      <TopNavbar />
      <div className="container">
        <LeftNavbar />
        <div className="scrollable-content">
        <div className="scrollable-content-inner"> 
          <Outlet/>
           
            {/* <SellerManageProducts/> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Seller;
