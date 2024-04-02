const express = require('express');
const router = express();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const {SellerSendOtp, RegisterSeller, LoginSeller, AdminLogin} = require('./../controllers/authController');




const sellerProfileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/seller/profiles/');
    },
    filename: function (req, file, cb) {
        cb(null, 'IMG-' + uuidv4().replace(/-/g, '') + path.extname(file.originalname));
    }
});

const uploadSellerProfile = multer({ storage: sellerProfileStorage});


router.post('/seller/sendotp', SellerSendOtp);
router.post('/seller/register', uploadSellerProfile.single('photo'), RegisterSeller);
router.post('/seller/login', LoginSeller);

router.post('/admin/login', AdminLogin);

module.exports = router;