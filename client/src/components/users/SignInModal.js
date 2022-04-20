import React, {useState, useEffect} from "react";
import {Modal, Button, Form, Container} from 'react-bootstrap';
// 부트 스트랩 연결 후 필요한 것들 불러옴
import "bootstrap/dist/css/bootstrap.min.css";
// 부트 스트랩 css 연결
import { GoogleLogin } from 'react-google-login';
// 구글 로그인 연동
import HorizonLine from "../HorizonLine";
import {useDispatch} from 'react-redux';
import { loginUser, googleLogin } from '../../_action/user_action';
import { useNavigate } from "react-router-dom";

import config from '../../config/google.json';



const SignInModal = ({show, onHide}) => {

    const REST_API_KEY = "0bddd89dc68b3e23c70ddd16883b90bf";
    const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
    const dispatch = useDispatch();
    const navigate = useNavigate();
   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const closeModal=()=>{
        const a=document.querySelector(".modal");
        a.style.display="none";
        const b= document.querySelector(".fade");
        b.style.display="none";
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            email: email,
            password: password
        }

        dispatch(loginUser(body))
            .then(response => {

                console.log(response);
                if(response.payload.loginSuccess) {
                    alert('로그인 성공');
                    navigate('/');
                    closeModal();
                } else {
                    alert('Error');
                }
            })

    }




    const handleGoogleLogin= async (result)=>{
        const profileObj=result;
        console.log(profileObj);

        dispatch(googleLogin(result))
            .then(response=>{
                console.log(response);
                if(response.payload){
                    console.log(response.payload);
                }else{
                    alert('Error');
                }
            })
    }

    const handleGoogleFailure= async (googleData)=>{
        console.log(googleData);
    }
  
   
    return (
        <Modal
            show={show}
            onHide={onHide}
            dialogClassName="modal-90w"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="modal"
            >
            <Container>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Sign In
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={onSubmitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>이메일</Form.Label>
                        <Form.Control type="email" value={email} onChange={onEmailHandler}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>비밀번호</Form.Label>
                        <Form.Control type="password" value={password} onChange={onPasswordHandler}/>
                    </Form.Group>                 
                    <Button variant="secondary" type="submit" className="my-3" style={{width: "100%"}}>
                        Sign In
                    </Button>
                    <HorizonLine text={"OR"} />
                    
                    <GoogleLogin style={{padding: "100px"}}
                        clientId={config.web.client_id}
                        buttonText="Log in with Google"
                        onSuccess={handleGoogleLogin}
                        onFailure={handleGoogleFailure}
                        cookiePolicy={'single_host_origin'}
                    />
                    <a href={KAKAO_AUTH_URL}><img style={{marginLeft: "62px", height:"45px", marginTop:"10px", marginBottom:"10px"}} src="../../img/kakao_login_medium_narrow.png" alt="kakao button"/></a>
                </Form>
                </Modal.Body>
                
            </Container>
        </Modal>
    );
}




export default SignInModal