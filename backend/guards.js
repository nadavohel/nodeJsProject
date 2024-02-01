const jwt = require('jsonwebtoken');
const { getTokenParams } = require('./config');
const { Card } = require('./handlers/cards/models/cards.model');
const { statusAndError } = require('./log');

// only if you conection you can pass
exports.guard = (req, res, next) => {
    // check if the token is valid
    jwt.verify(req.headers.authorization, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            statusAndError(401, "user not authorized");
            res.status(401).send('user not authorized');
        } else {
            next();
        }
    });
}

// only if you business user you can pass
exports.businessGuard = (req, res, next) => {
    const { isBusiness } = getTokenParams(req, res);

    if (isBusiness) {
        next();
    } else {
        statusAndError(401, "user not authorized");
        res.status(401).send('user not authorized');
    }
}

// only if you admin user you can pass
exports.adminGuard = (req, res, next) => {
    const { isAdmin } = getTokenParams(req, res);
    
    if (isAdmin) {
        next();
    } else {
        statusAndError(401, "user not authorized");
        res.status(401).send('user not authorized');
    }
}

// only if you admin and business user you can pass
exports.businessOrAdminGuard = (req, res, next) => {
    const { isBusiness, isAdmin } = getTokenParams(req, res);

    if (isBusiness || isAdmin) {
        next();
    } else {
        statusAndError(401, "user not authorized");
        res.status(401).send('user not authorized');
    }
}

// check if the card is yours
exports.isCardMine = async (cardId, req, res) => {
    const { user_id } = getTokenParams(req, res);
    const card = await Card.findOne({ _id: cardId, user_id: user_id });

    return Boolean(card);
}