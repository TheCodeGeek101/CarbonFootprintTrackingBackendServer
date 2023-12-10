const express = require('express');
const router = express.Router();
const carBookingController = require('../controllers/carBookingController');

router.post('/', carBookingController.getReservations);

module.exports = router;