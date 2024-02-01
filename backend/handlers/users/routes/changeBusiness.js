const { getTokenParams } = require("../../../config");
const { guard } = require("../../../guards");
const { statusAndError } = require("../../../log");
const { User } = require("../models/user.model");

module.exports = app => {
    // change business status
    app.patch('/users/:id', guard, async (req, res) => {
        // get the connected user id
        const { user_id } = getTokenParams(req, res);

        // If the user is not the logged user
        if (user_id !== req.params.id) {
            statusAndError(401, "user not authorized");
            return res.status(401).send('User not authorized');
        }

        // find the user on database
        const user = await User.findById(req.params.id).select("-startDate -connectAttempts");

        // change isBusiness
        user.isBusiness = !user.isBusiness;

        // save updated user
        await user.save();

        // send updated user
        res.send(user);
    });
}