import React from 'react'
import PropTypes from 'prop-types';
import './css/AdminSellerNewRequestComponent.css'



const AdminSellerNewRequestComponent = (props) => {
  return (
    <div className='admin-SellerNewRequestComponent-container'>

      <div className='Adminseller-info-container'>

      

        <div>Picture: <div className='admin-sellerProfile'><img src={props.img} alt="seller-picture" /></div></div>
        <div>Name: <div>{props.sellername}</div></div>
        <div>Shop-Name: <div>{props.sellershopname}</div></div>
        <div>e-mail: <div>{props.selleremail}</div></div>
        <div>dob: <div>{props.sellerdob}</div></div>
        <div>Ph-no: <div>{props.sellerphno}</div></div>
        <div>Adhaar-number: <div>{props.selleradhaarnumber}</div></div>
        <div>Bank-account-number: <div>{props.selleraccountnumber}</div></div>

        </div>

        <div className="AdminButton-container">
          <button className='Admin-btn-rccept'>Accept</button>
          <button className='Admin-btn-reject'>Decline</button>
        </div>
      
    </div>
  )
}

AdminSellerNewRequestComponent.propTypes = {
    img: PropTypes.string.isRequired,
    sellername: PropTypes.string.isRequired,
    sellershopname: PropTypes.string.isRequired,
    selleremail: PropTypes.string.isRequired,
    sellerdob: PropTypes.string.isRequired,
    sellerphno: PropTypes.number.isRequired,
    selleradhaarnumber: PropTypes.number.isRequired,
    selleraccountnumber: PropTypes.number.isRequired,

    
  };

export default AdminSellerNewRequestComponent

