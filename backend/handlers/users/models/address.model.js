const { number } = require('joi');
const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    state: String,
    country: String,
    city: String,
    street: String,
    houseNumber: Number,
    zip: {
        type: Number,
        default: "0",
    },
});