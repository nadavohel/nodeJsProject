const mongoose = require('mongoose');
const Name = require('./name.model');
const Image = require('./image.model');
const Address = require('./address.model');
const moment = require('moment');

const schema = new mongoose.Schema({
    name: Name,
    phone: { 
        type: String,
        default: "050-0000000",
    },
    email: {
        type: String,
        unique: true,
    },
    password: String,
    image: Image,
    address: Address,
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isBusiness: {
        type: Boolean,
        default: false,
    },
    connectAttempts: {
        type: Number,
        default: 0,
    },
    startDate: {
        type: Date,
        default: new Date,
    },
    createdAt: { 
        type: Date, 
        default: Date.now,
    },
});

exports.User = mongoose.model('users', schema);