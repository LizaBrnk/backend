// backend/routes/adoptionRoutes.js
const express = require('express');
const router = express.Router();
const adoptionController = require('../controllers/adoptionController');

// Маршрут для подачі заявки на всиновлення
router.post('/apply', adoptionController.submitApplication);

module.exports = router;