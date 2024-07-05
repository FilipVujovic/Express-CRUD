const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.authentication = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).json({
        message: 'Unauthorized user.'
    });

    jwt.verify(token, process.env.SECRETKEY, (err, user) => {
        if (err) return res.status(403).json({
            message: 'Error occured when verifying token.'
        });
        req.user = user;
        next();
    });
};