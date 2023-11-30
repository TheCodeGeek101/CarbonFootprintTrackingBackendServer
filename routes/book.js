const express = require('express');
const router = express.Router();
const carBookingController = require('../controllers/carBookingController');

router.post('/', carBookingController.bookCar);

module.exports = router;