require("dotenv").config();
const logger = require("./src/utils/logger");
const { app } = require("./src/app");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});

// mongoose 받아오기
const mongoose = require("mongoose");

mongoose.set("strictQuery", true); // stricQuery 오류를 처리하기 위한 세팅

const DB_URL = process.env.MONGODB_URL || "address error";

//mongo db atlas 연결
mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on("connected", () => console.log("welcome mongoDB" + DB_URL));
db.on("error", (error) => logger.error("failed connection\n" + error));
