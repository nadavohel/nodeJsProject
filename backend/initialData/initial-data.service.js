const { Card } = require('../handlers/cards/models/cards.model');
const { User } = require('../handlers/users/models/user.model');
const { users, cards } = require('./initialData.json');
const bcrypt = require('bcrypt');

const initialDataStart = async () => {
    // chack if there are users
    const userAmount = await User.find().countDocuments();

    // if is not found users, then
    if (!userAmount) {
        const userIds = [];

        // create new users from initial data
        for (const newUser of users) {
            // get user password
            const { password } = newUser;

            // create a new User with bcrypt password
            const user = new User({
                ...newUser,
                password: await bcrypt.hash(password, 10),
            });

            // save the user on database
            const obj = await user.save();

            // push id of business user to countArray
            if (obj.isBusiness) {
                userIds.push(obj._id);
            }
        }

        // create new cards from initial data
        for (const newCard of cards) {
            // get random bizNumber
            const bizNum = Math.floor(Math.random() * 9999999);
            newCard.bizNumber = bizNum;

            // get random business user id
            const i = Math.floor(Math.random() * userIds.length);
            const user_id = userIds[i];

            // create a new Cards
            const card = new Card({ ...newCard, user_id });

            // save created card to database
            await card.save();
        }
    }
}

initialDataStart();