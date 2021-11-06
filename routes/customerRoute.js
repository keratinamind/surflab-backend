const express  = require('express');
const customerController = require('../controllers/customerController');
const { uploadAvatar } = require('../middlewares.js/uploadAvatar');
const passport = require("passport");

const router = express.Router();


router.post('/register',  customerController.registerCustomer);
router.post('/login', customerController.loginCustomer);
router.get('/' ,passport.authenticate("jwt-customer", {session: false}), customerController.getCustomerById)
router.put('/update',passport.authenticate("jwt-customer", {session: false}), uploadAvatar.single("upload-avatar") , customerController.updateCustomer );
router.delete('/:id', );

module.exports = router;