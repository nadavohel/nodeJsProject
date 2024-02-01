const { statusAndError } = require("../../../log");
const { Card } = require("../models/cards.model");

module.exports = app => {
    // get card by id
    app.get('/cards/:id', async (req, res) => {
        // find this specific card
        const card = await Card.findOne({ _id: req.params.id });

        // if card is not found
        if (!card) {
            statusAndError(403, "card not found");
            return res.status(403).send("card not found");
        }

        // send the card
        res.send(card);
    });
}