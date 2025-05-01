// backend/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Реєстрація нового користувача
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password, phone } = req.body; // Отримуємо phone з запиту

  try {
      // Перевірка, чи існує користувач з таким email або username
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
          return res.status(400).json({ msg: 'User with this email or username already exists' });
      }

      const newUser = new User({ username, email, password, phone }); // Створюємо нового користувача з телефоном
      await newUser.save();

      // Створення та відправка JWT токена після успішної реєстрації
      const payload = { user: { id: newUser.id } };
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
          if (err) throw err;
          res.status(201).json({ token, msg: 'Registration successful' });
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
  }
};

// Вхід користувача
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Перевірка, чи існує користувач з таким email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Порівняння паролів
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Створення та відправка JWT токена після успішного входу
    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, msg: 'Login successful' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Отримання даних користувача за токеном (для перевірки аутентифікації)
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Виключаємо пароль з відповіді
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};