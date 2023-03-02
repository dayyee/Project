const logger = require("../utils/logger");

// 에러 미들웨어는 항상 (설령 안 쓰더라도)
// error~next의 4개 인자를 설정해 주어야 함.
function errorHandler(error, req, res, next) {
  // 터미널에 노란색으로 출력됨.
  logger.error(error.stack);

  res.status(400).json({ reason: error.message });
}

module.exports = { errorHandler };
