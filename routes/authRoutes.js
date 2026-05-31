const express = require('express');
const {registerController, loginController, forgotPassword, changePassword} = require("../controllers/authController");
const {registerValidation} = require("../validations/registerValidation");
const {loginValidation} = require("../validations/loginValidation");

const router = express.Router();
router.post('/register',registerValidation, registerController)
router.post('/login' ,loginValidation,loginController)
router.post('/forgot-password', forgotPassword)
router.post('/change-password', changePassword);
module.exports = router;
