const express = require('express');
const {registerController, loginController, forgotPassword} = require("../controllers/authController");

const router = express.Router();
router.post('/register', registerController)
router.post('/login', loginController)
router.post('/forgot-password', registerController)
router.post('/change-password', forgotPassword);
module.exports = router;
