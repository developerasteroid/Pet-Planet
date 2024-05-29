const { BASE_URL, LOGIN_PAGE_ADDRESS } = require('../constants');
const Seller = require('./../models/sellerModel');
const Product = require('./../models/productModel');
const CartItem = require('./../models/cartItemModel');
const Order = require('./../models/orderModel');
const path = require('path');
const { SendMail } = require('./authController');
const fs = require('fs').promises;
const mongoose = require('mongoose');



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
                    <p><a href="${LOGIN_PAGE_ADDRESS}">Login</a></p>
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


const getApprovedSeller = async(req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        let sellers = await Seller.find({isApproved:true});

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
                    isBlocked:seller.isBlocked,
                    bankAccountNumber:seller.bankAccountNumber,
                    profileImageUrl:`${BASE_URL}/api/admin/seller/profile/image/${token}/${seller.profileImageUrl}`
                })
            })
        }
        
        res.json(data);
    } catch (error) {
        console.error('Error in getApprovedSeller:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

const blockSeller = async(req, res) => {
    try {
        const { sellerId } = req.body;
        if(!sellerId){
            return res.status(400).json({message:'seller id is missing'});
        }
        if(!mongoose.Types.ObjectId.isValid(sellerId)){
            return res.status(400).json({ message: 'Invalid seller Id' });
        }

        const seller = await Seller.findByIdAndUpdate(sellerId, {isBlocked: true});
        if(!seller){
            return res.status(404).json({ message: 'Seller not found'});
        }

        const sellerProducts = await Product.find({seller: sellerId});

        const productsId = sellerProducts.map(item=> item._id);
        
        await CartItem.deleteMany({product: {$in: productsId}});

        const orders = await Order.find({seller: sellerId, status: {$in: ['pending', 'processing', 'out for delivery']}});

        await Order.updateMany({seller: sellerId, status: {$in: ['pending', 'processing', 'out for delivery']}}, {status: 'cancelled'});

        for(let order of orders){
                await Product.findByIdAndUpdate(order.product, {$inc:{quantity: order.quantity}});

                const html = `
                <div style="border:1px solid #000000; margin:10px; padding:10px; text-align:center;">
                <h2>Pet Planet</h2>
                <hr/>
                <h4>Your order (${order.productTitle}) has been cancelled because the seller of this product was blocked by the platform.</h4>
                <p>Order id: ${order._id}</p>
                </div>
                `;
                SendMail(process.env.EMAIL, order.customerEmail, `order cancelled - ${order._id}`, html)
                .then((value)=>{
                    
                })
                .catch((error)=>{
                    console.error('Error sending mail for seller blocked: ', error);
                });
            
        }

        const html = `
        <div style="border:1px solid #000000; margin:10px; padding:10px; text-align:center;">
        <h2>Pet Planet</h2>
        <hr/>
        <h4>Your Seller account have been blocked by Admin</h4>
        <p>Contact admin to unblock your account</p>
        </div>
        `;
        SendMail(process.env.EMAIL, seller.email, "Your Account got blocked", html)
        .then((value)=>{
            
        })
        .catch((error)=>{
            console.error('Error sending mail for seller blocked: ', error);
        });


        res.json({ message: 'Seller blocked Successfully'});

    } catch (error) {
        console.error('Error in blockSeller:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}


const unblockSeller = async(req, res) => {
    try {
        const { sellerId } = req.body;
        if(!sellerId){
            return res.status(400).json({message:'seller id is missing'});
        }
        if(!mongoose.Types.ObjectId.isValid(sellerId)){
            return res.status(400).json({ message: 'Invalid seller Id' });
        }

        const seller = await Seller.findByIdAndUpdate(sellerId, {isBlocked: false});
        if(!seller){
            return res.status(404).json({ message: 'Seller not found'});
        }

        const html = `
        <div style="border:1px solid #000000; margin:10px; padding:10px; text-align:center;">
        <h2>Pet Planet</h2>
        <hr/>
        <h4>Your Seller account have been unblocked</h4>
        <p>For further support contact admin</p>
        </div>
        `;
        SendMail(process.env.EMAIL, seller.email, "Your Account got unblocked", html)
        .then((value)=>{
            
        })
        .catch((error)=>{
            console.error('Error sending mail for seller unblocked: ', error);
        });


        res.json({ message: 'Seller unblocked Successfully'});

    } catch (error) {
        console.error('Error in unblockSeller:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}


module.exports = {getNewRegisteredSeller, getSellerProfileForAdmin, updateApprovalRegisteredSeller, getApprovedSeller, blockSeller, unblockSeller}