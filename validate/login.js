const { body } = require("express-validator");
const User = require("../models/user");

const validate = [
  body("email")
    .isEmail()
    .withMessage("email is not valid!")
    .custom(async (value) => {
      const existingUser = await User.findOne({ email: value });
      if (!existingUser) {
        throw new Error("a user with email is not found!");
      }
    }),
  body("password").trim().notEmpty().withMessage("password is not empty!"),
];

module.exports = validate;
