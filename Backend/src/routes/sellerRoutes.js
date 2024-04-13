const express = require('express');
const authSellerMiddleWare = require('../middlewares/authSellerMiddleWare');
const { addPet, uploadProductImage, getProducts, getProductInfo } = require('../controllers/sellerController');
const router = express();

router.get('/authenticate', authSellerMiddleWare, (req, res) => res.send({success: true}));



router.post('/add/product/pet', authSellerMiddleWare, uploadProductImage.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'certificatePhoto', maxCount: 1 },
    { name: 'fatherPhoto', maxCount: 1 },
    { name: 'motherPhoto', maxCount: 1 },
]), addPet);


module.exports = router;