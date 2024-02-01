const mongoose = require('mongoose');
const Image = require('./image.model');
const Address = require('./address.model');

const schema = new mongoose.Schema({
    title: String,
    subtitle: String,
    description: String,
    phone: {
        type: String,
        default: "050-0000000",
    },
    email: String,
    web: String,
    image: Image,
    address: Address,
    bizNumber: String,
    likes: { type: [String], default: []},
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

exports.Card = mongoose.model('cards', schema);