const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

router.get('/summary', weatherController.getWeatherSummary);
router.post('/threshold-check', weatherController.checkThreshold);
module.exports = router;
