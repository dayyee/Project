const nodemailer = require("nodemailer");

const sendMail = async (to, subject, text) => {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail", // 이메일
      auth: {
        user: process.env.MAIL_ID, // 발송자 이메일
        pass: process.env.MAIL_PW, // 발송자 비밀번호
      },
    });
    const message = {
      to,
      subject,
      text,
    };
    await transport.sendMail(message);
  } catch (error) {
    throw new Error("메일 전송에 실패했습니다.");
  }
};

module.exports = sendMail;
