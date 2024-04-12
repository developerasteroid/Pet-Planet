const express = require('express');
const authSellerMiddleWare = require('../middlewares/authSellerMiddleWare');
const { addPet } = require('../controllers/sellerController');
const router = express();

router.get('/authenticate', authSellerMiddleWare, (req, res) => res.send({success: true}));
router.post('/add/product/pet', authSellerMiddleWare, addPet);


module.exports = router;