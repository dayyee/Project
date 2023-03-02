const Router = require("express");
const { loginRequired } = require("../middlewares/loginRequired");
const { adminOnly } = require("../middlewares/adminOnly");
const { categoryService } = require("../services/categoryService");

const categoryRouter = Router();

// 홈 화면
categoryRouter.get("/categorys", async function (req, res, next) {
  try {
    // 전체 카테고리 목록을 얻음
    const categorys = await categoryService.getCategorys();

    res.status(200).json(categorys);
  } catch (error) {
    next(error);
  }
});

// 관리자) 카테고리 등록
categoryRouter.post("/categorys", adminOnly, async (req, res, next) => {
  try {
    // req (request) 에서 데이터 가져오기
    const { title, description, imageKey, themeClass } = req.body;

    // 위 데이터를 카테고리 db에 추가하기
    const newCategory = await categoryService.addCategory({
      title,
      description,
      imageKey,
      themeClass,
    });

    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
});

//관리자)카테고리 수정
categoryRouter.patch(
  "/categorys/:categoryId",
  adminOnly,
  async function (req, res, next) {
    try {
      const categoryId = req.params.categoryId;

      // req (request) 에서 데이터 가져오기
      const { title, description, imageKey, themeClass } = req.body;

      // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
      // 보내주었다면, 업데이트용 객체에 삽입함.
      const toUpdate = {
        ...(title && { title }),
        ...(description && { description }),
        ...(imageKey && { imageKey }),
        ...(themeClass && { themeClass }),
      };

      // 카테고리 정보를 업데이트함.
      const updatedCategory = await categoryService.setCategory(
        categoryId,
        toUpdate
      );

      res.status(200).json(updatedCategory);
    } catch (error) {
      next(error);
    }
  }
);

//관리자)카테고리 삭제
categoryRouter.delete(
  "/categorys/:categoryId",
  adminOnly,
  async function (req, res, next) {
    try {
      const categoryId = req.params.categoryId;
      const deleteResult = await categoryService.deleteCategoryData(categoryId);

      res.status(200).json(deleteResult);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = categoryRouter;
