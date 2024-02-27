const express = require("express");
const petController = require("../../Controllers/shop/pet");

const router = express.Router();

router.get("/outstanding", petController.getOutstandingPets);
router.get("/shop/pets", petController.getPets);

module.exports = router;
