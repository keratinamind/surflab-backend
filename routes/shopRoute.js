const express  = require('express');
const shopController = require('../controllers/shopController')

const router = express.Router();


router.post('/',  shopController.createShop);
router.get('/', shopController.getShop);
router.put('/:id', shopController.updateShop );
router.delete('/:id', );

module.exports = router;