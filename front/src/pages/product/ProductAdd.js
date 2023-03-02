import React, { useState, useEffect } from 'react';
import axios from 'axios'
import * as Api from "../../utills/api";
import Header from '../../components/Header'

function ProductAdd() {
    const [categories, setCategories] = useState(undefined)
    const [fileData, setFileData] = useState(undefined);
    const [inputs, setInputs] = useState(undefined);

    // Pageload시 category를 불러옴
    const init = async () => {
        const res = await Api.get('categorys')
        setCategories(() => res.data)
    }

    const cateMap = (categories) => {
        const newCategories = categories.map((item, index) => {
            return <option key={index} value={item._id} className={"notification " + item.themeClass}>{item.title}</option>
        })
        return newCategories
    }

    const initialInputs = {
        productName: "",
        categoryId: "",
        productInfo: "",
        imageKey: "",
        price: ""
    }

    const handlefileData = (e) => {
        setFileData(e.target.files[0])
    }

    useEffect(() => {
        init();
        setInputs(initialInputs)
    }, [])


    const handleChange = e => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    // product validation
    const validationForm = ({ productName, categoryId, productInfo, price }) => {
        if (productName !== "" && categoryId !== "" && productInfo !== "" && fileData !== "" && price !== "")
            return true;
        return false;
    }

    async function addProduct(formdata) {
        try {
            const newData = await Api.post("products", formdata)
            alert("제품 등록이 완료되었습니다.");
        }
        catch (err) {
            alert("이미 있는 제품 이름입니다.")
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
            alert('제품을 추가하려면 빈 칸이 없어야합니다.')
            return;
        }

        const imgdata = new FormData();
        imgdata.append("file", fileData);
        imgdata.append("upload_preset", process.env.REACT_APP_FILE_UPLOAD_PRESET);

        const public_id = await addPicture(imgdata);

        const formdata = { ...inputs, "imageKey": public_id };
        await addProduct(formdata)

        e.target.reset();
        setInputs(() => initialInputs)
    }

    return (
        <div className="section">
            <Header title="제품 등록"></Header>
            <div className="container">
                <form className="register-category-form-box" onSubmit={handleSubmit}>

                    <div>
                        <label>제품 이름</label>
                    </div>

                    <div>
                        <input className="input" type="text" placeholder="제품 이름을 입력하세요" name="productName" onChange=
                            {handleChange} />
                    </div>


                    <div>
                        <label>카테고리</label>
                    </div>

                    <select name="categoryId" onChange={handleChange}>
                        <option value="">카테고리를 선택하세요</option>
                        {typeof categories === 'object' && cateMap(categories)}
                    </select>


                    <div style={{ marginTop: "1rem" }}>
                        <label>제품 설명</label>
                    </div>

                    <div>
                        <textarea
                            placeholder='제품 설명을 입력하세요'
                            rows={5} style={{ width: "100%" }} name='productInfo' onChange={handleChange} />
                    </div>

                    <div>
                        <label>이미지 사진</label>
                    </div>

                    <div>
                        <input
                            type="file"
                            name="image-file"
                            accept=".png, .jpeg, .jpg"
                            onChange={handlefileData}
                        />
                    </div>

                    <div>
                        <div style={{ marginTop: "1rem" }}>
                            <label>가격</label>
                        </div>
                        <input className="input" type="number" placeholder="0" name="price" onChange={handleChange} />

                    </div>
                    <div>
                        <button type="submit" className="edit-button" style={{ marginTop: "1rem" }} id="addCategoryButton">제품 추가하기</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProductAdd;