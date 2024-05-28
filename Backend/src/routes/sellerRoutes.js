const express = require('express');
const authSellerMiddleWare = require('../middlewares/authSellerMiddleWare');
const { addPet, uploadProductImage, addFood, uploadErrorHandler, getMyProducts, updateProduct, deleteProduct, addAccessory, getOrderRequest, acceptOrderRequest, cancelOrderRequest, getActiveOrder, sendOtpForOrderDeliver, upgradeOrder } = require('../controllers/sellerController');
const router = express();

router.get('/authenticate', authSellerMiddleWare, (req, res) => res.send({success: true}));



router.post('/add/product/pet', authSellerMiddleWare, uploadProductImage.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'certificatePhoto', maxCount: 1 },
    { name: 'fatherPhoto', maxCount: 1 },
    { name: 'motherPhoto', maxCount: 1 },
]), addPet);

router.post('/add/product/food', authSellerMiddleWare, uploadProductImage.single('photo'), uploadErrorHandler, addFood);
router.post('/add/product/accessory', authSellerMiddleWare, uploadProductImage.single('photo'), uploadErrorHandler, addAccessory);
router.get('/get/my/products', authSellerMiddleWare, getMyProducts);
router.post('/update/product', authSellerMiddleWare, updateProduct);
router.post('/delete/product', authSellerMiddleWare, deleteProduct);

router.get('/get/order/request', authSellerMiddleWare, getOrderRequest);
router.post('/order/accept', authSellerMiddleWare, acceptOrderRequest);
router.post('/order/cancel', authSellerMiddleWare, cancelOrderRequest);

router.get('/get/order/active', authSellerMiddleWare, getActiveOrder);

router.post('/order/send/otp', authSellerMiddleWare, sendOtpForOrderDeliver);
router.post('/order/upgrade', authSellerMiddleWare, upgradeOrder);





module.exports = router;