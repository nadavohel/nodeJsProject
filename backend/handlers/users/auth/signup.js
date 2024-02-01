const bcrypt = require('bcrypt'); 
const { User } = require('../models/user.model');
const { UserValid } = require('../models/userJoy');
const { statusAndError } = require('../../../log');

module.exports = app => {
    // user signup to the application
    app.post("/users", async (req, res) => {
        // get user information
        const userInfo = req.body;

        // check validation
        const validate = UserValid.validate(req.body, { abortEarly: false });
        
        // if there are errors
        if (validate.error) {
            const errors = validate.error.details.map(err => err.message);
            statusAndError(403, errors);
            return res.status(403).send(errors);
        }

        // get user password
        const { password } = userInfo;

        // create a new User with bcrypt password
        const user = new User({
            ...userInfo,
            password: await bcrypt.hash(password, 10),
        });

        // send the user and save on database
        res.send(await user.save());
    });
}