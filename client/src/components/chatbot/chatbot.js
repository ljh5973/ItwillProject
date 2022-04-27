import React, { useEffect } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { saveMessage } from '../../_action/message_action';
import "bootstrap/dist/css/bootstrap.min.css";
import Message from './Sections/Message';
import { Modal, Button, Form, Container } from 'react-bootstrap';
import "./chatbot.css";
let type = "answer";
function Chatbot({ show, onHide }) {


    const dispatch = useDispatch()
    const messagesFromRedux = useSelector(state => state.message.messages)
    useEffect(() => {
        eventQuery()
    }, [])

    const textQuery = async (text) => {
        // First need tot take care of the message I sent

        let conversation = {
            who: 'user',
            content: {
                text: {
                    text: text
                }
            }
        }


        dispatch(saveMessage(conversation));
        // console.log('text i sent ', conversation);
        const textQueryVariables = {
            text: text
        }
        // We need to take care of the message Chatbot sent
        try {

            // I will send request 
            let response;
            if (type === 'answer') {
                response = await Axios.post("/api/chatbot/answer", textQueryVariables)
                console.log(response.data);
                if (response.data == '찾으시는 컴퓨터를 입력해주세요') {
                    type = 'computer';
                } else if (response.data == '찾으시는 노트북을 입력해주세요') {
                    type = 'notebook';
                } else if (response.data == '찾으시는 카메라를 입력해주세요') {
                    type = 'camera';
                }
            } else if (type === 'computer') {
                response = await Axios.post('/api/chatbot/computer', textQueryVariables)
            } else if (type === 'notebook') {
                response = await Axios.post('/api/chatbot/notebook', textQueryVariables)
            } else if (type === 'camera') {
                response = await Axios.post('/api/chatbot/camera', textQueryVariables)
            }

            // TODO content
            const content = response
            const result = ""

            conversation = {
                who: 'chatbot',
                content: {
                    text: {
                        text: content.data
                    }
                }
            }
            dispatch(saveMessage(conversation));




        } catch (error) {
            conversation = {
                who: 'chatbot',
                content: {
                    text: {
                        text: "Error just occured ,please check the problem"
                    }
                }
            }
            // console.log(conversation);
        }
    }



    const eventQuery = async () => {

        try {
            let content = "안녕하세요? 무엇을 원하세요? 컴퓨터 / 노트북 / 카메라"

            let conversation = {
                who: 'chatbot',
                content: {
                    text: {
                        text: content
                    }
                }
            }
            dispatch(saveMessage(conversation));




        } catch (error) {
            let conversation = {
                who: 'chatbot',
                content: {
                    text: {
                        text: "Error just occured ,please check the problem"
                    }
                }
            }
        }
    }
    const keyPressHandler = (e) => {
        if (e.key === "Enter") {
            if (!e.target.value) {
                return alert('you need to type something first');
            }

            textQuery(e.target.value)
            e.target.value = "";
        }
    }

    const renderOneMessage = (message, i) => {
        console.log('message', message);

        return <Message key={i} who={message.who} text={message.content.text.text} />
    }
    const renderMessage = (returnMessages) => {
        if (returnMessages) {
            return returnMessages.map((message, i) => {
                return renderOneMessage(message, i);
            })
        } else {
            return null;
        }
    }
    return (
        <Modal
            style={{
                position: "absolute", right: 0, bottom: 0

            }}
            show={show}
            onHide={onHide}
            dialogClassName="modal-90w"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="modal"
            shouldCloseOnOverlayClick={false}
        >
            <Container>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Chatbot
                    </Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <div style={{
                        height: 300, width: 300,
                        border: '3px solid black', borderRadius: '7px'
                    }}
                        className="chatbotModal">

                        <div style={{ height: 300, width: '100%', overflow: 'auto' }}>
                            {renderMessage(messagesFromRedux)}
                        </div>


                        <input style={{
                            margin: 0, width: '100%', height: 50,
                            borderRadius: '4px', padding: '5px', fontSize: '1rem'
                        }}
                            placeholder="Send a message..."
                            onKeyPress={keyPressHandler}
                            type="text"
                        />

                    </div>
                </Modal.Body>
            </Container>
        </Modal>
    )
}

export default Chatbot;