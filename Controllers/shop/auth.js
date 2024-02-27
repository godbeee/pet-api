const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

exports.postLogin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json({
      status: "fail",
      statusCode: 500,
      errors: errors.array(),
    });
  }

  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email: email });
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.json({
      status: "fail",
      statusCode: 500,
      errors: [{ msg: "password is incorrect!" }],
    });
  }

  const token = jwt.sign(
    {
      email: user.email,
      userId: user._id.toString(),
      role: user.role,
    },
    "secretkey",
    {
      expiresIn: "1h",
    }
  );

  return res.json({
    status: "success",
    statusCode: 200,
    errors: [],
    user: {
      token,
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
    },
  });
};

exports.postRegister = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      status: "fail",
      statusCode: 500,
      errors: errors.array(),
    });
  }
  console.log(false);
  const fullname = req.body.fullname;
  const email = req.body.email;
  const password = req.body.password;
  const phone = req.body.phone;

  const hashPassword = await bcrypt.hash(password, 12);
  const newUser = new User({
    email: email,
    fullname: fullname,
    phone: phone,
    password: hashPassword,
  });
  const user = await newUser.save();
  return res.json({
    status: "success",
    statusCode: 201,
    errors: [],
    user,
  });
};
