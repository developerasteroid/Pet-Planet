const express = require('express');
const authSellerMiddleWare = require('../middlewares/authSellerMiddleWare');
const router = express();

router.get('/authenticate', authSellerMiddleWare, (req, res) => res.send({success: true}));


module.exports = router;