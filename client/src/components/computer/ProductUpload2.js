import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';
import './ProductUpload.css';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle } from '@material-ui/core';
import { DialogContent } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { TextareaAutosize } from '@material-ui/core';


const styles = theme => ({
    hidden: {
        display: 'none'
    }
})

function ProductUpload(props) {
    const navigate = useNavigate();
    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileImage, setFileImage] = useState('');
    const [product_name, setProduct_name] = useState('');
    const [product_desc, setProduct_desc] = useState('');
    const [product_price, setProduct_price] = useState('');

   
    
    const [open, setOpen] = useState(false);
    
    const handleClickOpen = () => {
        setOpen(true)
    }
    
    const handleClose = () => {
        setOpen(false)
    }
    
    const {classes} = props;


    const fileUploadHandler = (event) => {
        console.log(event.target.files[0]);
        setFile(event.target.files[0]);
        setFileName(event.target.value);
        setFileImage(URL.createObjectURL(event.target.files[0]));
        console.log(event.target.files[0])
        console.log(event.target.value)
        console.log(URL.createObjectURL(event.target.files[0]))
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
            props.stateRefresh();
        })
        setFileName('');
        setProduct_name('');
        setProduct_desc('');
        setProduct_price('');
        setFileImage('');
        setOpen(false);
       
    }

    return (
        <>         
        <div className="productUpload">
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                상품 등록하기
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>상품 등록</DialogTitle>
                <DialogContent>
                    <TextField style={{width: "500px", margin: "0 20px"}} label="상품이름" type="text" 
                    value={product_name} onChange={onNameHandler} /><br/>
                    {/* <TextField style={{width: "500px", margin:"10px 0"}} label="상품내용" type="text" value={product_desc} onChange={onDescHandler} /><br/> */}
                    <textarea style={{margin: "20px 20px 10px 20px", width:"500px"}} placeholder="상품내용" 
                    value={product_desc} onChange={onDescHandler} />
                    <TextField style={{width: "500px",  margin: "0 20px"}} label="상품가격" type="text" 
                    value={product_price} onChange={onPriceHandler} /><br/>
                    <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" 
                    onChange={fileUploadHandler} /><br/>
                    <label htmlFor="raised-button-file">
                        <Button style={{marginLeft: "20px"}} variant="contained" color="primary" component="span" name="file">
                            {fileName === "" ?  "이미지 선택" : fileName}
                        </Button>
                        <div style={{marginTop:"10px", marginLeft:"20px"}}>{fileImage && (
                            <img src={fileImage} style={{width: "200px"}} />
                        )}</div>
                    </label><br/>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={productUpload}>등록</Button>
                    <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>           
        </div>
        </>
    );
}

export default withStyles(styles)(ProductUpload)