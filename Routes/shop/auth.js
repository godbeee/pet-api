const express = require("express");
const authController = require("../../Controllers/shop/auth");
const registerValidate = require("../../validate/register");
const loginValidate = require("../../validate/login");

const router = express.Router();

router.post("/login", loginValidate, authController.postLogin);
router.post("/register", registerValidate, authController.postRegister);

module.exports = router;
