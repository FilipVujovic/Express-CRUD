const { body } = require('express-validator');

exports.signUpValidator = [
    body('email', 'You must provide a valid email.').isEmail(),
    body('email', 'Email is required.').notEmpty(),
    body('password', 'Password is required.').notEmpty(),
    body('passwordConfirmation', 'Confirm password is required/.').notEmpty()
]


exports.signInValidator = [
    body('email', 'You must provide a valid email.').isEmail(),
    body('email', 'Email is required.').notEmpty(),
    body('password', 'Password is required.').notEmpty()
]