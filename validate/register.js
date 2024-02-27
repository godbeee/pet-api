const { body } = require("express-validator");
const User = require("../models/user");

const validate = [
  body("fullname").trim().notEmpty().withMessage("fullname is not empty"),
  body("email")
    .isEmail()
    .withMessage("email is not valid!")
    .custom(async (value) => {
      const existingUser = await User.findOne({ email: value });
      if (existingUser) {
        throw new Error("A user already exists with this e-mail address");
      }
    }),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("password length must >= 5"),
  body("phone")
    .trim()
    .isMobilePhone("vi-VN")
    .withMessage("phone is not valid!"),
];

module.exports = validate;
