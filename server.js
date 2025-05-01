const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const adoptionRoutes = require('./routes/adoptionRoutes');
const donationRoutes = require('./routes/donationRoutes');

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/happy-tails-back';

mongoose.connect(mongoURI)
  .then(() => console.log('Підключено до MongoDB'))
  .catch((err) => console.error('Помилка підключення до MongoDB:', err));

// Використовуємо маршрути аутентифікації з префіксом /api/auth
app.use('/api/auth', authRoutes);
app.use('/api/donate', donationRoutes);
app.use('/api/adopt', adoptionRoutes);

app.get('/api', (req, res) => {
  res.json({ message: 'Привіт від бекенду!' });
});

app.listen(port, () => {
  console.log(`Сервер запущено на http://localhost:${port}`);
});