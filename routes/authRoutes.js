const express = require('express');
const {registerController, loginController, forgotPassword, changePassword} = require("../controllers/authController");

const router = express.Router();
router.post('/register', registerController)
router.post('/login', loginController)
router.post('/forgot-password', forgotPassword)
router.post('/change-password', changePassword);
module.exports = router;
