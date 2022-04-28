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
            text: text,
        }
        // We need to take care of the message Chatbot sent
        try {
            
            let response;
            // I will send request 
            if (type === 'answer') {
                response = await Axios.post("/api/chatbot/answer", textQueryVariables)
                console.log(response)
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

                type="answer";

                console.log(response);

               
            } else if (type === 'notebook') {
                response = await Axios.post('/api/chatbot/notebook', textQueryVariables)
            } else if (type === 'camera') {
                response = await Axios.post('/api/chatbot/camera', textQueryVariables)
            }

            // TODO content
            
            
                conversation = {
                    who: 'chatbot',
                    content: {
                        text: {
                            text: response.data
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
             console.log(conversation);
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
    const chatbotOn = () => {
        const a = document.querySelector(".chatbotModal")
        a.style.display = "block";
        const sect = document.querySelector(".sect01")
        sect.style.display = 'block';
        const closeBtn = document.querySelector(".chatbotClose")
        closeBtn.style.display = "block";
    }
    const chatbotClose = () => {
        const closeBtn = document.querySelector(".chatbotClose")
        closeBtn.style.display = "none";
        const chatbot = document.querySelector(".chatbotModal")
        chatbot.style.display = 'none';
    }

    const renderOneMessage = (message, i) => {
        //console.log('message', message);

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

        <div className='chatbot'
            
        >
            <div className='chatbotImgArea'
            onClick={chatbotOn}>

                <strong>Chatbot</strong>
                <img className='chatbotImg' src='../../img/chat.png'></img>
            
            </div>
            <div className='chatbotArea'>
                <div style={{
                    height: 400, width: 300,
                    border: '3px solid black', borderRadius: '7px',
                    backgroundColor: 'white'
                }}
                    className="chatbotModal">

                    <div style={{ height: 345, width: '100%', overflow: 'auto' }}>
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
                <div class="chatbotClose">
                    <div class="sect01"
                        onClick={chatbotClose}>
                        <div class="line-box">
                            <span class="line-01"></span>
                            <span class="line-02"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chatbot;