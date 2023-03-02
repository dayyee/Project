import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../utills/route'
import Header from '../../components/Header'


const Admin = () => {
    return (<section className="section">
        <Header title="Admin"></Header>
        <div className="container">

            <Link to={ROUTE.ADMIN_ORDERS.link}>
                <div className="account_button_container" >
                    <button className="account_button" ><p className="main-name">Order Manage</p>
                        <p className="sub-name">주문 관리</p></button>
                </div>
            </Link>

            <Link to={ROUTE.ADMIN_USERS.link}>
                <div className="account_button_container" >
                    <button className="account_button" ><p className="main-name">User Manage</p>
                        <p className="sub-name">회원 관리</p></button>
                </div>
            </Link>

            <Link to={ROUTE.PRODUCT_ADD.link}>
                <div className="account_button_container" >
                    <button className="account_button" ><p className="main-name">Add Product</p>
                        <p className="sub-name">제품 판매</p></button>
                </div>
            </Link>

            <Link to={ROUTE.CATEGORY_ADD.link}>
                <div className="account_button_container" >
                    <button className="account_button" ><p className="main-name">Add Category</p>
                        <p className="sub-name">카테고리 추가</p></button>
                </div>
            </Link>

            <Link to={ROUTE.CATEGORY_MANAGE.link}>
                <div className="account_button_container" >
                    <button className="account_button" ><p className="main-name">Category Manage</p>
                        <p className="sub-name">카테고리 조회</p></button>
                </div>
            </Link>


        </div>
    </section >
    )
}


export default Admin;

