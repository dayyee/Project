import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import * as Api from "../../utills/api";
import Product from '../../components/Product'
import Header from '../../components/Header'

function ProductList() {
    const currencySymbol = "KRW"
    const { category } = useParams()
    const [products, setProducts] = useState(undefined);

    /// api /products/:categoryTitle
    const init = async () => {
        const res = await Api.get(`products/category/${category}`);
        const data = await res.data;
        setProducts(data);
    };
    useEffect(() => {
        init();
    }, []);

    return (<>
        <div className='section'>
            <Header title={category}></Header>
            <div className="product-container" >
                {Array.isArray(products) && products.map(item => (
                    <Product
                        key={item._id}
                        itemId={item._id}
                        title={item.productName}
                        price={item.price.toLocaleString('en-US', { style: 'currency', currency: currencySymbol })}
                        img={"https://res.cloudinary.com/moteam/image/upload/" + item.imageKey + ".png"}
                        productInfo={item.productInfo}>
                    </Product>))}
            </div>
        </div>
    </>
    );
}

export default ProductList;