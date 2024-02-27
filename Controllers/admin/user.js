const User = require("../../models/user");

exports.getUsers = async (req, res) => {
  const queryObj = { ...req.query };
  const excludeFields = ["page", "sort"];
  excludeFields.forEach((el) => delete queryObj[el]);

  //filter
  let query = User.find();
  if (req.query.fullname) {
    const regex = new RegExp(req.query.fullname, "i");
    query = User.find({ fullname: { $regex: regex } });
  }

  //sorting
  if (req.query.sort) {
    query = query.sort(req.query.sort);
  } else {
    query = query.sort("-createdAt");
  }

  const users = await query;

  return res.status(200).json({
    status: "success",
    statusCode: 200,
    errors: [],
    users,
  });
};
exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  return res.json({
    status: "success",
    statusCode: 200,
    errors: [],
    user,
  });
};
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  await User.findByIdAndDelete(userId);
  return res.json({
    status: "success",
    statusCode: 200,
    errors: [],
  });
};
