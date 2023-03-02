import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Order.css';
import Postcode from '../../utills/Postcode'
import * as Api from "../../utills/api";
import Header from '../../components/Header'

function Order() {

    const currencySymbol = 'KRW';
    const shippingCost = 3000;

    const navigate = useNavigate();
    const location = useLocation();


    const cart = location.state.cart
    let subTotal = 0;
    cart.forEach((item) => {
        subTotal += item.price * item.quantity;
    });
    const productId = cart.map(item => item._id);

    const orderTitle = cart.reduce((acc, obj) => acc + obj.productName + '/' + obj.quantity + '개' + '\n', '');


    const [postPopup, setPostPopup] = useState(false);
    const [formData, setFormData] = useState(
        {
            userName: "",
            address: {
                address1: "",
                address2: "",
                postalCode: ""
            },
            phoneNumber: "",
            _id: ""
        }
    );
    const [shippingInfo, setShippingInfo] = useState({});
    const [useUserInfo, setUseUserInfo] = useState(false);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await Api.get('users');
                setFormData({ ...res.data });
            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    }, []);

    const handleComplete = (e) => {
        e.preventDefault();
        setPostPopup(!postPopup);
    }



    const handleInputChange = e => {
        const { name, value } = e.target;
        setShippingInfo(prev => (
            { ...prev, [name]: value }));
    };


    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo(prev => ({
            ...prev,
            address: {
                ...prev.address,
                [name]: value
            }
        }))
    }

    const handleCheckboxChange = event => {
        setUseUserInfo(event.target.checked);

        if (event.target.checked) {
            setShippingInfo({ ...formData });
        } else {
            // setShippingInfo({});
        }
    };


    const validateForm = ({ userName, phoneNumber, address }) => {
        if (userName === undefined || phoneNumber === undefined || address === undefined || address?.address1 === undefined || address?.address2 === undefined || address?.postalCode === undefined) {
            return "배송지 정보를 모두 입력해주세요.";
        }
        if (userName.length === 0 || phoneNumber.length === 0 || address?.address1.length === 0 || address?.address2.length === 0 || address?.postalCode.length === 0) {
            return "배송지 정보를 모두 입력해주세요.";
        }
        return true;
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        // "order" 엔드포인트로 post 요청함.

        const validated = validateForm(shippingInfo);
        if (typeof validated === "string") {
            alert(validated);
            return;
        }


        const order = {
            userId: shippingInfo._id,
            productId: productId,
            totalPrice: subTotal + shippingCost,
            address: {
                address1: shippingInfo.address?.address1,
                address2: shippingInfo.address?.address2,
                postalCode: shippingInfo.address?.postalCode,
                receiverName: shippingInfo.userName,
                receiverPhoneNumber: shippingInfo.phoneNumber,
            },
            orderTitle: orderTitle,
        };

        try {
            const response = await Api.post("orders", order);
            localStorage.removeItem("cart");
            alert('주문이 완료되었습니다!')
            navigate('/order/complete');

        } catch (err) {
            alert(err.response.data.reason);
        }
    };




    return (
        <>


            <div className='section'>
                <Header title='Order Summary'></Header>
                <div className="container-center">
                    <div className="tile">
                        <div className='delivery-tile'>
                            <div className="delivery-info">
                                <p>Order info</p>
                                <div>
                                    <label>이름</label>
                                </div>
                                <div>
                                    <input className="input" type="text" name="userName" value={formData.userName} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label>연락처</label>
                                </div>
                                <div>
                                    <input className="input" type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
                                </div>
                            </div>
                        </div>

                        <div className='delivery-tile'>
                            <div className="delivery-info">
                                <div style={{ display: "flex" }}>
                                    <p >Shipping</p>
                                    <input type="checkbox" style={{ width: "15px", height: "15px", marginLeft: "1rem", marginTop: "3px" }} checked={useUserInfo} onChange={handleCheckboxChange}></input>
                                    <div>주문자 정보와 동일</div>
                                </div>
                                <div>
                                    <label>이름</label>
                                </div>
                                <div>
                                    <input className="input" type="text" placeholder='받는 분 이름을 입력해 주세요.' name="userName" value={shippingInfo.userName} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label>연락처</label>
                                </div>
                                <div>
                                    <input className="input" type="text" placeholder='-없이 입력해 주세요.' name="phoneNumber" value={shippingInfo.phoneNumber} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label>주소</label>
                                </div>
                                <div>
                                    {postPopup && <Postcode setFormData={setShippingInfo} formData={shippingInfo} ></Postcode>}
                                    <div className="postcode">
                                        <input className="postcode-input" type="text" placeholder='주소찾기를 클릭해주세요.' onChange={handleAddressChange} name="postalCode" value={shippingInfo.address?.postalCode} />
                                        <div type="button" className="postcode-button" onClick={handleComplete}> 주소찾기</div>
                                    </div>
                                    <input className="input" type="text" placeholder='주소' name="address1" value={shippingInfo.address?.address1} onChange={handleAddressChange} /><br />
                                    <input className="input" type="text" placeholder='상세주소를 입력해주세요.' name="address2" onChange={handleAddressChange} value={shippingInfo.address?.address2} />
                                </div>
                                <div>
                                    <label>요청사항</label>
                                </div>
                                <div>
                                    <select id="requestSelectBos">
                                        <option value="0">
                                            배송시 요청사항을 선택해 주세요.
                                        </option>
                                        <option value="1" className="select-option">
                                            직접 수령하겠습니다.
                                        </option>
                                        <option value="2" className="select-option">
                                            배송 전 연락바랍니다.
                                        </option>
                                        <option value="3" className="select-option">
                                            부재 시 경비실에 맡겨주세요.
                                        </option>
                                        <option value="4" className="select-option">
                                            부재 시 문 앞에 놓아주세요.
                                        </option>
                                        <option value="5" className="select-option">
                                            부재 시 택배함에 넣어주세요.
                                        </option>
                                        <option value="6" className="select-option">
                                            직접 입력
                                        </option>
                                    </select>
                                </div>
                                <div>
                                    <input
                                        className="input"
                                        id="customRequest"
                                        type="text"
                                        maxLength="50"
                                        placeholder="최대 50자 입력이 가능합니다."
                                        autoComplete='on' />
                                </div>
                            </div>
                        </div>
                    </div></div>
                <div className="container-center">
                    <div className="tile">
                        <div className="order-summary " >
                            <div className="order-header"><p>결제정보</p></div>
                            <div className="order-info" >
                                <div className="info" style={{ display: "inline" }}>  주문 상품 </div>

                                {/* <ul> */}
                                {cart.map((item, index) => (
                                    //  style={index === 0 ? { display: 'inline', textAlign: "right" } : { textAlign: "right" }}
                                    <div key={item._id} style={{ textAlign: 'right' }}>
                                        {item.productName} / {item.quantity}개
                                    </div>
                                ))}
                                {/* </ul> */}

                                <div className="info">   <p>상품 총 금액</p> <p id="productsTotal">{subTotal.toLocaleString('en-US', { style: 'currency', currency: currencySymbol })}</p></div>
                                <div className="info"><p>배송비</p> <p id="deliveryFee">{shippingCost.toLocaleString('en-US', { style: 'currency', currency: currencySymbol })}</p> </div>
                            </div>
                            <div className="order-total" ><p>총 결제금액</p> <p>{(subTotal + shippingCost).toLocaleString('en-US', { style: 'currency', currency: currencySymbol })}</p> </div>


                            <div className="purchase" >
                                <button className="purchase-button" onClick={handleSubmit} >구매하기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Order;