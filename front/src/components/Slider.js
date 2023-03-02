import React, { useState, useEffect } from 'react';
import './Slider.css';
import * as Api from "../utills/api";
import Category from './Category'
import Footer from './Footer'

function Slider() {
    const [category, setCategory] = useState(undefined);

    const init = async () => {
        const res = await Api.get("categorys");
        const data = await res.data;
        setCategory(data);
    };
    useEffect(() => {
        init();
    }, []);

    // const [index, setIndex] = useState(0);

    // const handleSelect = (selectedIndex, e) => {
    //     setIndex(selectedIndex);
    // };

    return (
        // <div className='main-slider' style={{ display: 'block', width: 1000, padding: 100 }}>
        //     <Carousel activeIndex={index} onSelect={handleSelect}>
        //         {Array.isArray(category) && category.map(item => (
        //             <Carousel.Item interval={1500}>
        //                 <Link to={`/product/list/${item.title}`} >
        //                     <div>
        //                         <h3>{item.title}</h3>
        //                         <p>{item.description}</p>
        //                         <img className="slider-img"
        //                             src={"https://res.cloudinary.com/moteam/image/upload/" + item.imageKey + ".png"}
        //                             alt="카테고리 이미지" />
        //                     </div>
        //                 </Link>
        //             </Carousel.Item>
        //         ))}
        //     </Carousel>
        // </div>

        <>
            <div className='section'>
                <div className="category-container" >
                    {Array.isArray(category) && category.map(item => (
                        <Category
                            key={item._id}
                            itemId={item._id}
                            title={item.title}
                            img={"https://res.cloudinary.com/moteam/image/upload/" + item.imageKey + ".png"}
                        >
                        </Category>))}
                </div>

            </div>
            <Footer></Footer>
        </>
    );
}
export default Slider;


