import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Api from "../../utills/api";
import "./Register.css";
import Header from '../../components/Header';

function Register() {
  const navigate = useNavigate();
  // State 정의
  const [inputs, setInputs] = useState({
    userName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  // const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  function emailCheck(email) {
    const regex =
      /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i;
    return email.match(regex) !== null;
  }

  const validateForm = ({ userName, email, password, passwordConfirm }) => {
    if (userName.length < 2) {
      return "이름은 2글자 이상이어야합니다.";
    }

    if (emailCheck(email) === false) {
      return "이메일 형식이 올바르지 않습니다.";
    }
    if (password.length < 4) {
      return "비밀번호는 4글자 이상이어야합니다.";
    }
    if (password !== passwordConfirm) {
      return "비밀번호가 일치하지 않습니다.";
    }
    return true;
  };

  async function registerUser(formdata) {
    try {
      const newData = await Api.post("register", formdata);
      alert("회원가입이 완료되었습니다!");
      navigate("/login");
    } catch (err) {
      alert(err.response.data.reason)
    }

  }

  const handleSubmit = (e) => {

    e.preventDefault();
    const validated = validateForm(inputs);
    if (typeof validated === "string") {
      alert(validated);
      return;
    }

    const { userName, email, password } = inputs;
    const formdata = { userName, email, password };
    registerUser(formdata);
  };

  return (
    <div className='section'>
      <div className="container-center" >
        <Header></Header>
        {/* <p>회원가입</p> */}
        <form onSubmit={handleSubmit} className="user-form">

          <input
            className="input"
            value={inputs.userName}
            label="이름"
            placeholder='Name'
            name="userName"
            type="text"
            onChange={handleChange}
          />

          <input
            className="input"
            value={inputs.email}
            label="Email"
            name="email"
            placeholder='Email'
            type="email"
            onChange={handleChange}
          />

          <input
            className="input"
            value={inputs.password}
            label="비밀번호"
            placeholder='Password'
            name="password"
            type="password"
            onChange={handleChange}
          />

          <input
            className="input"
            value={inputs.passwordConfirm}
            label="비밀번호확인"
            placeholder='Password Check'
            name="passwordConfirm"
            type="password"
            onChange={handleChange}
          />
          <button className="user-button">회원가입</button>

        </form>
      </div>

    </div>
  );
}

export default Register;
