const { guard, businessGuard } = require("../../../guards");
const { Card } = require("../models/cards.model");
const { CardValid } = require("./../models/cardsJoi");
const { getTokenParams } = require("../../../config");
const { statusAndError } = require("../../../log");

module.exports = app => {
    // created new cards
    app.post('/cards', guard, businessGuard, async (req, res) => {
        // get card information
        const newCard = req.body;

        // check if the form is valid
        const validate = CardValid.validate(req.body, { abortEarly: false });
        
        // if validation fails
        if (validate.error) {
            const errors = validate.error.details.map(err => err.message);
            statusAndError(403, errors);
            return res.status(403).send(errors);
        }

        // get the connected user id
        const { user_id } = getTokenParams(req, res);

        // if there is no user
        if (!user_id) {
            statusAndError(401, "the user not connected");
            return res.status(401).send("the user not connected");
        }

        // get random bizNumber
        let stop = false;
        let a = 1;
        while (!stop) {
            const bizNum = Math.floor(Math.random() * 9999999);
            const cardSameBizNum = await Card.findOne({bizNumber: bizNum});
            console.log(a);
            a = a + 1;
            if (!cardSameBizNum) {
                stop = true;
                newCard.bizNumber = bizNum;
            }
        }

        // create a new Cards
        const card = new Card({ ...newCard, user_id });

        // save created card to database and send card back
        res.send(await card.save());
    });
}