import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Api from "../../utills/api";
import { Form, Button, Container, Row, Col, InputGroup, FormControl, Modal } from 'react-bootstrap';

export function ModifyProduct({ setRender, modeOff, product }) {
    const [inputs, setInputs] = useState({});

    // input initialize
    useEffect(() => {
        const initialInputs =
            Object.keys(product).reduce((obj, key) => {
                if (key === 'productName' || key === 'productInfo' || key === 'price') {
                    obj[key] = product[key];
                }
                return obj;
            }, {})
        setInputs(initialInputs)
    }, [])


    const handleChange = e => {
        const { name, value } = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleModify = async () => {
        try {
            const formdata = inputs
            const res = await Api.patch(`products/${product._id}`, formdata);
            alert("제품이 수정되었습니다.");
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
                <Modal.Title>제품 수정</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    typeof inputs === "object" &&
                    <div>
                        <form onSubmit={handleModify}>
                            <div>
                                <label>제품 이름</label>
                            </div>
                            <div>
                                <input className="input" type="text" name="productName" defaultValue={inputs.productName} onChange={handleChange} />
                            </div>
                            <div>
                                <label>제품 설명</label>
                            </div>
                            <div>
                                <textarea className="input" style={{
                                    width: "100%",
                                    height: "100px"
                                }} name="productInfo" defaultValue={inputs.productInfo} onChange={handleChange} />
                            </div>
                            <div>
                                <label>Price</label>
                            </div>
                            <div>
                                <input className="input" type="number" name="price" defaultValue={inputs.price} onChange={handleChange} />
                            </div>
                        </form>
                    </div>
                }
            </Modal.Body>
            <Modal.Footer>
                <button className='edit-button' variant="secondary" onClick={modeOff}>
                    취소
                </button>
                <button className='edit-button' variant="primary" type="submit" onClick={handleModify} >
                    수정
                </button>
            </Modal.Footer>
        </Modal>
    );
}
