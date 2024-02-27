const express = require("express");
const { upload, remove } = require("../../Controllers/admin/cloudinary");

const router = express.Router();

router.post("/uploadimage", upload);
router.post("/removeimage", remove);

module.exports = router;
