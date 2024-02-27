const express = require("express");
const orderController = require("../../Controllers/shop/order");
const createOrderValidate = require("../../validate/createOrder");
const router = express.Router();

router.post("/orders", createOrderValidate, orderController.createOrder);
router.get("/orders/users/:id", orderController.getOrderByUserId);
router.get("/orders/:id", orderController.getOrderById);

module.exports = router;
