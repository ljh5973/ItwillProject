import React, { useState } from 'react';
import Typography from '@material-ui/core/Button';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import axios from 'axios';
import ProductDetail from './ProductDetail';


function ProductCart(props) {
    const [open, setOpen] = useState(false);
    const userId = props.userId
    const productId = props.productId
    const cartNum = props.cartNum
    // const [num, setNum] = useState(1);

    const handleClose = () => {
        setOpen(false)
    }

    const handleClickOpen = () => {

        setOpen(true)
    }
    let data = {
        email: userId,
        id: productId,
        num: props.cartNum
    }

    console.log(productId)
    console.log(userId)
    const cartAdd = () => {
        setOpen(false);


        axios.post('/api/products/cart', data)
        .then(res => {
            console.log(res.data);
        })
    }
    

    


    return (
        <>
        
        <div style={{position:"absolute", top:"370px", right:"50px"}}>
        {/* <select className="selectBtn" onChange={({target: {value}}) => setNum(Number(value))}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select> */}
            <Button style={{backgroundColor:"#e65a41", color: "#fff"}} onClick={handleClickOpen} variant="contained">담기</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    장바구니
                </DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                    상품이 장바구니에 담겼습니다.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    
                    <Button style={{backgroundColor:"#e65a41", color: "#fff"}} variant="contained" onClick={cartAdd}>확인</Button> 
                </DialogActions>
            </Dialog>
        </div>
        
        
        
        </>

    );
}





export default ProductCart