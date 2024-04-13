const express = require('express');
const { getProducts, getProductInfo } = require('../controllers/userController');
const router = express();




router.get('/get/products', getProducts);
router.get('/get/products/category/:category', getProducts);
router.get('/product/:id', getProductInfo);


module.exports = router;
