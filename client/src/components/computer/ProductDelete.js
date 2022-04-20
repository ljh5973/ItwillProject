import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Typography from '@material-ui/core/Button';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';


function ProductDelete(props) {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true)
  }
  
  const handleClose = () => {
      setOpen(false)
  }
  

    const deleteProduct = (id) => {
          fetch('/api/users/product/'+ id, {
            method: 'DELETE'
          })
          .then(navigate('/computershop2'))
          .catch(err => console.log(err))     
    }




  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>삭제</Button>
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
            <Button variant="contained" color="primary" onClick={(e) => {deleteProduct(props.id)}}>삭제</Button> 
            <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button> 
          </DialogActions>
      </Dialog>
    </div>
    
  )
}

export default ProductDelete