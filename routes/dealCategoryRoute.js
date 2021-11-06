const express  = require('express');
const dealCategoryController = require('../controllers/dealCategoryController');
const { route } = require('./dealDetailRoute');

const router = express.Router();


router.post('/',  dealCategoryController.createCategory);

router.get('/', dealCategoryController.getAllCategory);

router.get('/:id', dealCategoryController.getCategory);

router.put('/:id', dealCategoryController.updateCategory );
router.delete('/:id', dealCategoryController.deleteCategory );

module.exports = router;