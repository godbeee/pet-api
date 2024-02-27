const express = require("express");
const router = express.Router();
const userController = require("../../Controllers/admin/user");
// const validateCreate = require("../../validate/createPet");

router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUser);
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
