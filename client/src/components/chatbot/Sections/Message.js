import React from 'react'
import {List, Avatar} from 'antd'; 
import Icon from "@ant-design/icons";
function Message(props) {
    const AvatarSrc= props.who ==="chatbot" ? <Icon type="robot" />:< Icon type="smile"/>
  return (
    <List.Item style={{padding: '1rem', listStyle:'none'}}>
            <List.Item.Meta 
            avatar={<Avatar icon={AvatarSrc} />}
            title ={props.who}
            description={props.text}
            />
        </List.Item>
  )
}

export default Message
