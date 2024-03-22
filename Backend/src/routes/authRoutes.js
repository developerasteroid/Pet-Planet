const express = require('express');
const router = express();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');



const sellerProfileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/seller/profiles/');
    },
    filename: function (req, file, cb) {
        cb(null, 'IMG-' + uuidv4().replace(/-/g, '') + path.extname(file.originalname));
    }
});

const uploadSellerProfile = multer({ storage: sellerProfileStorage});

const {SellerSendOtp, RegisterSeller} = require('./../controllers/authController');

router.post('/seller/sendotp', SellerSendOtp);

router.post('/seller/register', uploadSellerProfile.single('photo'), RegisterSeller);

module.exports = router;