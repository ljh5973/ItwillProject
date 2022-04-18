import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductUpdate from './ProductUpdate';


function ProductDelete(props) {

    const navigate = useNavigate();

    const deleteProduct = (id) => {
        if (window.confirm("삭제하시겠습니까?")) {
          fetch('/api/users/product/'+ id, {
            method: 'DELETE'
          })
          .then(navigate('/computershop'))
          .catch(err => console.log(err))
        } else {

        }

       
    }




  return (
    <div>
      <button onClick={(e) => {deleteProduct(props.id)}}>삭제</button>
    </div>
    
  )
}

export default ProductDelete