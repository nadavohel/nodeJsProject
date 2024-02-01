const { getTokenParams } = require("../../../config");
const { guard } = require("../../../guards");
const { statusAndError } = require("../../../log");
const { Card } = require("../models/cards.model");

module.exports = app => {
    // get all user cards
    app.get('/cards/my-cards', guard, async (req, res) => {
        // get the connected user id
        const { user_id } = getTokenParams(req, res);

        // if there is no user
        if (!user_id) {
            statusAndError(401, "user not connected");
            return res.status(401).send("user not connected");
        }

        // get all the cards by user id
        const myCards = await Card.find({ user_id });

        // if there is no cards by user id
        if (!myCards || myCards.length === 0) {
            statusAndError(404, "can't find any cards for the user");
            return res.status(404).send("can't find any cards for the user");
        }

        // send user cards
        res.send(myCards);
    });
}