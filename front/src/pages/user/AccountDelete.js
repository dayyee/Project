import { Modal } from 'react-bootstrap';
import { useState } from 'react'
import * as Api from "../../utills/api";
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
function AccountDelete() {
    const navigate = useNavigate();
    const [password, setPassword] = useState("")

    //Modal 사용을 위한 State
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (e) => { e.preventDefault(); setShow(true) }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formdata = { password }

        try {
            const res = await Api.post('users/currentPassword', formdata)
            Api.delete('users', res.data._id)

            localStorage.removeItem("token");
            localStorage.removeItem("cart");
            alert("계정정보가 안전하게 삭제되었습니다.")
            navigate('/');

            return;
        } catch (err) {
            alert("비밀번호를 다시 확인해주세요");
            handleClose();
        }

        setPassword("");
    }

    return (<>
        <div className="section">
            <Header title="계정 삭제"></Header>
            <div className="container-center">
                <form className="user-form">
                    <p style={{ textAlign: "center" }}>계정 삭제를 진행합니다</p>
                    <div style={{ margin: "1rem" }}></div>
                    <div>
                        <label>현재 비밀번호</label>
                    </div>
                    <input className="input" label='' name='password' type='password' placeholder="비밀번호를 입력하세요" value={password} onChange={e => setPassword(e.target.value)} />
                    <button className="user-button" onClick={handleShow} >
                        안전하게 계정 삭제하기
                    </button>
                </form>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>계정 삭제</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>회원정보 삭제 시 복구할 수 없습니다. 정말로 삭제하시겠습니까?</Modal.Body>
                    <Modal.Footer>
                        <button className='edit-button' onClick={handleClose}>
                            아니오
                        </button>
                        <button className='edit-button' type="submit" onClick={handleSubmit}>
                            예
                        </button>
                    </Modal.Footer>
                </Modal>

            </div>
        </div>



    </>
    )
}

export default AccountDelete;