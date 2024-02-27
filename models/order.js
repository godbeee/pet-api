const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    total: {
      type: Number,
      require: true,
    },
    note: {
      type: String,
    },
    status: {
      type: String,
      default: "waiting for pay",
    },
    buyPets: [
      {
        petId: {
          type: Schema.Types.ObjectId,
          ref: "Pet",
          require: true,
        },
        quantity: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
