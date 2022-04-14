import React from 'react';
import Header from './components/header/Header';
import './Checkout.css';
import Subtotal from './components/Subtotal';


function Checkout() {
    return (
        <>
        <Header/>
        <div>
            <div className="checkout">
                <div className="checkout-left">
                    <img className="checkout_ad" src="" alt="" />
                    <div>
                        <h2 className="checkout_title">
                            장바구니 입니다.
                        </h2>
                    </div>
                </div>
                <div className="checkout-right">
                    <Subtotal />

                </div>
            </div>
        </div>
        </>
    );
}

export default Checkout;