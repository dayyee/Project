import React, { useState, useEffect } from 'react';
import * as Api from "../../utills/api";
import axios from 'axios'
import { Form, Button, Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import './CategoryManage.css'
import { DeleteCategory } from './DeleteCategory';
import { ModifyCategory } from './ModifyCategory';
import Header from '../../components/Header'

function CategoryManage() {
    const [categories, setCategories] = useState(undefined)
    const [category, setCategory] = useState(undefined);
    const [render, setRender] = useState(true);

    // Mode 설정
    const [mode, setMode] = useState(undefined)
    const modeOff = () => { setMode(undefined) };

    // Pageload시 category를 불러옴
    const init = async () => {
        const res = await Api.get('categorys')
        setCategories(() => res.data);
    }

    // Category Mapping
    const cateMap = (categories) => {
        const newCategories = categories.map((item, index) => {
            return (
                <div className="message media category-item" key={index}>
                    <div className="media-left">
                        <figure className="image">
                            <img src={"https://res.cloudinary.com/moteam/image/upload/" + item.imageKey + ".png"} alt="" />
                        </figure>
                    </div>
                    <div className="media-content">
                        <div>
                            <p className="title">{item.title}</p>
                            <p className="description">{item.description}</p>
                            <button className="edit-button" name="MODIFY" id={item._id} onClick={handleModeChange}>수정</button>
                            {'    '}
                            <button className="edit-button" style={{ marginRight: "2rem" }} name="DELETE" onClick={handleModeChange} id={item._id}>삭제</button>
                        </div>
                    </div>
                </div>

            )
        })
        return newCategories
    }

    useEffect(() => {
        if (render) {
            init();
            setRender(false)
        }
    }, [mode, render])

    const handleModeChange = (e) => {
        e.preventDefault();

        setCategory(() => categories.find(item => item._id === e.target.id));
        setMode(e.target.name)
    }

    return (<>
        <div className="section">
            <Header title="카테고리 관리"></Header>
            <div>
                {typeof categories === 'object' && cateMap(categories)}
                {mode === "DELETE" && <DeleteCategory setRender={setRender} modeOff={modeOff} categoryId={category._id} />}
                {mode === "MODIFY" && <ModifyCategory setRender={setRender} modeOff={modeOff} category={category} />}
            </div>
        </div>
    </>);
}

export default CategoryManage;
