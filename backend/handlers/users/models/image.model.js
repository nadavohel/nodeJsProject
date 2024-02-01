const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    url: {
        type: String,
        default: "",
    },
    alt: {
        type: String,
        default: "",
    },
});