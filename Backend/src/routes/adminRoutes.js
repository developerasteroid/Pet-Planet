const express = require('express');
const router = express();
const { getNewRegisteredSeller, getSellerProfileForAdmin, updateApprovalRegisteredSeller, getApprovedSeller, blockSeller, unblockSeller, getSellerSoldHistory } = require('../controllers/adminController');
const authAdminMiddleWare = require('../middlewares/authAdminMiddleWare');
const uriAuthAdminMiddleWare = require('../middlewares/uriAuthAdminMiddleWare');

router.get('/authenticate', authAdminMiddleWare, (req, res) => res.send({success: true}));
router.get('/new/registered/sellers', authAdminMiddleWare, getNewRegisteredSeller);
router.post('/new/registered/seller/update', authAdminMiddleWare, updateApprovalRegisteredSeller);
router.get('/seller/profile/image/:token/:filename', uriAuthAdminMiddleWare, getSellerProfileForAdmin);

router.get('/get/approve/sellers', authAdminMiddleWare, getApprovedSeller);
router.post('/seller/block', authAdminMiddleWare, blockSeller);
router.post('/seller/unblock', authAdminMiddleWare, unblockSeller);

router.get('/seller/sold/history', authAdminMiddleWare, getSellerSoldHistory)


module.exports = router;