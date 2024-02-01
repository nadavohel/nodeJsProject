const { User } = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { statusAndError } = require('../../../log');

module.exports = app => {
    // user logged in to application
    app.post('/users/login', async (req, res) => {
        // get user information
        const { email, password } = req.body;

        // find same email in database
        const user = await User.findOne({ email }); 

        // check if user allowed to login and if not, how much time to await
        let startDate = user.startDate;
        let nowDate = new Date;
        let timeDiff = Math.abs(nowDate - startDate) / 3600000;

        if ((timeDiff <= 24) && (user.connectAttempts === 3)) {
            return res.status(401)
                .send(`user can log in only more ${((24 - timeDiff) - ((24 - timeDiff) % 1))} hours and ${((((24 - timeDiff) % 1) * 60) - ((((24 - timeDiff) % 1) * 60) % 1))} minutes`);
        } else if (timeDiff <= 0) {
            user.connectAttempts = 0;
            await user.save(user);
        }

        // if some information is missing
        if (!email || !password) {
            statusAndError(403, "Inputs can't be empty");
            return res.status(403).send("Inputs can't be empty");
        }

        // if email not found
        if (!user) {
            statusAndError(403, "email or password is incorrect");
            return res.status(403).send("email or password is incorrect");
        }

        // find same password in database by user we get before
        const passwordMatch = await bcrypt.compare(password, user.password);

        // if password not found
        if (!passwordMatch) {
            user.connectAttempts = user.connectAttempts + 1;
            user.startDate = new Date;
            await user.save(user)

            statusAndError(403, "email or password is incorrect");
            return res.status(403).send("email or password is incorrect");
        }

        // change connectAttempts to 0 when successful login
        user.connectAttempts = 0;
        await user.save(user)

        // create toket by jsonwebtoken
        const token = jwt.sign(
            {
                user_id: user._id,
                isAdmin: user.isAdmin,
                isBusiness: user.isBusiness,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // send token
        res.send(token);
    });
}