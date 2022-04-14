import React, {useState} from 'react';
import './Product.css';
import Header from '../header/Header';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Product() {

    const [file, setFile] = useState("");

    const fileSelectedHandler = event => {
       setFile(event.target.files[0]);
    }

    const fileUploadHandler = () => {
        axios.post('');
    }

    const [product, setProduct] = useState('')
    return (
        <>
        <Header/>
        <div className="home_containerLine"></div>
        <div className="body">
        <div className="manager">
            <div className="manager_product">
                <ul>  
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
                <div className='product_registration'>
                    <form>
                        <label>
                            상품 이름
                            <input type="text"></input>
                        </label>
                        <label>
                            <span>상품 이미지</span>
                            <input type="file" onChange={fileSelectedHandler} />
                        </label>
                        <label>
                            <span>상품설명</span>
                            <textarea />
                        </label>
                        <label>
                            <span>상품가격</span>
                            <input type="text" />
                        </label>
                        <div className="product_button">
                            <button onClick={fileUploadHandler} type="submit" className="product_submit">등록</button>
                            <button>취소</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
        </div>
        </>
    );
}


export default Product