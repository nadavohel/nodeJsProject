const { guard, isCardMine } = require("../../../guards");
const { statusAndError } = require("../../../log");
const { Card } = require("../models/cards.model");
const { CardValid } = require("../models/cardsJoi");

module.exports = app => {
    // update card
    app.put('/cards/:id', guard, async (req, res) => {
        // check if the card belong to this user
        if (!await isCardMine(req.params.id, req, res)) {
            statusAndError(401, "User not authorized");
            return res.status(401).send("User not authorized");
        }

        // get card information
        const cardInfo = req.body;

        // check validation
        const validate = CardValid.validate(req.body, { abortEarly: false });

        // if validation fails
        if (validate.error) {
            const errors = validate.error.details.map(err => err.message);
            statusAndError(403, errors);
            return res.status(403).send(errors);
        }

        // find card on database and update card information
        const card = await Card.findByIdAndUpdate(req.params.id, cardInfo);

        // if card is not found send error
        if (!card) {
            statusAndError(403, "card not found");
            return res.status(403).send("card not found");
        }

        // find this specific card after updating
        const updateCard = await Card.findOne({ _id: req.params.id });

        // if card is not found
        if (!updateCard) {
            statusAndError(403, "card not found");
            return res.status(403).send("card not found");
        }

        // send back the card after updating
        res.send(updateCard);
    });
}