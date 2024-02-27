const Order = require("../../models/order");
const User = require("../../models/user");

exports.getSummary = async (req, res) => {
  let queryUser = User.find();
  queryUser = queryUser.countDocuments();
  const userCount = await queryUser;
  const orderCount = await Order.countDocuments();
  let query = Order.find();
  query = query.select("total -_id");
  let totals = await query;
  const totalPrice = totals
    .map((t) => t.total)
    .reduce((acc, el) => acc + el, 0);
  res.json({
    userCount,
    orderCount,
    totalPrice,
  });
};
