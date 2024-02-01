const { getTokenParams } = require("../../../config");
const { guard } = require("../../../guards");
const { statusAndError } = require("../../../log");
const { User } = require("../models/user.model");

module.exports = app => {
    // get user by id
    app.get('/users/:id', guard, async (req, res) => {
        // get the connected user id, and admin status
        const { user_id, isAdmin } = getTokenParams(req, res);

        // only same user or admin can access
        if (user_id !== req.params.id && !isAdmin) {
            statusAndError(401, "user not authorized");
            return res.status(401).send('user not authorized');
        }

        // find this specific user
        const user = await User.findOne({ _id: req.params.id }).select("-startDate -connectAttempts");

        // if user is not found
        if (!user) {
            statusAndError(403, "user not found");
            return res.status(403).send("user not found");
        }

        // send the user
        res.send(user);
    });
}