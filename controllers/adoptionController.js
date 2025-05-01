// backend/controllers/adoptionController.js
const AdoptionApplication = require('../models/AdoptionApplication');

// Обробка заявки на всиновлення
exports.submitApplication = async (req, res) => {
    try {
        const { fullName, animalName, phone, email, country, city, address, comment } = req.body;

        const newApplication = new AdoptionApplication({
            fullName,
            animalName,
            phone,
            email,
            country,
            city,
            address,
            comment,
        });

        await newApplication.save();
        res.status(201).json({ msg: 'Application submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error while submitting application' });
    }
};