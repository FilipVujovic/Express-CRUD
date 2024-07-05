const { body } = require('express-validator');

exports.userValidator = [
    body('email', 'You must provide a valid email.').isEmail(),
    body('email', 'Email is required.').notEmpty(),
    body('password', 'Password is required.').notEmpty()
]


