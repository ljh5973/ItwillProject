import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';
import './CameraUpdate.css';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle } from '@material-ui/core';
import { DialogContent } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
function CameraUpload() {

    const navigate = useNavigate();
    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileImage, setFileImage] = useState('');
    const [camera_name, setCamera_name] = useState('');
    const [camera_desc, setCamera_desc] = useState('');
    const [camera_price, setCamera_price] = useState('');
    const {id} = useParams();


    const fileUploadHandler = (event) => {
        console.log(event.target.files[0]);
        setFile(event.target.files[0]);
        setFileName(event.target.value);
        console.log(event.target.value);
        setFileImage(URL.createObjectURL(event.target.files[0]));
    }

    const onNameHandler = (event) => {
        setCamera_name(event.currentTarget.value)
    }

    const onDescHandler = (event) => {
        setCamera_desc(event.currentTarget.value)
    }

    const onPriceHandler = (event) => {
        setCamera_price(event.currentTarget.value)
    }
   
    const productUpload = (event) => {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append("image", file);
        formData.append("camera_name", camera_name);
        formData.append("camera_desc", camera_desc);
        formData.append("camera_price", camera_price);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        axios.post('/api/products/cameraUpdate/' + id, formData, config)
        .then(response => {
            console.log(response.data);
            navigate('/camerashop');
        })
    }

    useEffect(() => {
        axios.get('/api/products/updateCamera/' + id)
        .then(res => {
            setCamera_name(res.data[0].camera_name)
            setCamera_desc(res.data[0].camera_desc)
            setCamera_price(res.data[0].camera_price)
            setFileImage(res.data[0].camera_image)
        })
    }, [])

    return (
        <>
        <Header />
        
        <div className="home_containerLine" />       
        <div className="productUpdate">           
            <form onSubmit={productUpload} className="productBox">           
                <DialogTitle className="productTitleName">상품수정</DialogTitle>
                    <Button className="uploadBtn" type="submit">수정</Button>
                    <DialogContent>
                        <TextField style={{width: "100%"}} value={camera_name} onChange={onNameHandler} label="상품 이름" type="text" />
                        <textarea placeholder="상품 내용을 입력해주세요" style={{width: "100%", height: "400px", marginLeft: "0", marginTop: "8px"}}
                        value={camera_desc} onChange={onDescHandler} />        
                        <TextField style={{width: "100%"}} value={camera_price} onChange={onPriceHandler} label="상품 가격" />
                        <input style={{display:"none"}} accept="image/*" id="raised-button-file" type="file" 
                        onChange={fileUploadHandler} /><br/>
                        <label htmlFor="raised-button-file">
                        <Button style={{marginLeft: "0", marginTop:"20px", backgroundColor:"#e65a41", color:"#fff"}} variant="contained" component="span" name="file">
                            {fileName === "" ?  "이미지 선택" : fileName}
                        </Button>
                        <div style={{marginTop:"10px", marginLeft:"0"}}>{fileImage && (
                            <img src={fileImage} style={{width: "300px"}} />
                        )}</div>
                    </label><br/>
                    </DialogContent>
            </form>  
        </div>
        <div style={{}} className="updateFooter1"><img src='../img/footerlogo.webp'/>
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

export default CameraUpload

// return (
//     <>
//     <Header />
    
//     <div className="home_containerLine" />       
//     <div className="productUpdate">           
//         <form onSubmit={productUpload} className="productBox">           
//             <div className="title">상품수정</div>
//                 <button type="submit" className="upload">저장</button>
//                 <input className="input" type="text" value={product_name} onChange={onNameHandler} placeholder="상품 이름을 입력해주세요" />            
//                 <textarea placeholder="상품 내용을 입력해주세요" style={{width: "100%", height: "400px", marginLeft: "0", marginTop: "8px"}}
//                  value={product_desc} onChange={onDescHandler} />        
//                 <input className="input" type="text" placeholder="상품 가격을 입력해주세요" value={product_price} onChange={onPriceHandler} />
//                 <label style={{marginBottom:"10px"}}>이미지</label>
//                 <input type="file" onChange={fileUploadHandler} />
//                 <div style={{marginTop:"10px"}}>{fileImage && (
//                     <img src={fileImage} style={{width: "200px"}} />
//                     )}</div>
           
            
//         </form>  
//     </div>
//     </>
// );