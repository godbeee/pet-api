const { body } = require("express-validator");

const validate = [
  body("userInfo.fullname")
    .trim()
    .notEmpty()
    .withMessage("fullname is not empty"),
  body("userInfo.phone")
    .trim()
    .isMobilePhone("vi-VN")
    .withMessage("phone is not valid!"),
  body("userInfo.email").isEmail().withMessage("email is not valid!"),
  body("userInfo.address")
    .trim()
    .notEmpty()
    .withMessage("address is not empty"),
];

module.exports = validate;
