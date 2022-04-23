import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function UserCartDelete(props) {

    const navi = useNavigate();
    const deleteProduct = () => {
        console.log(props.cartId)
        let id = props.cartId
        axios.get('/api/users/cartDelete' + id)
        .then(res => {
            window.location.reload();
        })

    }
    return (
        <>
        <button onClick={deleteProduct}>삭제</button>

        </>
    );
}



export default UserCartDelete