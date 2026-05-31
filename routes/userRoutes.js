const express = require('express');
const getLoginUsersController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get('/get-login-user',authMiddleware, getLoginUsersController);

module.exports = router;
