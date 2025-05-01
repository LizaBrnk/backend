const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

// Отримати дані авторизованого користувача
router.get('/', authMiddleware, userController.getUser);

module.exports = router;