const { body } = require('express-validator');

exports.taskValidator = [
    body('title', 'Title is required.').notEmpty(),
    body('description', 'Description is required.').notEmpty(),
    body('priority', 'Priority is required').notEmpty(),
    body('status', 'Status is required').notEmpty()
]

exports.taskUpdateValidator = [
    body('id', 'id is required').notEmpty(),
    body('title', 'Title is required.').notEmpty(),
    body('description', 'Description is required.').notEmpty(),
    body('priority', 'Priority is required').notEmpty(),
    body('status', 'Status is required').notEmpty()
]