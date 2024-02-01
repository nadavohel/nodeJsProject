const { guard, adminGuard } = require("../../../guards");
const { statusAndError } = require("../../../log");
const { User } = require('../models/user.model');

module.exports = app => {
    // get all users
    app.get('/users', guard, adminGuard, async (req, res) => {
        // find all users without password
        const users = await User.find().select("-password -startDate -connectAttempts");

        // if there are no users
        if (!users || users.length === 0) {
            statusAndError(404, "can't find any users");
            return res.status(404).send("can't find any users");
        }

        //send all users
        res.send(users);
    });
}