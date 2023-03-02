const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../db/models/userModel");

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  // 일반 회원가입
  async addUser(userInfo) {
    // 객체 destructuring
    const { email, userName, password } = userInfo;

    // 이메일 중복 확인
    const user = await this.userModel.findByEmail(email);
    if (user) {
      throw new Error(
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요."
      );
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserInfo = { userName, email, password: hashedPassword };

    // db에 저장
    const createdNewUser = await this.userModel.create(newUserInfo);

    return createdNewUser;
  }

  // 일반 로그인
  async getUserToken(loginInfo) {
    // 객체 destructuring
    const { email, password } = loginInfo;

    // 이메일 db에 존재 여부 확인
    const user = await this.userModel.findByEmail(email);
    if (!user) {
      throw new Error(
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
      );
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );

    if (!isPasswordCorrect) {
      throw new Error(
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
      );
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
    const token = jwt.sign({ userId: user._id, role: user.role }, secretKey);

    const isAdmin = user.role === "admin";

    return { token, isAdmin };
  }

  async findEmail(userEmail) {
    const foundedEmail = await this.userModel.findByEmail(userEmail);
    if (!foundedEmail) {
      throw new Error("등록되지 않은 이메일입니다.");
      return;
    }
    return foundedEmail;
  }

  //---------------------------------------------
  // 사용자 관련

  // 정보 수정, 삭제 관련 재확인시 현재 비밀번호 요청
  // 비밀번호 맞는지 여부만 확인
  async checkUserPassword(userId, password) {
    // 이메일 db에 존재 여부 확인
    const user = await this.userModel.findById(userId);

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );

    if (!isPasswordCorrect) {
      throw new Error(
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
      );
    }

    // 비밀번호 일치함. 유저 정보 반환
    return user;
  }

  //사용자 정보 가져오기
  async getUserData(userId) {
    const user = await this.userModel.findById(userId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      throw new Error("가입 내역이 없습니다. 다시 한 번 확인해 주세요.");
    }

    return user;
  }

  //관리자) 사용자 정보 page 전체 카운트 가져오기-pagination
  async getCountDocument() {
    const totalPage = await this.userModel.findCountDocument();
    return totalPage;
  }
  // 관리자) 사용자 정보 가져오기-pagination
  async getAllUsersPagination(page, perPage) {
    const users = await this.userModel.findAllPagination(page, perPage);
    return users;
  }

  // 관리자) 특정 사용자 정보 수정
  async updateUserAdmin(userId, toUpdate) {
    let user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error("해당 id의 사용자를 찾을 수 없습니다.");
    }
    user = await this.userModel.update({ userId, update: toUpdate });
    return user;
  }

  async setUserPW(userId, randomPW) {
    const newPasswordHash = await bcrypt.hash(randomPW, 10);

    const user = await this.userModel.updatePW({
      userId,
      newPasswordHash,
    });

    return user;
  }

  // 사용자 정보 수정, 현재 비밀번호가 있어야 수정 가능.
  async setUser(userInfoRequired, toUpdate) {
    // 객체 destructuring
    const { userId, currentPassword } = userInfoRequired;

    // 우선 해당 id의 유저가 db에 있는지 확인
    let user = await this.userModel.findById(userId);

    // db에서 해당 user 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      throw new Error("가입 내역이 없습니다. 다시 한 번 확인해 주세요.");
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      correctPasswordHash
    );

    if (!isPasswordCorrect) {
      throw new Error(
        "현재 비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
      );
    }

    // 사용자 확인 및 비밀번호 일치 확인 후 업데이트 시작
    // 비밀번호도 변경하는 경우에는 해쉬화 해주어야 함.
    const { password } = toUpdate;

    if (password) {
      const newPasswordHash = await bcrypt.hash(password, 10);
      toUpdate.password = newPasswordHash;
    }

    // 업데이트 진행
    user = await this.userModel.update({
      userId,
      update: toUpdate,
    });

    return user;
  }

  // 비밀번호 맞는지 여부만 확인
  async checkUserPassword(userId, password) {
    // 이메일 db에 존재 여부 확인
    const user = await this.userModel.findById(userId);

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );

    if (!isPasswordCorrect) {
      throw new Error(
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
      );
    }

    // 비밀번호 일치함. 유저 정보 반환
    return user;
  }

  //사용자 삭제
  async deleteUserData(userId) {
    const { deletedCount } = await this.userModel.deleteById(userId);

    // 삭제에 실패한 경우, 에러 메시지 반환
    if (deletedCount === 0) {
      throw new Error(`${userId} 사용자 데이터의 삭제에 실패하였습니다.`);
    }

    return { result: "success" };
  }
}

const userService = new UserService(userModel);

module.exports = { userService };
