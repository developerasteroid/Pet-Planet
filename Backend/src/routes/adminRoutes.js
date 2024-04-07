const express = require('express');
const router = express();
const { getNewRegisteredSeller, getSellerProfileForAdmin } = require('../controllers/adminController');
const authAdminMiddleWare = require('../middlewares/authAdminMiddleWare');
const uriAuthAdminMiddleWare = require('../middlewares/uriAuthAdminMiddleWare');


router.get('/new/registered/sellers', authAdminMiddleWare, getNewRegisteredSeller);
router.get('/seller/profile/image/:token/:filename', uriAuthAdminMiddleWare, getSellerProfileForAdmin);

module.exports = router;