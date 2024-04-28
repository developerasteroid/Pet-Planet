const express = require('express');
const router = express();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const {SellerSendOtp, RegisterSeller, LoginSeller, AdminLogin, UserSendOtp, RegisterUser, LoginUser} = require('./../controllers/authController');



//seller storage
const sellerProfileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/seller/profiles/');
    },
    filename: function (req, file, cb) {
        cb(null, 'IMG-' + uuidv4().replace(/-/g, '') + path.extname(file.originalname));
    }
});
const uploadSellerProfile = multer({ storage: sellerProfileStorage});


//user storage
const userProfileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/user/profiles/');
    },
    filename: function (req, file, cb) {
        cb(null, 'IMG-' + uuidv4().replace(/-/g, '') + path.extname(file.originalname));
    }
});
const uploadUserProfile = multer({ storage: userProfileStorage});


router.post('/seller/sendotp', SellerSendOtp);
router.post('/seller/register', uploadSellerProfile.single('photo'), RegisterSeller);
router.post('/seller/login', LoginSeller);

router.post('/admin/login', AdminLogin);

router.post('/user/sendotp', UserSendOtp);
router.post('/user/register', uploadUserProfile.single('photo'), RegisterUser);
router.post('/user/login', LoginUser);



module.exports = router;