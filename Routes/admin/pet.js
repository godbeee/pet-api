const express = require("express");
const router = express.Router();
const petController = require("../../Controllers/admin/pet");
const validateCreate = require("../../validate/createPet");

router.get("/pets", petController.getPets);
router.get("/pets/:id", petController.getPet);
router.post("/pets", validateCreate, petController.postCreatePet);
router.post("/pets/:id", petController.postUpdatePet);
router.delete("/pets/:id", petController.deletePet);

module.exports = router;
