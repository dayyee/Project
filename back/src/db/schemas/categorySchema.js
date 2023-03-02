const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageKey: {
      type: String,
      required: true,
    },
    themeClass: {
      type: String,
      required: true,
    },
  },
  {
    collection: "categorys",
    timestamps: true,
  }
);

module.exports = mongoose.model("categorys", CategorySchema);
