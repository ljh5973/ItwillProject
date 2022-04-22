import React, {useState, useEffect} from 'react';
import './Profile.css';
import Header from '../header/Header';
import axios from 'axios';

function Profile() {

    const [users, setUsers] = useState([]);
    useEffect(() => {    
        axios.get('/api/users/test/')
        .then(response => {setUsers(response.data[0])
            console.log(response.data);
        })
    }, [])

    console.log(users.name);
    
    

    const onSubmitHandler = () => {

        let body = {
            email: users.email,
            name: users.name,
            pw: users.pw,
            addr: users.addr,
            secondAddr: users.secondAddr,
        };

        axios.put('/api/users/user_update', (req,res) => {

        })
    }



    //console.log(users.name);
    // useEffect(() => {
    //     const request = axios.get( '/api/users/test').then(res => {
    //         //console.log('email: %s', res.data);
    //         //console.log(typeof(res.data));
    //         // users.name = res.data;
            

            
    //     })
        
    // }, [])
    //console.log('users.name: ' + users.name);
    
    const test = (e) => {
        setUsers(e.currentTarget.value);
    }

    
    return (
        <>
        <Header />
        <div className="home_containerLine" />
        <div className="profile">
            <form className='profileList' >
                <label className="profileTitle">이메일</label>
                <input type="email" onChange={test} value={users.email} />
                <label className="profileTitle">이름</label>
                <input type="text" value={users.name}/>
                <label className="profileTitle">비밀번호</label>
                <input type="text" value={users.pw}/>
                <label className="profileTitle">주소</label>
                <input type="text"  value={users.addr} className="addr1"/>
                <input type="text"  value={users.secondAddr} className="addr2"/>
                <input type="button" className="submit" onClick={onSubmitHandler} value="수정" />
                
            </form>


        </div>

        
        
        </>
    );
}




export default Profile