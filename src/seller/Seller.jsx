import React from 'react';
import TopNavbar from './TopNavbar';
import LeftNavbar from './LeftNavbar';
import './css/Seller.css';
import APPage from './APPage';
import SellerAddPet from './SellerAddPet';
import SellerAddFood from './SellerAddFood';
import SellerAddAccessories from './SellerAddAccessories';
import SellerRegister from './SellerRegister';
import SellerManageProducts from './SellerManageProducts';

function Seller() {
  return (
    <>
      {/* <SellerRegister/> */}
      {/* <LoginForm/> */}
      <TopNavbar />
      <div className="container">
        <LeftNavbar />
        <div className="scrollable-content">
        <div className="scrollable-content-inner"> 
          {/* <APPage/> */}
         
            <SellerAddPet /> 
            {/* <SellerAddFood/> */}
            {/* <SellerAddAccessories/> */}
            {/* <SellerManageProducts/> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Seller;
