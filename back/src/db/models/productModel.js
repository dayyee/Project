const { model } = require("mongoose");
const { ProductSchema } = require("../schemas/productSchema");

const Product = model("products", ProductSchema);

class ProductModel {
  async findByProductName(productName) {
    const product = await Product.findOne({ productName });
    return product;
  }

  async findById(productId) {
    const product = await Product.findOne({ _id: productId });
    return product;
  }

  async findOneByCategoryId(categoryId) {
    const product = await Product.findOne({ categoryId });
    return product;
  }

  async findAllByCategoryId(categoryId) {
    const products = await Product.find({ categoryId });
    return products;
  }

  async findAll() {
    const products = await Product.find({}).populate("categoryId");
    return products;
  }

  async create(productInfo) {
    const createdNewProduct = await Product.create(productInfo);
    return createdNewProduct;
  }

  async update({ productId, update }) {
    const filter = { _id: productId };
    const option = { returnOriginal: false };

    const updatedProduct = await Product.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedProduct;
  }

  async deleteById(productId) {
    const result = await Product.deleteOne({ _id: productId });
    return result;
  }
}

module.exports = ProductModel;

const productModel = new ProductModel();

module.exports = { productModel };
