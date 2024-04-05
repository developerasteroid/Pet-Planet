const Seller = require('./../models/sellerModel');

const getNewRegisteredSeller = async(req, res) => {
    try {
        let sellers = await Seller.find({isApproved:false});
        let data = [];
        if(sellers){
            sellers.forEach((seller) => {
                data.push({
                    _id: seller._id,
                    fullName: seller.fullName,
                    shopName: seller.shopName,
                    email:seller.email,
                    dateOfBirth:seller.dateOfBirth,
                    mobileNumber:seller.mobileNumber,
                    adharNumber:seller.adharNumber,
                    bankAccountNumber:seller.bankAccountNumber,
                    profileImageUrl:seller.profileImageUrl
                })
            })
        }
        
        res.json(data);
    } catch (error) {
        console.error("Error in getNewRegisteredSeller:" + error.message);
        res.status(500).json({message: 'Internal server error'});
    }
}


module.exports = {getNewRegisteredSeller}