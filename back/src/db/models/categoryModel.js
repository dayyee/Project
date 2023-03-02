const { model } = require("mongoose");
const { CategorySchema } = require("../schemas/categorySchema");

const Category = model("categorys", CategorySchema);

class CategoryModel {
  async findByTitle(title) {
    const category = await Category.findOne({ title });
    return category;
  }

  async findById(categoryId) {
    const category = await Category.findOne({ _id: categoryId });
    return category;
  }

  async findAll() {
    const categorys = await Category.find({});
    return categorys;
  }

  async create(categoryInfo) {
    const createdNewCategory = await Category.create(categoryInfo);
    return createdNewCategory;
  }

  async update({ categoryId, update }) {
    const filter = { _id: categoryId };
    const option = { returnOriginal: false };

    const updatedCategory = await Category.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCategory;
  }

  async deleteById(categoryId) {
    const result = await Category.deleteOne({ _id: categoryId });
    return result;
  }
}

module.exports = CategoryModel;

const categoryModel = new CategoryModel();

module.exports = { categoryModel };
