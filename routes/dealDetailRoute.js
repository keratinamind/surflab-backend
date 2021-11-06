const express  = require('express');
const dealDetailController = require('../controllers/dealDetailController')
const { uploadAvatar } = require('../middlewares.js/uploadAvatar');
const router = express.Router();


router.post('/', uploadAvatar.single("upload-avatar") ,  dealDetailController.createDealDetail);
router.get('/:id', dealDetailController.getDealDetail);
router.get('/', dealDetailController.getAllDeals);
router.get('/filtercategory/:id', dealDetailController. getDealByCategory)
router.put('/:id',uploadAvatar.single("upload-avatar") , dealDetailController.updateDealDetail );
router.delete('/:id', dealDetailController.deleteDealDetail );

module.exports = router;