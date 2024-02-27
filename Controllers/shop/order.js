const { validationResult } = require("express-validator");
const Order = require("../../models/order");
const sendEmail = require("../../ultils/send-email");

exports.createOrder = async (req, res, next) => {
  const userInfo = req.body.userInfo;
  const buyedPets = req.body.buyedPets;
  const cart = buyedPets.petsOrigin;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      status: "fail",
      statusCode: 500,
      errors: errors.array(),
    });
  }

  console.log(cart);
  const newOrder = new Order({
    name: userInfo.fullname,
    email: userInfo.email,
    phone: userInfo.phone,
    address: userInfo.address,
    userId: userInfo.id,
    total: buyedPets.totalPrice,
    buyPets: buyedPets.pets,
  });
  await newOrder.save();

  const config = {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 9,
  };

  let htmlPets = "";
  for (let item of cart) {
    const price = new Intl.NumberFormat("it-IT", config).format(item.price);
    const total = new Intl.NumberFormat("it-IT", config).format(
      item.price * item.quantity
    );
    htmlPets += `
                    <tr>
                      <td style="text-align:center;border: 1px solid black;">${item.name}</td>
                      <td style="text-align:center;border: 1px solid black;">${price}</td>
                      <td style="text-align:center;border: 1px solid black;">${item.quantity}</td>
                      <td style="text-align:center;border: 1px solid black;">${total}</td>
                    </tr>
                   `;
  }
  const html = `
            <div>
              <h2 style="margin-bottom: 1rem">Xin chào ${newOrder.name}</h2>
              <p style="margin-bottom: 1rem"><strong>Phone:</strong> ${
                newOrder.phone
              }</p>
              <p style="margin-bottom: 1rem"><strong>Address:</strong> ${
                newOrder.address
              }</p>

              <table style="border: 1px solid black;border-collapse: collapse;width:100%;margin-bottom:1rem">
                <tr>
                  <th style="border: 1px solid black;">Tên </th>
                  <th style="border: 1px solid black;">Giá</th>
                  <th style="border: 1px solid black;">Số lượng</th>
                  <th style="border: 1px solid black;">Thành tiền</th>
                </tr>
                ${htmlPets}
              </table>

              <h2>Tổng Thanh Toán: ${new Intl.NumberFormat(
                "it-IT",
                config
              ).format(newOrder.total)}</h2>
              <h2>Cảm ơn Bạn!</h2>
            </div>
          `;

  sendEmail(userInfo.email, "Order success!", html);
  return res.json({
    status: "success",
    statusCode: 200,
    errors: [],
  });
};
exports.getOrderByUserId = async (req, res, next) => {
  const userId = req.params.id;
  if (!userId) {
    return res.json({
      status: "fail",
      statusCode: 500,
      errors: [{ msg: "user id is not found!" }],
    });
  }
  const orders = await Order.find({ userId: userId });

  return res.json({
    status: "success",
    statusCode: 200,
    errors: [],
    orders,
  });
};
exports.getOrderById = async (req, res, next) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId).populate("buyPets.petId").exec();

  return res.json({
    status: "success",
    statusCode: 200,
    errors: [],
    order,
  });
};
