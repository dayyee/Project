import React, { useState, useEffect } from "react";
import { Link, } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import './Product.css'
import { ROUTE } from '../utills/route'



function Product({ title, price, img, productInfo, itemId }) {

    // const params = useParams();
    return (
        <div className='item-card' key={itemId}>
            <Link to={`/product/detail/${itemId}`}>
                <div className="item-image-container">
                    <img src={img} className="item-image" ></img></div>
                <div className="item-title">{title}</div>
                <div className="item-price">{price}</div>
            </Link >
        </div >
    )
}


export default Product