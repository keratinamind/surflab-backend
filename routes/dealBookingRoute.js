const express  = require('express');
const dealBookingController = require('../controllers/dealBookingController')

const router = express.Router();


router.post('/',  dealBookingController.createBooking);
router.get('/:id', dealBookingController.getBookingBydealId);
router.get('/user', dealBookingController.getBookingByuserId);
router.put('/:id', dealBookingController.updateBooking );
router.delete('/:id', dealBookingController.deleteBooking );

module.exports = router;