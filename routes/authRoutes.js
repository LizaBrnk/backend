// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { body } = require('express-validator');

// Маршрут для реєстрації нового користувача
router.post(
  '/register',
  [
      body('username', 'Username is required').notEmpty(),
      body('email', 'Please include a valid email').isEmail(),
      body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
      body('phone', 'Please enter a valid phone number').optional(), // Телефон необов'язковий, але можна зробити обов'язковим
  ],
  register
);

// Маршрут для входу користувача
router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').notEmpty(),
  ],
  login
);

module.exports = router;