const { getTokenParams } = require("../../../config");
const { guard, isCardMine } = require("../../../guards");
const { statusAndError } = require("../../../log");
const { Card } = require("../models/cards.model");

module.exports = app => {
    // delete cards
    app.delete("/cards/:id", guard, async (req, res) => {
        // get the connected user id
        const { isAdmin } = getTokenParams(req, res);

        // check if the card belong to this user
        if (!isAdmin) {
            if (!await isCardMine(req.params.id, req, res)) {
                statusAndError(401, "user not authorized");
                return res.status(401).send("user not authorized");
            }
        }

        // find this specific card to send back after delete
        const deletedCard = await Card.findOne({ _id: req.params.id });

        // if card is not found
        if (!deletedCard) {
            statusAndError(403, "card not found");
            return res.status(403).send("card not found");
        }

        // find and delete card. If the card is not found, send error
        try {
            await Card.findByIdAndDelete(req.params.id);
        } catch (err) {
            statusAndError(403, "card not found");
            return res.status(403).send("card not found");
        }

        // send back the deleted card
        res.send(deletedCard);
    });
}