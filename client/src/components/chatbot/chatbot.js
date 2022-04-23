import React, { useEffect } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { saveMessage } from '../../_action/message_action';


function Chatbot() {

    const dispatch = useDispatch()

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
        dispatch(saveMessage(conversation))
        console.log('text i sent ', conversation);
        const textQueryVariables = {
            text: text
        }
        // We need to take care of the message Chatbot sent
        try {
            // I will send request 
            const response = await Axios.post('/api/chatbot/textQuery', textQueryVariables)

            // TODO content
            const content = response


            conversation = {
                who: 'chatbot',
                content: content
            }




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
            const content = "안녕하세요?"

            let conversation = {
                who: 'chatbot',
                content: content
            }

        dispatch(saveMessage(conversation))



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
    return (

        <div style={{
            height: 70, width: 700,
            border: '3px solid black', borderRadius: '7px'
        }}>

            <div style={{ height: 644, width: '100%', overflow: 'auto' }}>
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

    )
}

export default Chatbot;