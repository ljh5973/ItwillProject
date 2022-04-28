import React, {useState, useEffect} from 'react';
import './Profile.css';
import Header from '../header/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();

    const [name, setName] = useState([]);
    const [email, setEmail] = useState([]);
    const [pw, setPw] = useState([]);
    const [addr, setaddr] = useState([]);
    const [secondAddr, setSecondAddr] = useState([]);


    useEffect(() => {    
        axios.get('/api/users/get_user/')
        .then(response => {
            setName(response.data[0].name);
            setEmail(response.data[0].email);
            setPw(response.data[0].pw);
            setaddr(response.data[0].addr);
            setSecondAddr(response.data[0].secondAddr);

            console.log(response.data[0]);
        })
    }, [])

    
    
    

    const onSubmitHandler = () => {
        
        let body = {
            email: email,
            name: name,
            pw: pw,
            addr: addr,
            secondAddr: secondAddr,
        };

        console.log(body);
        
        
        axios.put('/api/users/user_update', body).then(res => {
            if(res.data.success === true) {
                alert('정보 수정 성공');
                navigate('/');
            } else {
                alert('정보 수정 실패');
            }
        });
    }

    const onDeleteHandler = () => {

        let body = {
            email: email,
        }
        console.log(body);
        console.log('123213');


    }
    
    const OnNameHandler = (e) => {
        //setUsers(e.currentTarget.value);
        setName(e.currentTarget.value);
    }
    const OnEmailHandler = (e) => {
        setEmail(e.currentTarget.value);
    }
    const OnPwHandler = (e) => {
        setPw(e.currentTarget.value);
    }
    const OnAddrHandler = (e) => {
        setaddr(e.currentTarget.value);
    }
    const OnSecondAddrHandler = (e) => {
        setSecondAddr(e.currentTarget.value);
    }


    //TODO: 회원정보란 이쁘게
    return (
        <>
        <Header />
        <div className="home_containerLine" />
        <div className="profile">
            <form className='profileList' >
                <label className="profileTitle">이메일</label>
                <input type="email" onChange={OnEmailHandler} value={email} readOnly='readonly' />
                <label className="profileTitle">이름</label>
                <input type="text"  onChange={OnNameHandler} value={name}/>
                <label className="profileTitle">비밀번호</label>
                <input type="text"  onChange={OnPwHandler} value={pw}/>
                <label className="profileTitle">주소</label>
                <input type="text"  onChange={OnAddrHandler} value={addr} className="addr1"/>
                <input type="text"  onChange={OnSecondAddrHandler} value={secondAddr} className="addr2"/>
                <input type="button" className="submit" onClick={onSubmitHandler} value="수정" />
                <input type="button" className="delete" onClick={onDeleteHandler} value="회원탈퇴"/>
                
            </form>


        </div>

        
        
        </>
    );
}




export default Profile