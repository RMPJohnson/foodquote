// User Registration
const registerValidation = require("../middlewares/registerValidation");
const {validationResult} = require("express-validator");
const User = require("../models/userModel");
const registerController = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Error occurred in user registration',
                errors: errors.array()
            });
        }
        const { userName, email, password,phone,address } = req.body;
        const existingUser = await User.findOne({
            $or: [
                { email: email.toLowerCase() },
                { phone }
            ]
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'User already exists with this email or phone number'
            });
        }
        const user = await User.create({userName, email, password, phone, address});
        return res.status(200).json({
            success: true,
            message: 'User registered successfully'
        });

    }catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error occurred in register user',
            error: error,
        })
    }


}
const loginController = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: 'User is login successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error occurred in login user',
            error: error,
        })
    }
}
const forgotPassword = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: 'User Password is successfully reset'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error occurred in forgot user password',
            error: error,
        })
    }
}
const changePassword = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: 'User Password is successfully reset'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error occurred in change user password',
            error: error,
        })
    }
}

module.exports = {registerController, loginController, forgotPassword, changePassword}
