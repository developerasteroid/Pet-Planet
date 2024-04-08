const { BASE_URL, LOGIN_PAGE } = require('../constants');
const Seller = require('./../models/sellerModel');
const path = require('path');
const { SendMail } = require('./authController');
const { error } = require('console');
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

const updateApprovalRegisteredSeller = async(req, res) => {
    try {
        const {action, sellerID} = req.body;
        if(!sellerID){
            return res.status(400).json({message:'sellerID is missing'});
        }
        if(action == undefined){
            return res.status(400).json({message:'action is missing'});
        }
        const seller = await Seller.findById(sellerID);
        if(!seller){
            return res.status(404).json({message: "Seller not found"});
        }
        if(seller.isApproved){
            return res.status(403).json({message: "Cannot perform action for alredy approved Seller"});
        }
        if(action) {
            try {
                const updatedSeller = await Seller.findByIdAndUpdate(sellerID, {isApproved: true}, {new: true});
                if(updatedSeller){
                    const html = `
                    <div style="border:1px solid #000000; margin:10px; padding:10px; text-align:center;">
                    <h2>Pet Planet</h2>
                    <hr/>
                    <h4>Your Seller account got approved</h4>
                    <p>You can login to your seller account</p>
                    <p><a href="${LOGIN_PAGE}">Login</a></p>
                    </div>
                    `;
                    SendMail(process.env.EMAIL, updatedSeller.email, "Your Account is Approved", html)
                    .then((value)=>{
                        
                    })
                    .catch((error)=>{
                        console.error('Error sending mail for seller approval: ', error);
                    });
                    return res.json({message: updatedSeller.fullName + ' is approved'});
                }
                return res.status(404).json({message: "Seller not found to approve"});
            } catch (error){
                console.error('Error while approving new seller to true (updateApprovalRegisteredSeller):', error);
                return res.status(500).json({message: 'Internal server error'});
            }
        } else {
            try {
                const deletedSeller = await Seller.findByIdAndDelete(sellerID);
                if(deletedSeller){
                    const html = `
                    <div style="border:1px solid #000000; margin:10px; padding:10px; text-align:center;">
                    <h2>Pet Planet</h2>
                    <hr/>
                    <h4 style="color: #ff0000;">Your Seller account got Rejected</h4>
                    <p>You can register again.</p>
                    </div>
                    `;
                    SendMail(process.env.EMAIL, deletedSeller.email, "Your Account is Rejectected", html)
                    .then((value)=>{
                        
                    })
                    .catch((error)=>{
                        console.error('Error sending mail for seller deletion: ', error);
                    });
                    return res.json({message: deletedSeller.fullName + ' is deleted'});
                }
                return res.status(404).json({message: "Seller not found to delete"});
            } catch (error){
                console.error('Error while deleting new seller (updateApprovalRegisteredSeller):', error);
                return res.status(500).json({message: 'Internal server error'});
            }
        }
    } catch (error) {
        console.error('Error in updateApprovalRegisteredSeller:', error);
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


module.exports = {getNewRegisteredSeller, getSellerProfileForAdmin, updateApprovalRegisteredSeller}