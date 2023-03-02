import * as Api from "../../utills/api";
import React, { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';
import Header from '../../components/Header'
import { DeleteOrder } from "../user/DeleteOrder";
import Pagination from "react-js-pagination"

function OrderManage() {
    const [orders, setOrders] = useState(undefined);
    const [orderId, setOrderId] = useState(undefined);
    const [render, setRender] = useState(true);
    const [total, setTotal] = useState(undefined);
    const [page, setPage] = useState(1);

    // Page 당 10개의 데이터를 불러옴
    const perPage = 10;

    // Modal State  
    const [mode, setMode] = useState(undefined);
    const modeOff = () => { setMode(undefined) };

    const orderMap = (orders) => {
        const userOrders = orders.map((item, index) => {
            return (
                <tr key={index} >
                    <th>{item.createdAt.split("T")[0]}</th>
                    <th>{item.orderTitle}</th>
                    <th>{item.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</th>
                    <th>
                        <select id={item._id} value={item.status} onChange={handleStatusChange}>
                            <option value="상품 준비중">상품 준비중</option>
                            <option value="상품 배송중">상품 배송중</option>
                            <option value="배송완료">배송완료</option>
                        </select>
                    </th>
                    <th><button className="manage-button" id={item._id} onClick={handleOrderCancel}>삭제</button></th>
                </tr>)
        })

        return userOrders;
    }
    const init = async () => {
        const res = await Api.get(`admin/orders/?page=${page}&perPage=${perPage}`)
        // console.log(res.data)
        setOrders(() => res.data.orders)
        setTotal(() => res.data.total)
    }

    const handlePageChange = (currentPage) => {

        if (page === currentPage)
            return;
        setPage(currentPage)
        setRender(true);
    };

    useEffect(() => {
        if (render) {
            init();
            setRender(false);
        }
    }, [mode, render, page]);

    const handleOrderCancel = (e) => {
        e.preventDefault();

        setOrderId(() => e.target.id)
        setMode("DELETE")
    }

    const handleStatusChange = async (e) => {
        const formdata = {
            status: e.target.value,
        }
        await Api.patch(`admin/orders/${e.target.id}`, formdata)
        setRender(true);
    }
    return (<>
        <div className="section">
            <Header title="전체 주문 관리"></Header>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>주문 일자</th>
                        <th>주문 정보</th>
                        <th>주문 총액</th>
                        <th>배송 상태 관리</th>
                        <th>주문 삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {typeof orders === 'object' && orderMap(orders)}
                </tbody>
            </Table>
            {mode === "DELETE" && <DeleteOrder setRender={setRender} modeOff={modeOff} orderId={orderId} />}

            <Pagination
                itemClass="page-item"
                activePage={page}
                itemsCountPerPage={perPage}
                totalItemsCount={total}
                pageRangeDisplayed={5}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={handlePageChange}
                hideFirstLastPages
            />


        </div>
    </>)

}

export default OrderManage;