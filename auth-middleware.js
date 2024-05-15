const jwt = require("jsonwebtoken");

process.env.JWT_SECRET = "SuperSecretKey";

const  generateToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: '2h'
    })
}

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).send('Unauthorized');
    }

    const token = req.headers.authorization.split(' ')[1]; // Authorization: Bearer TOKEN

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send('Unauthorized');
        req.user = user;
        next();
    })

}

module.exports = { generateToken, verifyToken }