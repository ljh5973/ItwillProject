import axios from "axios";
import Header from '../header/Header';
import './ProductDetail.css';
import React, {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import ProductDelete from "./ProductDelete";


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
                            <span>{p.product_name}</span>
                            
                            <span>배송방법: 무료배송 | 퀵서비스 | 직접수령 | 안전배송 </span>
                            <span>가격 : {p.product_price}</span>
                        </div>
                        <div><img src={p.product_image}/></div>
                        <div className="btnBox">
                            <ProductDelete id={p.id} />
                            <Link to={`/productUpdate/${p.id}`}>
                                <button>수정</button>
                            </Link>
                        </div>
                        <span className="productDesc">{p.product_desc}</span>
                     </div>
                     </>
                 )
             })}
        </div>
        
        </>

    );
}

export default ProductDetail;