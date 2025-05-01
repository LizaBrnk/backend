// backend/models/Donation.js
const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address'],
    },
    amount: {
        type: Number,
        required: true,
        min: 1,
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true,
    },
    cardNumber: {
        type: String,
        trim: true,
    },
    expiryDate: {
        type: String,
        trim: true,
    },
    donationDate: {
        type: Date,
        default: Date.now,
    },
    cryptoType: { // New field for cryptocurrency type
        type: String,
        trim: true,
    },
});

module.exports = mongoose.model('Donation', DonationSchema);