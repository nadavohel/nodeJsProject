const { statusAndError } = require("../../../log");
const { Card } = require("../models/cards.model");

module.exports = app => {
    // get all cards
    app.get('/cards', async (req, res) => {
        // find all cards
        const cards = await Card.find();

        // if there are no cards
        if (!cards || cards.length === 0) {
            statusAndError(404, "can't find any cards");
            return res.status(404).send("can't find any cards");
        }

        //  send all cards
        res.send(cards);
    });
}