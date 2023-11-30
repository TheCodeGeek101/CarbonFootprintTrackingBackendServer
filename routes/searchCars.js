const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

router.post('/', carController.searchCars);
module.exports = router;