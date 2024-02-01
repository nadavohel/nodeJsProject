const { guard } = require("../../../guards");
const { Card } = require("../models/cards.model");
const { getTokenParams } = require("../../../config");
const { statusAndError } = require("../../../log");

module.exports = app => {
    // like this card by user
    app.patch('/cards/:id', guard, async (req, res) => {
        // get the connected user id
        const { user_id } = getTokenParams(req, res);

        // if there is no user
        if (!user_id) {
            statusAndError(401, "the user not connected");
            return res.status(401).send("the user not connected");
        }

        // find the card on database
        const card = await Card.findOne({ _id: req.params.id });

        // if there is no card
        if (!card) {
            statusAndError(404, "card not found");
            return res.status(404).send("card not found");
        }

        // push user id to array of card likes
        card.likes.push(user_id);

        // send back the card and save on database
        res.send(await card.save());
    });
}