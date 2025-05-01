// backend/models/AdoptionApplication.js
const mongoose = require('mongoose');

const AdoptionApplicationSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    animalName: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
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
    country: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    comment: {
        type: String,
        trim: true,
    },
    applicationDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('AdoptionApplication', AdoptionApplicationSchema);