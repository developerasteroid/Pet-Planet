const express = require('express');
const { productImage } = require('../controllers/imageController');
const router = express();


router.get('/product/:filename', productImage);





module.exports = router;