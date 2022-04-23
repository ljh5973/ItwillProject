import axios from "axios";
import Header from '../header/Header';
import './ProductDetail.css';
import React, {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import ProductDelete from "./ProductDelete";
import { Button } from "@material-ui/core";
import ProductCart from './ProductCart';


const ProductDetail = () => {

    const [product, setProduct] = useState([]);
    const {id} = useParams();
    const [uploadUser_id, setUploadUser_id] = useState('');
    const [user_id, setUser_id] = useState('');
    const [num, setNum] = useState(1);

    useEffect(() => { 
        axios.get('/api/users/auth')
        .then(res => {
            console.log(res.data.name);
            setUser_id(res.data.name)
        })
        
        axios.get('/api/users/productDetail/'+ id)
        .then(response => {setProduct(response.data)
            console.log(response.data);
            setUploadUser_id(response.data[0].email)
        })
        console.log(product);
    }, [])

    return (
        <>
        <Header />
        <div className="home_containerLine" />
        <div className="productDetail">
             {product.map(p => {
                 return (
                     <>
                     <div className="productList">
                        <div className="productListBox">
                            <span className="productName">{p.product_name}</span>
                            <span className="productPrice">가격 : {p.product_price * num}</span>
                            <span className="productline">사은품: 2년 무상출장 AS 키보드+마우스</span>
                            <span className="productline">구매혜택: 이달의 신용카드 | 혜택세이프업플러스</span>
                            <span className="productline">배송방법: 무료배송 | 퀵서비스 | 직접수령 | 안전배송 </span>
                            
                            <select className="selectBtn" onChange={({target: {value}}) => setNum(Number(value))}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div><img src={p.product_image}/></div>
                        {uploadUser_id === user_id ? <div className="btnBox">
                            <ProductDelete id={p.id} />
                            <Link to={`/productUpdate/${p.id}`} className="link_box">
                                <Button variant="contained" style={{backgroundColor:"#e65a41", color:"#fff"}}>수정</Button>
                            </Link>
                        </div> : ""}
                        <ProductCart cartNum={num} productId={id} userId={user_id} />
                        <span className="productDesc">{p.product_desc}</span>
                     </div>
                     </>
                 )
             })}
        </div>
        <div className="detailFooter"><img src='../img/footerlogo.webp'/>
        <span className="footerDesc">서울특별시 강남구 테헤란로 124 4층 (역삼동, 삼원타워) 아이티윌</span>
        <div className="imgList">
            <img src="../img/facebook.webp"/>
            <img src="../img/instagram.webp"/>
            <img src="../img/twitter.webp"/>
        </div>
                                    </div>
        
        </>

    );
}

export default ProductDetail;