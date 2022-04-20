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
import './SignUpModal.css';

const SignUpModal = ({show, onHide}) => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [nameMessage, setNameMessage] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

    const [isName, setIsName] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  
    const [popup, setPopup] = useState(false);
    const [address, setAddress] = useState("");
    const [zip, setZip] = useState("");
    const [secondAddr, setSecondAddr] = useState("");


    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
        if (event.target.value.length < 2 || event.target.value.length > 5) {
            setNameMessage('2글자 이상 5글자 미만으로 입력해주세요.')
            setIsName(false)
          } else {
            setNameMessage('올바른 이름 형식입니다')
            setIsName(true)
          }
    }
    const onEmailHandler = (event) => {
        
        const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        const emailCurrent = event.target.value
        setEmail(emailCurrent)
        if (!emailRegex.test(emailCurrent)) {
            setEmailMessage('이메일 형식이 틀렸습니다.')
            setIsEmail(false)
          } else {
            setEmailMessage('올바른 이메일 형식입니다.')
            setIsEmail(true)
          }
    }

    const onPasswordHandler = (event) => {
        
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        const passwordCurrent = event.target.value
        setPassword(passwordCurrent)

        if (!passwordRegex.test(passwordCurrent)) {
        setPasswordMessage('숫자+영문+특수문자로 8자리 이상 입력해주세요')
        setIsPassword(false)
        } else {
        setPasswordMessage('안전한 비밀번호입니다.')
        setIsPassword(true)
        }
    }

    const onConfirmPassword = (event) => {
        const passwordConfirmCurrent = event.target.value
        setConfirmPassword(passwordConfirmCurrent)

        if (password === passwordConfirmCurrent) {
            setPasswordConfirmMessage('비밀번호가 같습니다.')
            setIsPasswordConfirm(true)
        } else {
            setPasswordConfirmMessage('비밀번호가 틀립니다')
            setIsPasswordConfirm(false)
        }
    
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
                    document.querySelector(".modal").style.display="none";
                    document.querySelector(".fade").style.display="none";
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
            className="modal"
            centered
            >
            <Container className="container">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Sign up
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={onSubmitHandler}>
                    <Form.Group className="mb-3 formbox" controlId="formBasicEmail">
                        <Form.Label className="formtext">이름</Form.Label>
                        <Form.Control type="text" value={name} onChange={onNameHandler}/>
                        {name.length > 0 && <span className={`message ${isName ? 'success' : 'error'}`}>{nameMessage}</span>}          
                    </Form.Group>                
                    <Form.Group className="mb-3 formbox" controlId="formBasicEmail">
                        <Form.Label className="formtext">이메일</Form.Label>
                        <Form.Control type="email" value={email} onChange={onEmailHandler}/>
                        {email.length > 0 && <span className={`message ${isEmail ? 'success' : 'error'}`}>{emailMessage}</span>}          
                    </Form.Group>
                    <Form.Group className="mb-3 formbox" controlId="formBasicEmail">
                        <Form.Label className="formtext">주소</Form.Label>
                        <Form.Control value={zip} onChange={onZipHandler} style={{width:"100px"}} type="text" />          
                        <button type="button" onClick={()=> {
                            setPopup(!popup)
                        }} style={{position:"absolute", top:"50%", left:"120px"}}>주소 검색</button>
                        { popup && <KaKao adress={address} setAddress={setAddress} setZip={setZip} />}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                   
                        <Form.Control type="text" value={address} onChange={onAddressHandler}/>          
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      
                        <Form.Control type="text" value={secondAddr} onChange={onSecondAddrHandler}  />          
                    </Form.Group>
                
                    <Form.Group className="mb-3 formbox" controlId="formBasicPassword">
                        <Form.Label className="formtext">비밀번호</Form.Label>
                        <Form.Control type="password" value={password} onChange={onPasswordHandler}/>
                        {password.length > 0 && (
                            <span className={`message ${isPassword ? 'success' : 'error'}`}>{passwordMessage}</span>
                        )}
                    </Form.Group>
                    
                    <Form.Group className="mb-3 formbox" controlId="formBasicPassword">
                        <Form.Label className="formtext">비밀번호 재확인</Form.Label>
                        <Form.Control type="password" value={confirmPassword} onChange={onConfirmPassword}/>
                        {confirmPassword.length > 0 && (
                            <span className={`message ${isPasswordConfirm ? 'success' : 'error'}`}>{passwordConfirmMessage}</span>
                        )}
                    </Form.Group>
                    <Button variant="secondary" type="submit" className="my-3" style={{width: "100%"}}
                    disabled={!(isName && isEmail && isPassword && isPasswordConfirm)}>
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