const Pet = require("../../models/pet");

exports.getOutstandingPets = async (req, res) => {
  let query = Pet.find();

  query = query.sort("-createdAt");

  query = query.limit(4);

  const pets = await query;
  return res.json({
    status: "success",
    statusCode: 200,
    errors: [],
    pets,
  });
};
exports.getPets = async (req, res) => {
  const queryObj = { ...req.query };
  const excludeFields = ["page", "sort"];
  excludeFields.forEach((el) => delete queryObj[el]);

  //filter
  let query = Pet.find();
  if (req.query.type) {
    query = Pet.find({ type: req.query.type });
    if (req.query.name) {
      const regex = new RegExp(req.query.name, "i");
      query = Pet.find({ type: req.query.type, name: { $regex: regex } });
    }
  } else {
    if (req.query.name) {
      const regex = new RegExp(req.query.name, "i");
      query = Pet.find({ name: { $regex: regex } });
    }
  }
  //sorting
  if (req.query.sort) {
    query = query.sort(req.query.sort);
  } else {
    query = query.sort("-createdAt");
  }
  const pets = await query;

  return res.status(200).json({
    status: "success",
    statusCode: 200,
    errors: [],
    pets,
  });
};
