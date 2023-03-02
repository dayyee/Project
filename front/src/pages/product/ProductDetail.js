import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import * as Api from "../../utills/api";
import Header from '../../components/Header'
import './ProductDetail.css'
import { DeleteProduct } from './DeleteProduct';
import { ModifyProduct } from './ModifyProduct';

function ProductDetail() {
    const currencySymbol = 'KRW'
    const { id } = useParams()
    const [item, setItem] = useState(undefined);
    const navigate = useNavigate();
    const isAdmin = localStorage.getItem("isAdmin")
    const [render, setRender] = useState(true);

    // Modal State
    const [mode, setMode] = useState(undefined);
    const modeOff = () => { setMode(undefined) };

    const init = async () => {
        const res = await Api.get(`products/${id}`);
        const data = await res.data;
        setItem(data);
    };

    useEffect(() => {
        if (render) {
            init();
            setRender(false);
        }
    }, [mode, render]);


    const handleAddToCart = () => {
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProductIndex = currentCart.findIndex(
            (cart) => cart._id === item._id
        );

        if (existingProductIndex !== -1) {
            // 이미 존재하면 alert, 카트로 가기
            alert("장바구니에 이미 상품이 존재합니다.");
            navigate('/cart');
            return;
        }

        //local storage에 처음에는 qty 1로 세팅해서 보내줌 (수량 옵션 없으므로)
        localStorage.setItem('cart', JSON.stringify([...currentCart, { ...item, quantity: 1 }]));
        alert("장바구니에 상품을 추가했습니다.");

        //cart 로 이동하면서 prop으로 상품 정보 (item) 전달
        navigate('/cart', { state: { item } });


    };



    return (<>
        {/* <h1>{id}</h1> */}

        <div className='section'>

            <Header></Header>
            <div className="container-center">
                {(typeof item === "object") &&
                    <div className="tile" >
                        <img className="product-detail-img" src={"https://res.cloudinary.com/moteam/image/upload/" + item.imageKey + ".png"} alt={item.productName}></img>
                        <div className="product-detail-description">
                            <div className="product-detail-name" >
                                {item.productName}
                            </div>
                            <div className="product-detail-price" >
                                {item.price.toLocaleString('en-US', { style: 'currency', currency: currencySymbol })}
                            </div>
                            <div style={{ borderBottom: "1px solid black", marginBottom: "2rem" }} > </div>
                            <div className="product-detail-info" >
                                {item.productInfo}
                            </div>
                            <div style={{ marginTop: "2rem" }} > </div>

                            <button className='purchase-button' style={{ display: "block" }} onClick={handleAddToCart} >Add to Cart</button>

                            <div style={{ marginTop: "2rem" }} > </div>
                            {isAdmin && <>
                                <button className='edit-button' style={{ display: "inline", marginRight: "1rem" }} onClick={() => setMode("MODIFY")}>수정</button>
                                <button className='edit-button' style={{ display: "inline" }} onClick={() => setMode("DELETE")}>삭제</button>
                                {mode === "DELETE" && <DeleteProduct modeOff={modeOff} productId={id} />}
                                {mode === "MODIFY" && <ModifyProduct setRender={setRender} modeOff={modeOff} product={item} />}
                            </>
                            }

                        </div>
                    </div>}
            </div>
        </div>
    </>
    );
}

export default ProductDetail;
