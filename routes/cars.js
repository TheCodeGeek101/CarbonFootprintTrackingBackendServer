const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

router.get('/', carController.getCars);

module.exports = router;