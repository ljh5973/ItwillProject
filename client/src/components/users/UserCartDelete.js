import axios from 'axios';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@material-ui/core/Button';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

function UserCartDelete(props) {

    const navi = useNavigate();
    const [open, setOpen] = useState(false);
    const deleteProduct = () => {
        console.log(props.cartId)
        let id = props.cartId
        axios.get('/api/users/cartDelete' + id)
        .then(res => {
            props.userCart();
        })

    }

    const handleClickOpen = () => {
        setOpen(true)
    }
    
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <>
        <div>
        <Button style={{backgroundColor:"#e65a41", color: "#fff"}} variant="contained" onClick={handleClickOpen}>삭제</Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                삭제
            </DialogTitle>
            <DialogContent>
                <Typography gutterBottom>
                선택한 상품 정보를 삭제하시겠습니까?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button style={{backgroundColor:"#e65a41", color: "#fff"}} variant="contained" onClick={deleteProduct}>삭제</Button> 
                <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button> 
            </DialogActions>
        </Dialog>
        </div>

        </>
    );
}



export default UserCartDelete