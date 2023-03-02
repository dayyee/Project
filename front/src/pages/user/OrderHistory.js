import * as Api from "../../utills/api";
import React, { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';
import Header from '../../components/Header'
import { DeleteOrder } from "./DeleteOrder";
import { ModifyOrder } from "./ModifyOrder";

function OrderHistory() {
    const [orders, setOrders] = useState(undefined);
    const [orderId, setOrderId] = useState(undefined);
    const [item, setItem] = useState(undefined);
    const [render, setRender] = useState(true);

    // Modal State
    const [mode, setMode] = useState(undefined);
    const modeOff = () => { setMode(undefined) };

    const init = async () => {
        const res = await Api.get('orders')
        setOrders(() => res.data)
    }

    const orderMap = (orders) => {
        const userOrders = orders.map((item, index) => {
            return (
                <tr key={index} >
                    <th>{item.createdAt.split("T")[0]}</th>
                    <th>{`${item.orderTitle}`}</th>
                    <th>{item.status}</th>
                    <th><button className="manage-button" id={item._id} hidden={item.status !== "상품 준비중"} onClick={handleOrderModify}>변경</button></th>
                    <th><button className="manage-button" hidden={item.status !== "상품 준비중"} id={item._id} onClick={handleOrderCancel}>취소</button></th>
                </tr>)
        })

        return userOrders;
    }

    useEffect(() => {
        if (render) {
            init();
            setRender(false);
        }
    }, [mode, render]);

    const handleOrderCancel = (e) => {
        e.preventDefault();

        setOrderId(() => e.target.id)
        setMode("DELETE")
    }

    const handleOrderModify = (e) => {
        e.preventDefault();
        setItem(() => orders.find(item => item._id === e.target.id))
        setMode("MODIFY")
    }

    return (<>
        <div className="section">
            <Header title="주문 조회"></Header>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>날짜</th>
                        <th>주문 상품</th>
                        <th>배송</th>
                        <th>배송지 정보 변경</th>
                        <th>주문 취소</th>
                    </tr>
                </thead>
                <tbody>
                    {typeof orders === 'object' && orderMap(orders)}
                </tbody>
                {mode === "DELETE" && <DeleteOrder setRender={setRender} modeOff={modeOff} orderId={orderId} />}
                {mode === "MODIFY" && <ModifyOrder setRender={setRender} modeOff={modeOff} order={item} />}
            </Table>
        </div>
    </>)

}

export default OrderHistory