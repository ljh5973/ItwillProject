import React, {useState} from "react";
import {Modal, Button, Form, Container} from 'react-bootstrap';
// 부트 스트랩 연결 후 필요한 것들 불러옴
import "bootstrap/dist/css/bootstrap.min.css";
// 부트 스트랩 css 연결
import { GoogleLogin } from 'react-google-login';
// 구글 로그인 연동
import HorizonLine from "../../components/HorizonLine";
import {registerUser} from '../../_action/user_action';
import {useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";
import KaKao from '../../KaKao';

const SignUpModal = ({show, onHide}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
  
    const [popup, setPopup] = useState(false);
    const [address, setAddress] = useState("");
    const [zip, setZip] = useState("");
    const [secondAddr, setSecondAddr] = useState("");


    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPassword = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onZipHandler = (event) => {
        setZip(event.currentTarget.value)
    }

    const onAddressHandler = (event) => {
        setAddress(event.currentTarget.value)
    }

    const onSecondAddrHandler = (event) => {
        setSecondAddr(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if(password !== confirmPassword) {
            return alert("비밀번호가 틀립니다.");
        }

        let body = {
            name: name,
            email: email,
            password: password,
            zip:zip,
            address: address,
            secondaddr: secondAddr
        }

        dispatch(registerUser(body))
            .then(response => {
                if(response.payload.success) {
                    alert('회원가입 성공')
                    navigate('/');
                } else {
                    alert('Error')
                }
            })

    }


    return (
        <>    
        <Modal
            show={show}
            onHide={onHide}
            dialogClassName="modal-90w"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Container>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Sign up
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={onSubmitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>이름</Form.Label>
                        <Form.Control type="text" value={name} onChange={onNameHandler}/>          
                    </Form.Group>                
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>이메일</Form.Label>
                        <Form.Control type="email" value={email} onChange={onEmailHandler}/>          
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>주소</Form.Label>
                        <Form.Control value={zip} onChange={onZipHandler} style={{width:"100px"}} type="text" />          
                        <button type="button" onClick={()=> {
                            setPopup(!popup)
                        }} style={{position:"absolute", top:"34%", left:"130px"}}>주소 검색</button>
                        { popup && <KaKao adress={address} setAddress={setAddress} setZip={setZip} />}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                   
                        <Form.Control type="text" value={address} onChange={onAddressHandler}/>          
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      
                        <Form.Control type="text" value={secondAddr} onChange={onSecondAddrHandler}  />          
                    </Form.Group>
                
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>비밀번호</Form.Label>
                        <Form.Control type="password" value={password} onChange={onPasswordHandler}/>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>비밀번호 재확인</Form.Label>
                        <Form.Control type="password" value={confirmPassword} onChange={onConfirmPassword}/>
                    </Form.Group>
                    <Button variant="secondary" type="submit" className="my-3" style={{width: "100%"}}>
                        Sign Up
                    </Button>
                </Form>
                </Modal.Body>
                
            </Container>
        </Modal>
        </>
    );
}




export default SignUpModal