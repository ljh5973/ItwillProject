import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './CameraUpload.css';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle } from '@material-ui/core';
import { DialogContent } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';



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
    const [camera_name, setCamera_name] = useState('');
    const [camera_desc, setCamera_desc] = useState('');
    const [camera_price, setCamera_price] = useState('');
    const [user_id, setUser_id] = useState('');
   
    
    const [open, setOpen] = useState(false);
    
    const handleClickOpen = () => {
        setOpen(true)
        axios.get('/api/users/auth')
        .then(res => {
            setUser_id(res.data.name)
            console.log(res.data.name);
        })
    }
    //console.log(user_id);
    
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
        setCamera_name(event.currentTarget.value)
    }

    const onDescHandler = (event) => {
        setCamera_desc(event.currentTarget.value)
    }

    const inputPriceFormat = (str) => {
        const comma = (str) => {
          str = String(str);
          return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
        };
        const uncomma = (str) => {
          str = String(str);
          return str.replace(/[^\d]+/g, "");
        };
        return comma(uncomma(str));
      };

    const onPriceHandler = (event) => {
        setCamera_price(inputPriceFormat(event.currentTarget.value))
    }

    

    const productUpload = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("image", file);
        formData.append("camera_name", camera_name);
        formData.append("camera_desc", camera_desc);
        formData.append("camera_price", camera_price);
        formData.append("email", user_id);
        console.log(user_id);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        axios.post('/api/products/cameraUpload', formData, config)
        .then(response => {
            console.log(response);
            props.stateRefresh();
        })
        setFileName('');
        setCamera_name('');
        setCamera_desc('');
        setCamera_price('');
        setFileImage('');
        setOpen(false);
       
    }

    useEffect(() => {

    
    }, [])
    
    

    return (
        <>         
        <div className="productUpload">
            <Button style={{backgroundColor: "#e65a41", color: "#fff"}} variant="contained" onClick={handleClickOpen}>
                상품 등록하기
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>상품 등록</DialogTitle>
                <DialogContent>
                    <TextField style={{width: "500px", margin: "0 20px"}} label="상품이름" type="text" 
                    value={camera_name} onChange={onNameHandler} /><br/>
                    {/* <TextField style={{width: "500px", margin:"10px 0"}} label="상품내용" type="text" value={product_desc} onChange={onDescHandler} /><br/> */}
                    <textarea style={{margin: "20px 20px 10px 20px", width:"500px", height:"300px"}} placeholder="상품내용" 
                    value={camera_desc} onChange={onDescHandler} />
                    <TextField style={{width: "500px",  margin: "0 20px"}} label="상품가격" type="text" 
                    value={camera_price} onChange={onPriceHandler} /><br/>
                    <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" 
                    onChange={fileUploadHandler} /><br/>
                    <label htmlFor="raised-button-file">
                        <Button style={{marginLeft: "20px", backgroundColor: "#e65a41", color: "#fff"}} variant="contained" component="span" name="file">
                            {fileName === "" ?  "이미지 선택" : fileName}
                        </Button>
                        <div style={{marginTop:"10px", marginLeft:"20px"}}>{fileImage && (
                            <img src={fileImage} style={{width: "200px"}} />
                        )}</div>
                    </label><br/>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" style={{backgroundColor: "#e65a41", color:"#fff"}} onClick={productUpload}>등록</Button>
                    <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>           
        </div>
        </>
    );
}

export default withStyles(styles)(ProductUpload)