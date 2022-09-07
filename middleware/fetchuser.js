const jwt = require('jsonwebtoken')

const fetchuser = (req, res, next) => {

    // Get the user from the jwt token and add id to req object

    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: 'Please Authenticate a Valid Token' })
    }
    try {
        const str = jwt.verify(token, "shhh");
        req.user = str.user;
        next()
    } catch (error) {
        res.status(401).send({ error: 'Please Authenticate a Valid Token' })
    }
}

module.exports = fetchuser