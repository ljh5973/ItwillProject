import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../header/Header';
import './UserCart.css';
import UserCartDelete from './UserCartDelete';


function UserCart() {
    const [userId, setUserId] = useState('');
    const [userCartList, setUserCartList] = useState([]);


    useEffect(() => {
        axios.get('/api/users/auth')
        .then(res => {
            console.log("eee", res.data.name)
            setUserId(res.data.name);
        })

        let data = {
            email: userId
        }
        axios.post('/api/users/cartList', data)
        .then(res => {
            setUserCartList(res.data)
        })
    }, [userId])


    return (
        <>
        <Header />
        <div className="home_containerLine"></div>
        <div className="userCart">
            <div className="cartList">
                <span className='userCartList'>Cart List</span>
                <table className="table">
                    <thead>
                        <tr>
                            <th>상품 이름</th>
                            <th>이미지</th>
                            <th>상세 설명</th>
                            <th>수량</th>
                            <th>가격</th>
                            <th>삭제</th>
                        </tr>
                    </thead>
                    <tbody>      
                        {userCartList.map(c => {
                            return(
                                <tr>          
                                    <td>{c.product_name}</td>       
                                    <td><img className="cartImg" src={c.product_image}/></td>                                                 
                                    <td>{c.product_desc.length < 40 ? c.product_desc : c.product_desc.slice(0, 40) + '...'}</td>                            
                                    <td>{c.num}</td>                            
                                    <td>{c.product_price * c.num}</td>  
                                    <td><UserCartDelete cartId={c.id} /></td>                          
                                </tr>
                            );
                            
                        })}      
                      
                    </tbody>

                </table>
            </div>
        </div>

        
        </>
    );
}




export default UserCart