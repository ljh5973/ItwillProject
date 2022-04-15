import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
function ProductUpload() {
    const navigate = useNavigate();
    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileImage, setFileImage] = useState('');
    const [product_name, setProduct_name] = useState('');
    const [product_desc, setProduct_desc] = useState('');
    const [product_price, setProduct_price] = useState('');


    const fileUploadHandler = (event) => {
        console.log(event.target.files[0]);
        setFile(event.target.files[0]);
        setFileName(event.target.value);
        setFileImage(URL.createObjectURL(event.target.files[0]));
    }

    const onNameHandler = (event) => {
        setProduct_name(event.currentTarget.value)
    }

    const onDescHandler = (event) => {
        setProduct_desc(event.currentTarget.value)
    }

    const onPriceHandler = (event) => {
        setProduct_price(event.currentTarget.value)
    }

    const productUpload = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("image", file);
        formData.append("product_name", product_name);
        formData.append("product_desc", product_desc);
        formData.append("product_price", product_price);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        axios.post('/api/users/productUpload', formData, config)
        .then(response => {
            console.log(response);
            navigate('/computershop');
        })
    }

    return (
        <>
        <form onSubmit={productUpload}>
            <label>상품이름</label>
            <input type="text" value={product_name} onChange={onNameHandler} />
            <label>상품설명</label>
            <input type="text" value={product_desc} onChange={onDescHandler} />
            <label>상품가격</label>
            <input type="text" value={product_price} onChange={onPriceHandler} />
            <label>이미지</label>
            <input type="file" onChange={fileUploadHandler} />
            <div>{fileImage && (
                <img src={fileImage} style={{width: "200px"}} />
            )}</div>
            <button type="submit">저장</button>
        </form>  
        </>
    );
}

export default ProductUpload