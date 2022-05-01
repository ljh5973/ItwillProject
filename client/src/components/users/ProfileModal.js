import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Container } from 'react-bootstrap';
import KaKao from './KaKao2';
import axios from "axios";
import './ProfileModal.css';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../_action/user_action';
const ProfileModal = ({ show, onHide }) => {

  // 정보받아오기

  const [authSuccess, setAuthSuccess] = useState(false);
  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [pw, setPw] = useState([]);
  const [addr, setaddr] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    axios.get('/api/users/get_user')
      .then(response => {
        setName(response.data[0].name);
        setEmail(response.data[0].email);
        setPw(response.data[0].pw);
        setaddr(response.data[0].addr);
        setSecondAddr(response.data[0].secondAddr);
        setZip(response.data[0].zip);


      
        console.log(response.data[0]);
      })
  }, [])



  // submit Btn disable
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  // 주소
  const [popup, setPopup] = useState(false);
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [secondAddr, setSecondAddr] = useState("");

  const onZipHandler = (event) => {
    setZip(event.currentTarget.value)
  }

  const onAddressHandler = (event) => {
    setAddress(event.currentTarget.value)
  }

  const onSecondAddrHandler = (event) => {
    setSecondAddr(event.currentTarget.value)
  }
  const closeModal = () => {
    const a = document.querySelector(".modal-content");
    a.style.display = "none";
    const b = document.querySelector(".fade");
    b.style.display = "none";
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    console.log("onSubmitHandler")
    let body = {
      email: email,
      password: pw,
      name:name,
      zip: zip,
      addr: addr,
      secondAddr: secondAddr,
      
      
    }
    
    axios.put('/api/users/user_update', body)
    .then(res=>{
      console.log("뭐가 에러야");
      console.log(res);
    })
      

  }
  // email Auth
  const onEmailAuth = (event) => {

    let body = {
      email: email
    }

    axios.post('/api/users/emailAuth', body)
      .then(res => {
        alert(res.data);
      })
  }

  const OnEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  }
  const OnNameHandler = (e) => {
    setName(e.currentTarget.value);
  }

  const onPasswordHandler = (e) => {
    setPw(e.currentTarget.value);
  }



  return (
    <>

      <Modal show={show} onHide={onHide}
        dialogClassName="modal-profile"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal">
        <Modal.Header closeButton>
          <Modal.Title>정보 수정화면</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmitHandler}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              {/* <Button type="button" className="emailAuthBtn" onClick={onEmailAuth}>Email Auth</Button> */}
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                value={email}
              />
            </Form.Group>
            <Form.Group className="profileTitle" controlId="exampleForm.ControlInput2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={OnNameHandler}
              />
            </Form.Group>
            <Form.Group className="profileTitle" controlId="exampleForm.ControlInput2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={onPasswordHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3 formbox" controlId="formBasicEmail">
              <Form.Label className="formtext">Address</Form.Label>
              <Form.Control value={zip} onChange={onZipHandler} style={{ width: "100px" }} type="text" />
              <Button variant="secondary" onClick={() => {
                setPopup(!popup)
              }} style={{ position: "absolute", top: "47%", left: "120px" }}>주소 검색</Button>
              {popup && <KaKao adress={address} setAddress={setaddr} setZip={setZip} />}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">

              <Form.Control type="text" value={addr} onChange={onAddressHandler} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">

              <Form.Control type="text" value={secondAddr} onChange={onSecondAddrHandler} />
            </Form.Group>
            <Button variant="secondary" type="submit" className="my-3" style={{ width: "100%" }}
            disabled={!(isEmail && isPassword && isPasswordConfirm)}
            >
              Modify
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>
    </>
  );
}



export default ProfileModal;