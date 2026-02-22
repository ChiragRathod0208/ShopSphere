const express = require('express');
const router = express.Router();

const authController = require("../Controllers/authController");

router.get("/", authController.GetLoginView);

router.post("/login", authController.Login);

router.post("/register", authController.Register);

router.get("/logout", authController.Logout);

module.exports = router;