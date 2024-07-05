const bcrypt = require('bcrypt');
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken');
dotenv.config();

exports.encryptPassword = async (password) => {
    const encryptedPass = await bcrypt.hash(password, 2);
    return encryptedPass;
}

exports.dectyptPassword = async (password, dbPassword) => {
    const passwordsMatch = await bcrypt.compare(password, dbPassword);
    return passwordsMatch;
}

exports.signToken = (userData) => {
    const signedJWT = jwt.sign(userData, process.env.SECRETKEY);
    return signedJWT;
}