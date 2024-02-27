const express = require("express");
const homeController = require("../../Controllers/admin/home");
const router = express.Router();

router.get("/admin/home/summary", homeController.getSummary);

module.exports = router;
