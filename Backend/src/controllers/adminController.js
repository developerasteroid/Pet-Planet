const { BASE_URL } = require('../constants');
const Seller = require('./../models/sellerModel');
const path = require('path');
const fs = require('fs').promises;



const getNewRegisteredSeller = async(req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
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
                    profileImageUrl:`${BASE_URL}/api/admin/seller/profile/image/${token}/${seller.profileImageUrl}`
                })
            })
        }
        
        res.json(data);
    } catch (error) {
        console.error("Error in getNewRegisteredSeller:" + error.message);
        res.status(500).json({message: 'Internal server error'});
    }
}

const getSellerProfileForAdmin = async(req, res) => {
    try {
        const filename = req.params.filename;
        if(!filename){
            return res.status(400).json({message:'filename is missing'});
        }
        const filePath = path.join(__dirname, '../uploads/seller/profiles', filename); // Construct file path using path.join
        const defaultFile = path.join(__dirname, '../assets/images', process.env.default_profile);
        // Check if the file exists asynchronously
        try {
            await fs.access(filePath);
            // File exists, send the file in the response
            res.sendFile(filePath);
        } catch (error) {
            if (error.code === 'ENOENT') {
                // File does not exist
                try {
                    await fs.access(defaultFile);
                    res.sendFile(defaultFile);
                } catch (error) {
                    res.status(404).send('File not found.');
                }
            } else {
                // Other error occurred
                console.error('Error accessing file (getSellerProfileForAdmin):', error);
                res.status(500).json({message: 'Internal server error'});
            }
        }
    } catch (error) {
        console.error('Error in getSellerProfileForAdmin:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}


module.exports = {getNewRegisteredSeller, getSellerProfileForAdmin}