const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    first: String,
    middle: String,
    last: String,
});