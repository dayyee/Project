import React, { useState, useEffect } from "react";
import {
    MDBBtn,
    MDBInput,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
}
    from 'mdb-react-ui-kit';
import * as Api from "../../utills/api";
import Postcode from '../../utills/Postcode'
import { Link } from 'react-router-dom';
import { ROUTE } from '../../utills/route'

function AccountSecurity() {
    const [disabled, setDisabled] = useState(true);
    const [formData, setFormData] = useState(undefined);
    const [currentPassword, setCurrentPassword] = useState('');

    const [popup, setPopup] = useState(false);
    const toggleShow = (e) => {
        e.preventDefault();
        setPopup(!popup);
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await Api.get('users');
                const data = res.data;
                // form에 password는 저장하지 않는다.
                setFormData(
                    {
                        _id: data._id,
                        userName: data.userName,
                        phoneNumber: data.phoneNumber || "",
                        address: {
                            address1: data.address?.address1 || "",
                            address2: data.address?.address2 || "",
                            postalCode: data.address?.postalCode || ""
                        }
                    });

            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    }, []);


    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormData(prev => (
            { ...prev, [name]: value }));
    };


    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            confirmPassword: prev.password,
            address: {
                ...prev.address,
                [name]: value
            }
        }))
    }

    const [postPopup, setPostPopup] = useState(false);
    const handleComplete = (e) => {
        e.preventDefault();
        setPostPopup(!postPopup);
    }



    const handleSubmit = async (e) => {
        e.preventDefault();

        const validated = validateForm({ ...formData });
        if (typeof validated === "string") {
            alert(validated);
            return;
        }

        const updatedUser =
        {
            userName: formData.userName,
            phoneNumber: formData.phoneNumber || "",
            address: {
                address1: formData.address?.address1 || "",
                address2: formData.address?.address2 || "",
                postalCode: formData.address?.postalCode || ""
            },
            currentPassword: currentPassword,
        };

        if (formData.password && formData.password === formData.confirmPassword) {
            updatedUser.password = formData.password;
        }


        // "users/유저id" 엔드포인트로 patch 요청함.
        try {
            const newData = await Api.patch(`users/${formData._id}`, updatedUser);
            alert('수정이 완료되었습니다!')
            setPopup(!popup);
        }
        catch (e) {
            alert(e.response.data.reason)
        }

        setPopup(!popup);
    };



    const validateForm = ({ userName, password, confirmPassword }) => {

        if (password || confirmPassword) {
            if (password !== confirmPassword) {
                return "비밀번호가 일치하지 않습니다.";
            }
            if (password.length < 4) {
                return "비밀번호는 4글자 이상이어야합니다.";
            }
        }
        if (userName.length < 2) {
            return "이름은 2글자 이상이어야합니다.";
        }

        return true;
    };



    if (!formData) {
        return (
            <div className="container-center">
                <div className='section'>
                    <div>Loading...</div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="container-center">
                <div className='section'>

                    <button className="edit-button"
                        onClick={(e) => {
                            setDisabled((current) => !current)

                        }}>수정하기</button>
                    <div style={{ marginBottom: "3rem" }}></div>
                    <form className="user-form" >
                        <div>
                            <label>이름</label>
                        </div>

                        <input className="input" label='' name="userName" type='text'
                            disabled={disabled} onChange={handleInputChange} value={formData.userName} />
                        <div>
                            <label>비밀번호</label>
                        </div>
                        <input className="input" label='' disabled={disabled} name="password" type='password' onChange={handleInputChange} />
                        <div>
                            <label>비밀번호 확인</label>
                        </div>
                        <input className="input" label='' disabled={disabled} name='confirmPassword' type='password' onChange={handleInputChange} />
                        <div>
                            <label>주소</label>
                        </div>
                        <div className="postcode">
                            <input className='postcode-input' label="우편번호" name='postalCode' type='text' disabled={disabled} onChange={handleAddressChange} value={formData.address?.postalCode} />
                            <button className='postcode-button' onClick={handleComplete} disabled={disabled}  >우편번호</button>
                        </div>
                        {postPopup && <Postcode setFormData={setFormData} formData={formData} ></Postcode>}

                        <input className="input" label='주소' name='address1' type='text' disabled={disabled} onChange={handleAddressChange} value={formData.address?.address1} />

                        <input className="input" label='상세주소' name='address2' type='text' disabled={disabled} onChange={handleAddressChange}
                            value={formData.address?.address2}
                        />

                        <div>
                            <label>전화번호</label>
                        </div>
                        <input className="input" label='' name='phoneNumber' type='tel' disabled={disabled} onChange={handleInputChange} value={formData.phoneNumber} />


                        {!disabled &&
                            <button className="user-button" type="submit" disabled={disabled} onClick={toggleShow}  >
                                수정하기
                            </button>}

                        <Link to={ROUTE.ACCOUNT_SIGNOUT.link} style={{ marginTop: "1rem" }}>
                            <p style={{ display: "inline", color: "#999", textAlign: "left" }}>회원 탈퇴</p> </Link>
                    </form>
                </div>

                <MDBModal show={popup} tabIndex='-1' >
                    <MDBModalDialog>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>현재 비밀번호를 입력하세요</MDBModalTitle>
                                <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>
                                <MDBInput name='currentPassword' type='password' onChange={e => setCurrentPassword(e.target.value)} />
                            </MDBModalBody>

                            <MDBModalFooter>
                                <button className="edit-button" onClick={handleSubmit} >수정 완료하기</button>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>

            </div >
        </>
    );
}




export default AccountSecurity;
