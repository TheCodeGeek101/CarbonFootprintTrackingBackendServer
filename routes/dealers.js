const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

router.get('/', carController.getDealers);

module.exports = router;