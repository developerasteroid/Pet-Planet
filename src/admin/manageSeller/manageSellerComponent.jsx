import React from 'react'

const manageSellerComponent = () => {
  return (
    <div className="ManagePet-Card">
    <h2>New Request</h2>
      <div className="ManagePet-Content">
      <div className="ManagePet-Field">
        <span>Picture :</span> <div><img src={props.img} alt="seller-picture" /></div>
      </div>
      <div className="ManagePet-Field">
        <span>Name:</span> {props.sellername}
      </div>
      <div className="ManagePet-Field">
        <span>Shop Name:</span> {props.sellershopname}
      </div>
      <div className="ManagePet-Field">
        <span>E-mail :</span> {props.selleremail}
      </div>
      <div className="ManagePet-Field">
        <span>Seller d.o.b:</span> {props.sellerdob}
      </div>
      <div className="ManagePet-Field">
        <span>Ph.no:</span> {props.sellerphno}
      </div>
      <div className="ManagePet-Field">
        <span>Adhaar no:</span> {props.selleradhaarnumber}
      </div>
      <div className="ManagePet-Field">
        <span>Bank Account No:</span> {props.selleraccountnumber}
      </div>

          </div>
          <div className="ManagePet-Actions">
    <button className="Accept" onClick={()=>{updateApproval(props.sellerID, true)}}>
          Accept
        </button>
      <button className="Decline" onClick={()=>{updateApproval(props.sellerID, false)}}>
        Decline
      </button>
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

export default manageSellerComponent
