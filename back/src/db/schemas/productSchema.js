const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categorys",
      required: true,
    },
    productInfo: {
      type: String,
      required: true,
    },
    imageKey: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "products",
    timestamps: true,
  }
);

module.exports = mongoose.model("products", ProductSchema);
