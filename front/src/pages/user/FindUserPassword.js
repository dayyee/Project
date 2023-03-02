import * as Api from "../../utills/api";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'

function FindUserPassword() {

    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("");

    const handleChange = event => {
        setUserEmail(() =>
            event.target.value
        )
    }

    const lostpass = async (e) => {
        e.preventDefault();

        const formdata = {
            userEmail
        }
        console.log(formdata)
        try {
            const response = await Api.post("users/help/password", formdata)
                ;
            alert("가입하신 이메일로 임시 비밀번호를 전송했습니다.")
            navigate('/login');
        } catch (err) {
            alert("가입된 정보가 없습니다.");
        }
    };

    return (
        // <div>
        //     <form onSubmit={lostpass} className="user-form">
        //         <h4>비밀번호 찾기</h4>
        //         <p>임시 비밀번호 발급</p>
        //         <p>이메일 <input className="email" onChange={handleChange} value={userEmail} /></p>
        //         <button type="submit">전송</button>
        //         <p>이메일에 전송된 비밀번호를 확인 후 다시 로그인 해 주세요.</p>

        //     </form>
        // </div>


        <div className="section">
            <Header title="비밀번호 찾기"></Header>
            <div className="container-center">
                <p style={{ textAlign: "center" }}>임시 비밀번호 발급</p>
                <form className="user-form">

                    <div style={{ margin: "1rem" }}></div>
                    <div>
                        <label>이메일</label>
                    </div>
                    <input className="input" label='' name='password' type='email' placeholder="비밀번호를 입력하세요" value={userEmail} onChange={handleChange} />
                    <button className="user-button" onClick={lostpass} >
                        이메일 전송하기
                    </button>
                </form>
                <p style={{ marginTop: "1rem" }}>이메일에 전송된 비밀번호를 확인 후 다시 로그인 해 주세요.</p>
            </div>
        </div>

    )
}

export default FindUserPassword;