const { guard, adminGuard } = require("../../../guards");
const { statusAndError } = require("../../../log");
const { Card } = require("../models/cards.model");
const { BizNumberValid } = require("../models/cardsJoi");

module.exports = app => {
    // change bizNumber
    app.patch('/cards/bizNum/:id', guard, adminGuard, async (req, res) => {
        // get card new bizNumber
        const { bizNumber } = req.body;

        // if some information is missing
        if (!bizNumber) {
            statusAndError(403, "Inputs can't be empty");
            return res.status(403).send("Inputs can't be empty");
        }

        // find the user on database
        const card = await Card.findById(req.params.id);

        // check if the form is valid
        const validate = BizNumberValid.validate(req.body);

        // if validation fails
        if (validate.error) {
            const errors = validate.error.details.map(err => err.message);
            statusAndError(403, errors);
            return res.status(403).send(errors);
        }

        // if card not found
        if (!card) {
            statusAndError(403, "card not found");
            return res.status(403).send("card not found");
        }

        // find if there is a card with same bizNumber
        const cardSameBizNum = await Card.findOne({ bizNumber });

        // check if bizNumber is already taken
        if (cardSameBizNum) {
            statusAndError(401, "bizNumber is already taken");
            return res.status(401).send("bizNumber is already taken");
        }

        // change card bizNumber
        card.bizNumber = bizNumber;

        // save updated card
        await card.save();

        // send updated card
        res.send(card);
    });
}