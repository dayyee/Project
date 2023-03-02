const { categoryModel } = require("../db/models/categoryModel");
const { productModel } = require("../db/models/productModel");

class ProductService {
  constructor(productModel, categoryModel) {
    this.productModel = productModel;
    this.categoryModel = categoryModel;
  }

  async addProduct(productInfo) {
    // 객체 destructuring
    const { productName } = productInfo;

    // 이름 중복 확인
    const product = await this.productModel.findByProductName(productName);
    if (product) {
      throw new Error(
        "이 이름은 현재 사용중입니다. 다른 이름을 입력해 주세요."
      );
    }

    // db에 저장
    const createdNewProduct = await this.productModel.create(productInfo);

    return createdNewProduct;
  }

  async getProducts() {
    const products = await this.productModel.findAll();

    return products;
  }

  async getProductsByCategoryTitle(categoryTitle) {
    //카테고리에서 타이틀로 찾아서 그 데이터 다 갖고오고
    const category = await this.categoryModel.findByTitle(categoryTitle); //그 category의 _id값을 가지고 내용 찾기
    const products = await this.productModel.findAllByCategoryId(category._id);

    return products;
  }

  async getProductData(productId) {
    const product = await this.productModel.findById(productId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!product) {
      throw new Error("해당 id의 제품은 없습니다. 다시 한 번 확인해 주세요.");
    }

    return product;
  }

  async setProduct(productId, toUpdate) {
    const updatedProduct = await this.productModel.update({
      productId,
      update: toUpdate,
    });

    return updatedProduct;
  }

  async deleteProductData(productId) {
    const deleteProduct = await this.productModel.deleteById(productId);
    return deleteProduct;
  }
}

const productService = new ProductService(productModel, categoryModel);

module.exports = { productService };
