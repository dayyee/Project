// express 받아오기
const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const categoryRouter = require("./routes/categoryRouter");
const productRouter = require("./routes/productRouter");
const orderRouter = require("./routes/orderRouter");
const { errorHandler } = require("./middlewares/errorHandler");
//const { errorLogger } = require("./middlewares/errorLogger");

app.use(cors()); //CORS 방지

app.use(express.urlencoded({ extended: false })); // Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json()); // Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.

// api 라우팅
app.use("/api", userRouter);
app.use("/api", categoryRouter);
app.use("/api", productRouter);
app.use("/api", orderRouter);

// 에러 미들웨어 (에러를 error.log 파일에 기록 및, 에러를 프론트엔드에 전달)
//app.use(errorLogger);
app.use(errorHandler);

module.exports = { app };
