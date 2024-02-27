const Order = require("../../models/order");

exports.getOrders = async (req, res, next) => {
  const queryObj = { ...req.query };
  const excludeFields = ["page", "sort"];
  excludeFields.forEach((el) => delete queryObj[el]);

  //filter
  let query = Order.find();
  if (req.query.fullname) {
    const regex = new RegExp(req.query.fullname, "i");
    query = Order.find({ name: { $regex: regex } });
  }

  //sorting
  if (req.query.sort) {
    query = query.sort(req.query.sort);
  } else {
    query = query.sort("-createdAt");
  }

  const orders = await query;

  return res.status(200).json({
    status: "success",
    statusCode: 200,
    errors: [],
    orders,
  });
};
exports.deleteOrder = async (req, res) => {
  const orderId = req.params.id;
  await Order.findByIdAndDelete(orderId);
  return res.json({
    status: "success",
    statusCode: 200,
    errors: [],
  });
};
exports.updateOrder = async (req, res) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId);
  order.status = req.body.status;
  order.note = req.body.note;
  await order.save();
  return res.json({
    status: "success",
    statusCode: 200,
    errors: [],
  });
};
