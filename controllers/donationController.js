const Donation = require('../models/Donation');

exports.processDonation = async (req, res) => {
    try {
        //console.log('Received request at /api/donate/process:', req.body);
        const { fullName, email, amount, paymentMethod, cardNumber, expiryDate, cvv, cryptoType } = req.body;

        const newDonation = new Donation({
            fullName,
            email,
            amount: parseFloat(amount),
            paymentMethod,
            cardNumber: paymentMethod === 'creditCard' ? cardNumber : undefined,
            expiryDate: paymentMethod === 'creditCard' ? expiryDate : undefined,
            donationDate: new Date(),
            cryptoType: paymentMethod === 'crypto' ? cryptoType : undefined,
        });

        await newDonation.save();
        res.status(201).json({ message: `Donation from ${fullName} for $${amount} saved successfully!` });
    } catch (error) {
        console.error('Error saving donation:', error);
        res.status(500).json({ message: 'Error saving donation.' });
    }
};