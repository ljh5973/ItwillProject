import axios from "axios";
import Header from '../header/Header';
import './ProductDetail.css';
import React, {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import ProductDelete from "./ProductDelete";
import { Button } from "@material-ui/core";

const ProductDetail = () => {

    const [product, setProduct] = useState([]);
    const {id} = useParams();
    useEffect(() => {    
        axios.get('/api/users/productDetail/'+ id)
        .then(response => {setProduct(response.data)
            console.log(response.data);
            
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
                            <span className="productPrice">가격 : {p.product_price}</span>
                            <span className="productline">사은품: 2년 무상출장 AS 키보드+마우스</span>
                            <span className="productline">구매혜택: 이달의 신용카드 | 혜택세이프업플러스</span>
                            <span className="productline">배송방법: 무료배송 | 퀵서비스 | 직접수령 | 안전배송 </span>
                            
                        </div>
                        <div><img src={p.product_image}/></div>
                        <div className="btnBox">
                            <ProductDelete id={p.id} />
                            <Link to={`/productUpdate/${p.id}`} className="link_box">
                                <Button variant="contained" style={{backgroundColor:"#e65a41", color:"#fff"}}>수정</Button>
                            </Link>
                        </div>
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