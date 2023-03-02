const express = require("express");
const productRouter = express.Router();
const { adminOnly } = require("../middlewares/adminOnly");
const { loginRequired } = require("../middlewares/loginRequired");
const { productService } = require("../services/productService");

//관리자)상품 등록
productRouter.post("/products", adminOnly, async (req, res, next) => {
  try {
    // req (request) 에서 데이터 가져오기
    const { productName, categoryId, productInfo, imageKey, price, quantity } =
      req.body;

    // 위 데이터를 제품 db에 추가하기
    const newProduct = await productService.addProduct({
      productName,
      categoryId,
      productInfo,
      imageKey,
      quantity,
      price,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

//전체) 카테고리 클릭->관련 상품 출력
productRouter.get(
  //categoryTitle : categorys 내 title(예시 : 바지, 치마..)
  "/products/category/:categoryTitle",
  async function (req, res, next) {
    const { categoryTitle } = req.params;

    try {
      // 전체 제품 목록을 얻음
      const products = await productService.getProductsByCategoryTitle(
        categoryTitle
      );

      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
);

// 전체) product 상세 보기
productRouter.get("/products/:productId", async function (req, res, next) {
  try {
    const { productId } = req.params;
    const productData = await productService.getProductData(productId);

    res.status(200).json(productData);
  } catch (error) {
    next(error);
  }
});

//관리자) 상품 수정
productRouter.patch(
  "/products/:productId",
  adminOnly,
  async function (req, res, next) {
    try {
      // req (request) 에서 데이터 가져오기
      const productId = req.params.productId;

      const {
        productName,
        categoryId,
        productInfo,
        imageKey,
        price,
        quantity,
      } = req.body;

      // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
      // 보내주었다면, 업데이트용 객체에 삽입함.
      const toUpdate = {
        ...(productName && { productName }),
        ...(categoryId && { categoryId }),
        ...(productInfo && { productInfo }),
        ...(quantity && { quantity }),
        ...(imageKey && { imageKey }),
        ...(price && { price }),
      };

      // 제품 정보를 업데이트함.
      const updatedProduct = await productService.setProduct(
        productId,
        toUpdate
      );

      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }
);

//관리자) 상품 삭제
productRouter.delete(
  "/products/:productId",
  adminOnly,
  async function (req, res, next) {
    try {
      const productId = req.params.productId;
      const deleteResult = await productService.deleteProductData(productId);

      res.status(200).json(deleteResult);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = productRouter;
