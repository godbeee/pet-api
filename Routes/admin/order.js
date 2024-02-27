const express = require("express");
const orderController = require("../../Controllers/admin/order");
const router = express.Router();

router.get("/admin/orders", orderController.getOrders);
router.delete("/admin/orders/:id", orderController.deleteOrder);
router.put("/admin/orders/:id", orderController.updateOrder);

module.exports = router;
