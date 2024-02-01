const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    url: String,
    alt: String,
});