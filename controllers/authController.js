// User Registration
const {validationResult} = require("express-validator");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const user = await User.create({userName, email, password: hashedPass, phone, address});
        return res.status(200).json({
            success: true,
            message: 'User registered successfully',
            user
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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Error occurred in user login',
                errors: errors.array()
            });
        }
        const {email, password } = req.body;
        const user = await User.findOne({email : email})

        if (!user) {
            return res.status(409).json({
                success: false,
                message: 'User does not exist or invalid email or password'
            });
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) {
            return res.status(409).json({
                success: false,
                message: 'Password is incorrect',
            })
        }
        user.password = undefined;

        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d",});

        return res.status(200).json({
            success: true,
            message: 'User is login successfully',
            token,
            user
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
