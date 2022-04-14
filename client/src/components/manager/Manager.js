import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Header from '../header/Header';
import './Manager.css';


function Manager() {

    const [product, setProduct] = useState('')

    return (
        <>
        <Header/>
        <div className="home_containerLine"></div>
        <div className="body">
        <div className="manager">
            <div className="manager_product">
                <ul className="product_list">  
                    <li onClick={()=>setProduct(['Computer', 'Camera'])}>상품등록</li>
                    
                    <li>상품수정</li>
                </ul>
                <div className="product_menu">
                    <Link to="/product" className="link_box">
                        {product[0]}
                    </Link>
                </div>
                <div className="product_menu1">
                    {product[1]}
                </div>
            </div>

        </div>
        </div>
        </>
    );
}






export default Manager;