import React, { useState, useEffect } from 'react';
import Postcode from '../../utills/Postcode';
import * as Api from "../../utills/api";
import { Modal } from 'react-bootstrap';

export function ModifyOrder({ setRender, modeOff, order }) {
    const [inputs, setInputs] = useState({});
    const [postPopup, setPostPopup] = useState(undefined);

    const handlePopup = (e) => {
        e.preventDefault();
        setPostPopup(true)
    }

    useEffect(() => {
        const initialInputs =
            Object.keys(order).reduce((obj, key) => {
                if (key === 'address') {
                    obj[key] = order[key];
                }
                return obj;
            }, {})
        setInputs(initialInputs.address)
    }, [])


    const handleChange = e => {
        const { name, value } = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onlyNumberInput = e => {
        const { value } = e.target;
        if (Number(value) == value)
            return true;
        return false;
    }
    const handleModify = async () => {
        try {
            const formdata = {
                address: inputs
            }
            const res = await Api.patch(`orders/${order._id}`, formdata);
            alert("배송지정보가 수정되었습니다.");
            setRender(true);
            modeOff();
        }
        catch (err) {
            alert(err)
            modeOff();
        }
    }

    return (
        <Modal show onHide={modeOff}>
            <Modal.Header closeButton>
                <Modal.Title>배송지 정보 변경</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ height: "80vh" }}>
                {
                    typeof inputs === "object" &&
                    <div>
                        <div>
                            <div>
                                <label>이름</label>
                            </div>
                            <div>
                                <input className="input" type="text" name="receiverName" value={inputs.receiverName} onChange={handleChange} />
                            </div>
                        </div>

                        <div>
                            <div>
                                <label>연락처</label>
                            </div>
                            <div>
                                <input className="input" type="text" name="receiverPhoneNumber" value={inputs.receiverPhoneNumber} onChange={e => {
                                    if (onlyNumberInput(e)) {
                                        handleChange(e);
                                    }
                                }} />
                            </div>
                        </div>

                        <div>
                            <label>
                                주소
                            </label>
                        </div>
                        <div className="postcode">
                            <input className="postcode-input" type="text" name="postalCode" value={inputs.postalCode} />

                            <div type="button" className="postcode-button"
                                onClick={handlePopup}>
                                주소찾기
                            </div>
                        </div>
                        <div>
                            <input className="input" type="text" name="address1" value={inputs.address1} />
                            <input className="input" type="text" name="address2" value={inputs.address2} onChange={handleChange} />
                        </div>

                    </div>

                }
                {postPopup && <Postcode setInputs={setInputs} />}
            </Modal.Body>
            <Modal.Footer>
                <button className='edit-button' onClick={modeOff}>
                    취소
                </button>
                <button className='edit-button' variant="primary" type="submit" onClick={handleModify} >
                    수정
                </button>
            </Modal.Footer>
        </Modal>
    );
}
