import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Api from "../../utills/api";
import { Button, Modal } from 'react-bootstrap';

export function DeleteProduct({ modeOff, productId }) {
    const navigate = useNavigate();

    const handleProductDelete = async () => {
        try {
            const res = await Api.delete('products', productId);
            alert("등록된 제품이 삭제되었습니다.");
            navigate(-1);
            modeOff();
        }
        catch (err) {
            alert("접근 권한이 없습니다.");
            modeOff();
        }
    };

    return (
        <Modal show onHide={modeOff}>
            <Modal.Header closeButton>
                <Modal.Title>제품 삭제</Modal.Title>
            </Modal.Header>
            <Modal.Body>제품 삭제 시 복구할 수 없습니다. 정말로 삭제하시겠습니까?</Modal.Body>
            <Modal.Footer>
                <button className='edit-button' variant="secondary" onClick={modeOff}>
                    아니오
                </button>
                <button className='edit-button' variant="primary" onClick={handleProductDelete}>
                    예
                </button>
            </Modal.Footer>
        </Modal>
    );
}
