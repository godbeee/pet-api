const { body } = require("express-validator");

const validate = [
  body("name").trim().notEmpty().withMessage("name is not empty"),
  body("weight")
    .trim()
    .notEmpty()
    .withMessage("weight is not empty")
    .isNumeric()
    .withMessage("weight must be a number"),
  body("age")
    .trim()
    .notEmpty()
    .withMessage("age is not empty")
    .isNumeric()
    .withMessage("age must be a number")
    .isInt({ min: 1, max: 20 })
    .withMessage("age must be between 1 - 20"),
  body("price")
    .trim()
    .notEmpty()
    .withMessage("price is not empty")
    .isNumeric()
    .withMessage("price must be a number"),
];

module.exports = validate;
