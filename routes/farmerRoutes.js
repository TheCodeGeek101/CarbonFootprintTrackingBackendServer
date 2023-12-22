// routes/farmerRoutes.js
const express = require('express');
const farmerController = require('./farmerController');

const router = express.Router();

router.post('/register', farmerController.registerFarmer);
router.get('/info/:address', farmerController.getFarmerInfo);
router.post('/practice', farmerController.addSustainablePractice);
router.get('/latest-practice/:address', farmerController.getLatestSustainablePractice);
router.get('/total-practices/:address', farmerController.getTotalSustainablePractices);
router.get('/all-practices/:address', farmerController.getAllSustainablePractices);
router.get('/average-reduction/:address', farmerController.getAverageCarbonReduction);
router.get('/is-registered/:address', farmerController.isFarmerRegistered);
router.post('/transfer-ownership', farmerController.transferOwnership);
router.post('/withdraw-funds', farmerController.withdrawFunds);

module.exports = router;
