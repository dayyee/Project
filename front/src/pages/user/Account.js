import React from 'react';
import { Link } from 'react-router-dom';
import "./Account.css"
import { ROUTE } from '../../utills/route'
import Header from '../../components/Header'


const Account = () => {
    return (<section className="section">
        <Header title="Account"></Header>
        <div className="container">
            <Link to={ROUTE.ACCOUNT_ORDERS.link}>
                <div className="account_button_container" >
                    <button className="account_button" ><p className="main-name">Order History</p>
                        <p className="sub-name">주문조회</p></button>
                </div>
            </Link>

            <Link to={ROUTE.MYACCOUNT.link}>
                <div className="account_button_container" >
                    <button className="account_button" ><p className="main-name">My Account</p>
                        <p className="sub-name">회원정보 관리</p></button>
                </div>
            </Link>

            {/* <Link to={ROUTE.PRODUCT_ADD.link}>
                <div className="account_button_container" >
                    <button className="account_button" ><p className="main-name">Add Product</p>
                        <p className="sub-name">제품 판매</p></button>
                </div>
            </Link> */}

            {/* <Link to={ROUTE.ACCOUNT_SIGNOUT.link}>
                <div className="account_button_container" >
                    <button className="account_button" ><p className="main-name">Delete Account</p>
                        <p className="sub-name">회원 탈퇴</p></button>
                </div>
            </Link> */}


        </div>
    </section >
    )
}


export default Account;

