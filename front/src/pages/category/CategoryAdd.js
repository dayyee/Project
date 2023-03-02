import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import * as Api from "../../utills/api";
import axios from 'axios'
import Header from '../../components/Header'

function CategoryAdd() {
    const [fileData, setFileData] = useState("");
    const navigate = useNavigate();

    const handlefileData = (e) => {
        setFileData(e.target.files[0])
    }

    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        themeClass: '',
        imageKey: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const validationForm = ({ title, description, themeClass }) => {
        if (title !== '' && description !== '' && themeClass !== '' && fileData !== '')
            return true;
        return false;
    }

    async function addCategory(formdata) {

        try {
            const newData = await Api.post("categorys", formdata)
            alert("category 등록이 완료되었습니다.");
            navigate(`/category/manage`)

        } catch (err) {
            alert("이미 있는 category 이름입니다.")
        }

    }

    // 클라우디너리에 image를 저장하고 imageKey를 formdata에 저장
    async function addPicture(imgdata) {
        try {
            const res = await axios.post(process.env.REACT_APP_FILE_UPLOAD_URL, imgdata)
            return res.data.public_id;

        } catch (err) {
            alert("이미지 업로드 에러")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(inputs)

        const validated = validationForm(inputs)
        if (!validated) {
            alert('카테고리를 추가하려면 빈 칸이 없어야합니다.')
            return;
        }

        const imgdata = new FormData();
        imgdata.append("file", fileData);
        imgdata.append("upload_preset", process.env.REACT_APP_FILE_UPLOAD_PRESET);
        const public_id = await addPicture(imgdata)

        let formdata = inputs
        formdata = { ...inputs, "imageKey": public_id }
        await addCategory(formdata)

        e.target.reset();
    }

    return (
        <div className="section">
            <Header title="카테고리 추가"></Header>
            <div className="container">
                <form className="register-category-form-box" id="registerCategoryForm" onSubmit={handleSubmit}>

                    <label>카테고리 이름</label>
                    <input className='input' type="text" placeholder="Men Clothes" autoComplete="on" name="title" onChange={handleChange} />

                    <label>카테고리 설명</label>
                    <input className='input' type="text" name='description' placeholder="센세이셔널한 봄, 여름 코디" autoComplete="on" onChange={handleChange} />

                    <div >
                        <label style={{ marginRight: "3px" }}>카테고리 테마</label>
                        <select as="select" className={"notification " + inputs.themeClass} name="themeClass" onChange={handleChange}>
                            <option value="">테마를 선택해 주세요.</option>

                            <option
                                value="is-primary is-light"
                                style={{ backgroundColor: '#ebfffc', color: '#00947e' }}
                            >
                                light skygreen
                            </option>

                            <option
                                value="is-link is-light"
                                style={{ backgroundColor: '#eff1fa', color: '#3850b7' }}
                            >
                                light purple
                            </option>

                            <option
                                value="is-info is-light"
                                style={{ backgroundColor: '#eff5fb', color: '#296fa8' }}
                            >
                                light blue
                            </option>

                            <option
                                value="is-success is-light"
                                style={{ backgroundColor: '#effaf5', color: '#257953' }}
                            >
                                light green
                            </option>

                            <option
                                value="is-warning is-light"
                                style={{ backgroundColor: '#fffaeb', color: '#946c00' }}
                            >
                                light yellow
                            </option>

                            <option
                                value="is-danger is-light"
                                style={{ backgroundColor: '#feecf0', color: '#cc0f35' }}
                            >
                                light pink
                            </option>

                            <option
                                value="is-primary"
                                style={{ backgroundColor: '#00d1b2', color: '#fff' }}
                            >
                                skygreen
                            </option>

                            <option
                                value="is-link"
                                style={{ backgroundColor: '#485fc7', color: '#fff' }}
                            >
                                blue
                            </option>

                            <option
                                value="is-info"
                                style={{ backgroundColor: '#3e8ed0', color: '#fff' }}
                            >
                                skyblue
                            </option>

                            <option
                                value="is-success"
                                style={{ backgroundColor: '#48c78e', color: '#fff' }}
                            >
                                green
                            </option>

                            <option
                                value="is-warning"
                                style={{
                                    backgroundColor: '#ffe08a',
                                    color: 'rgba(0, 0, 0, 0.7)',
                                }}
                            >
                                yellow
                            </option>

                            <option
                                value="is-danger"
                                style={{ backgroundColor: '#f14668', color: '#fff' }}
                            >
                                red
                            </option>
                        </select>
                    </div>


                    <label style={{ marginTop: "1rem" }}>카테고리 사진</label>

                    <input
                        type="file"
                        name="image-file"
                        accept=".png, .jpeg, .jpg"
                        onChange={handlefileData}
                    />
                    <div style={{ marginTop: "2rem" }}></div>

                    <button type="submit" className="edit-button" >카테고리 추가하기</button>

                </form>
            </div >
        </div >
    );
}

export default CategoryAdd;