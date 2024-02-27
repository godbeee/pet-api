const { validationResult } = require("express-validator");
const Pet = require("../../models/pet");

exports.postCreatePet = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      status: "fail",
      statusCode: 500,
      errors: errors.array(),
    });
  }
  const newPet = new Pet({
    avatar: req.body.avatar,
    name: req.body.name,
    sex: req.body.sex,
    type: req.body.type,
    breed: req.body.breed,
    weight: req.body.weight,
    age: req.body.age,
    desc: req.body.desc,
    price: req.body.price,
  });
  const pet = await newPet.save();

  return res.json({
    status: "success",
    statusCode: 201,
    errors: [],
    pet,
  });
};
exports.postUpdatePet = async (req, res) => {
  const id = req.params.id;
  const petUpdate = await Pet.findById(id);
  petUpdate.name = req.body.name;
  petUpdate.sex = req.body.sex;
  petUpdate.type = req.body.type;
  petUpdate.breed = req.body.breed;
  petUpdate.weight = req.body.weight;
  petUpdate.age = req.body.age;
  petUpdate.desc = req.body.desc;
  petUpdate.price = req.body.price;
  await petUpdate.save();

  return res.json({
    status: "success",
    statusCode: 200,
    errors: [],
    pet: petUpdate,
  });
};
exports.getPets = async (req, res) => {
  const queryObj = { ...req.query };
  const excludeFields = ["page", "sort"];
  excludeFields.forEach((el) => delete queryObj[el]);

  //filter
  let query = Pet.find();
  if (req.query.name) {
    const regex = new RegExp(req.query.name, "i");
    query = Pet.find({ name: { $regex: regex } });
  }

  //sorting
  if (req.query.sort) {
    query = query.sort(req.query.sort);
  } else {
    query = query.sort("-createdAt");
  }
  //pagination
  // const page = req.query.page * 1 || 1;
  // const limit = 10;
  // const skip = (page - 1) * limit;

  // query = query.skip(skip).limit(limit);

  const pets = await query;

  //const totalPets = await Pet.countDocuments();

  return res.status(200).json({
    status: "success",
    statusCode: 200,
    errors: [],
    pets,
    // totalPets,
    // currentPage: page,
    // nextPage: page + 1,
    // prevPage: page - 1,
    // hasNextPage: limit * page < totalPets,
    // hasPrevPage: page > 1,
    // lastPage: Math.ceil(totalPets / limit),
  });
};
exports.getPet = async (req, res) => {
  const pet = await Pet.findById(req.params.id);
  let petRelate = [];
  if (pet) {
    petRelate = Pet.find({
      type: pet.type,
      breed: pet.breed,
      _id: { $ne: pet._id },
    });
    petRelate = await petRelate.limit(4);
  }
  return res.json({
    status: "success",
    statusCode: 201,
    errors: [],
    pet,
    petRelate,
  });
};
exports.deletePet = async (req, res) => {
  const petId = req.params.id;
  console.log(petId);
  await Pet.findByIdAndDelete(petId);
  return res.json({
    status: "success",
    statusCode: 200,
    errors: [],
  });
};
