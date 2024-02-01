const jwt = require('jsonwebtoken');

// check user details
exports.getTokenParams = (req, res) => {
    // check if the token exists
    if (!req.headers.authorization) {
        return null;
    }

    // decipher the token by the jwt secret key
    const data = jwt.decode(req.headers.authorization, process.env.JWT_SECRET);

    // if the token is not valid, then return error
    if (!data) {
        return res.status(401).send('User not authorized');
    }

    // if the token is valid, then return the data from the token
    return data;
}

