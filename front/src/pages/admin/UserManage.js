import * as Api from "../../utills/api";
import React, { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';
import Header from '../../components/Header'
import { DeleteUser } from "./DeleteUser";
import Pagination from "react-js-pagination"
import './UserManage.css'

function UserManage() {
    const [users, setUsers] = useState(undefined);
    const [userId, setUserId] = useState(undefined);
    const [render, setRender] = useState(true);
    const [total, setTotal] = useState(undefined);
    const [page, setPage] = useState(1);


    // Page 당 10개의 데이터를 불러옴
    const perPage = 10;

    // Modal State
    const [mode, setMode] = useState(undefined);
    const modeOff = () => { setMode(undefined) };

    const userMap = (users) => {
        const newUserList = users.map((item, index) => {
            return (
                <tr key={index} >
                    <th>{item.createdAt.split("T")[0]}</th>
                    <th>{item.email}</th>
                    <th>{item.userName}</th>
                    <th>
                        <select value={item.role} name={item._id} onChange={handleRoleChange}>
                            <option value="admin">관리자</option>
                            <option value="basic-user">회원</option>
                        </select>
                    </th>
                    <th><button className="manage-button" id={item._id} onClick={handleUserDelete}>계정 삭제</button></th>
                </tr>)
        })

        return newUserList;
    }

    const init = async () => {
        const res = await Api.get(`admin/users?page=${page}&perPage=${perPage}`)
        // console.log(res)
        setUsers(() => res.data.users)
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

    const handleUserDelete = (e) => {
        e.preventDefault();

        setUserId(() => e.target.id)
        setMode("DELETE")
    }

    const handleRoleChange = async (e) => {
        const formdata = { "role": e.target.value };
        await Api.patch(`admin/users/${e.target.name}`, formdata)
        setRender(true);
    }
    return (<>
        <div className="section">
            <Header title="회원 관리"></Header>
            <Table striped hover>
                <thead>
                    <tr>
                        <th>가입 날짜</th>
                        <th>이메일</th>
                        <th>이름</th>
                        <th>권한</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {typeof users === 'object' && userMap(users)}
                </tbody>
            </Table>

            {mode === "DELETE" && <DeleteUser setRender={setRender} modeOff={modeOff} userId={userId} />}

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

export default UserManage;