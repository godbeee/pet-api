const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petSchema = new Schema(
  {
    avatar: {
      type: Object,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    sex: {
      type: Boolean,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    breed: {
      type: String,
      require: true,
    },
    weight: {
      type: String,
      require: true,
    },
    age: {
      type: Number,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    desc: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pet", petSchema);
