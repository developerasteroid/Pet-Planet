const express = require('express');
const { getProducts, getProductInfo, addItemToCart, removeItemFromCart, getCartItems, orderProduct } = require('../controllers/userController');
const authUserMiddleWare = require('../middlewares/authUserMiddleWare');
const router = express();


router.get('/authenticate', authUserMiddleWare, (req, res) => res.send({success: true}));


router.get('/get/products', getProducts);
router.get('/get/products/category/:category', getProducts);
router.get('/product/:id', getProductInfo);
router.post('/cart/item/add', authUserMiddleWare, addItemToCart);
router.post('/cart/item/remove', authUserMiddleWare, removeItemFromCart);
router.get('/cart', authUserMiddleWare, getCartItems);
router.post('/order/item', authUserMiddleWare, orderProduct);


module.exports = router;
