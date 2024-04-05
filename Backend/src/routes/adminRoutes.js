const express = require('express');
const router = express();
const { getNewRegisteredSeller } = require('../controllers/adminController');
const authAdminMiddleWare = require('../middlewares/authAdminMiddleWare');


router.get('/new/registered/sellers', authAdminMiddleWare, getNewRegisteredSeller);

module.exports = router;