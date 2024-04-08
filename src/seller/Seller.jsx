import React from 'react';
import TopNavbar from './TopNavbar';
import LeftNavbar from './LeftNavbar';
import './css/Seller.css';
import APPage from './APPage';
import SellerAddPet from './SellerAddPet';

function Seller() {
  return (
    <>
      {/* <SellerRegister/> */}
      {/* <LoginForm/> */}
      <TopNavbar />
      <div className="container">
        <LeftNavbar />
        <div className="scrollable-content"> {/* Add a container for scrollable content */}
          {/* <APPage/> */}
          <div className="scrollable-content-inner"> {/* Add an inner container */}
            <SellerAddPet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Seller;
