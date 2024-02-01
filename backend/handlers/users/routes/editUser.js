const bcrypt = require('bcrypt'); 
const { getTokenParams } = require("../../../config");
const { guard } = require("../../../guards");
const { User } = require("../models/user.model");
const { UserValid } = require("../models/userJoy");
const { statusAndError } = require('../../../log');

module.exports = app => {
    // update user
    app.put('/users/:id', guard, async (req, res) => {
        // get the connected user id
        const { user_id } = getTokenParams(req, res);

        // If the user is not the logged user
        if (user_id !== req.params.id) {
            statusAndError(401, "user not authorized");
            return res.status(401).send('user not authorized');
        }

        // get user information
        const userInfo = req.body;

        // check validation
        const validate = UserValid.validate(req.body, { abortEarly: false });

        // if validation fails
        if (validate.error) {
            const errors = validate.error.details.map(err => err.message);
            statusAndErrorr(403, errors);
            return res.status(403).send(errors);
        }

        // get user password
        const { password } = userInfo;

        // find the user and update with the bcrypt password
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
            ...userInfo,
            password: await bcrypt.hash(password, 10),
            }
        );

        // if user is not found send error
        if (!user) {
            statusAndError(403, "user not found");
            return res.status(403).send("user not found");
        }

        // find this specific user after update
        const updateUser = await User.findOne({ _id: req.params.id }).select("-startDate -connectAttempts");

        // if user is not found
        if (!updateUser) {
            statusAndError(403, "user not found");
            return res.status(403).send("user not found");
        }

        // send back the user after updating
        res.send(updateUser);
    });
}