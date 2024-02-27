const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const authShopRoute = require("./Routes/shop/auth");
const mongoose = require("mongoose");
const uploadRoute = require("./Routes/admin/cloudinary");
const petAdminRoute = require("./Routes/admin/pet");
const userAdminRoute = require("./Routes/admin/user");
const petShopRoute = require("./Routes/shop/pet");
const orderShopRoute = require("./Routes/shop/order");
const orderAdminRoute = require("./Routes/admin/order");
const homeAdminRoute = require("./Routes/admin/home");

const app = express();

app.use(cors());
app.use(express.json({ limit: "35mb" }));
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//     limit: "35mb",
//     parameterLimit: 50000,
//   })
// );

app.use(authShopRoute);
app.use(uploadRoute);
app.use(petAdminRoute);
app.use(userAdminRoute);
app.use(petShopRoute);
app.use(orderShopRoute);
app.use(orderAdminRoute);
app.use(homeAdminRoute);

app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

mongoose.connect(process.env.DB_CONNECT_STRING).then(() => {
  console.log("---online---");
  app.listen(process.env.PORT);
});
