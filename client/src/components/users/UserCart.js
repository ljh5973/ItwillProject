import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../header/Header';
import './UserCart.css';
import UserCartDelete from './UserCartDelete';
import CircularProgress from '@material-ui/core/CircularProgress';


function UserCart() {
    const [userId, setUserId] = useState('');
    const [userCartList, setUserCartList] = useState([]);
    const [cameraCartList, setCameraCartList] = useState([]);
    const [progress, setProgress] = useState(0);
    const [isLoad, setIsLoad] = useState(false);

    const  userCart = () => {
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

        axios.post('/api/users/cameraCartList', data)
        .then(res => {
            setCameraCartList(res.data)
        })
    }

    

    useEffect(() => {
        setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 1));
          }, 20);
        userCart();
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
                        {userCartList !=0 ? userCartList.map(c => {
                            return(                              
                                <tr>  
                                    <td style={{width:"150px"}}>{c.product_name}</td>       
                                    <td style={{width:"150px"}}><img className="cartImg" src={c.product_image}/></td>                                                 
                                    <td>{c.product_desc.length < 40 ? c.product_desc : c.product_desc.slice(0, 40) + '...'}</td>                            
                                    <td style={{width:"100px"}}>{c.num}</td>                            
                                    <td style={{width:"300px"}}>{c.product_price * c.num}</td> 
                                    <td style={{width: "120px"}}><UserCartDelete userCart={userCart} cartId={c.id} /></td>                          
                                </tr> 
                            );
                            
                        }):
                        <tr>
                            <td colSpan="6" align="center">
                                <CircularProgress className={progress} variant="indeterminate" value={progress}/>
                            </td>
                        </tr> 
                        }
                       
                        {cameraCartList.map(c => { 
                            return(
                               
                                <tr>          
                                    <td style={{width:"150px"}}>{c.camera_name}</td>      
                                    <td style={{width:"150px"}}><img className="cartImg" src={c.camera_image}/></td>                                                 
                                    <td>{c.camera_desc.length < 40 ? c.camera_desc : c.camera_desc.slice(0, 40) + '...'}</td>                            
                                    <td style={{width:"100px"}}>{c.num}</td>                            
                                    <td style={{width:"300px"}}>{c.camera_price * c.num}</td>
                                    <td style={{width: "120px"}}><UserCartDelete userCart={userCart} cartId={c.id} /></td>                          
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