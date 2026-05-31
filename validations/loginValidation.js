const { body, validationResult } = require('express-validator');
const loginValidation = [
    body('email')
        .trim()
        .notEmpty()
        .isEmail()
        .withMessage('Valid email is required'),

    body('password')
        .notEmpty()
        .withMessage('Password is required'),

];
module.exports = {
    loginValidation
};
