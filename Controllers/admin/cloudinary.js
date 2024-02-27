require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("cloudinary");
const Pet = require("../../models/pet");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
exports.upload = async (req, res, next) => {
  const result = await cloudinary.uploader.upload(req.body.image, {
    public_id: `${uuidv4()}`,
    resource_type: "auto",
  });
  if (req.body.id) {
    const pet = await Pet.findById(req.body.id);
    pet.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
    await pet.save();
  }
  return res.json({
    public_id: result.public_id,
    url: result.secure_url,
  });
};
exports.remove = async (req, res, next) => {
  console.log(req.body);
  const image_id = req.body.public_id;
  if (req.body.id) {
    const pet = await Pet.findById(req.body.id);
    pet.avatar = null;
    await pet.save();
  }
  cloudinary.uploader.destroy(image_id, async (err, data) => {
    if (err) {
      return res.json({ err });
    }
    res.send("ok");
  });
};
