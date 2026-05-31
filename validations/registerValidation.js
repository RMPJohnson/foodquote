const { body, validationResult } = require('express-validator');
const registerValidation = [
    body('userName')
        .trim()
        .notEmpty()
        .withMessage('Username is required'),

    body('email')
        .trim()
        .isEmail()
        .withMessage('Valid email is required'),

    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters'),

    body('phone')
        .trim()
        .notEmpty()
        .withMessage('Phone number is required'),

    body('address')
        .trim()
        .notEmpty()
        .withMessage('Address is required')
];
module.exports = {
    registerValidation
};
