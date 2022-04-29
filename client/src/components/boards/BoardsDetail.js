import axios from "axios";
import Header from '../header/Header';
import React, { useEffect, useState } from "react";
import './BoardsDetail.css';
import { Link, useParams } from "react-router-dom";
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';


import { emailChange, timeForToday } from './TimeForToday';
import SingleTweet from "./SingleTweet";
import TextArea from "antd/lib/input/TextArea";

import HeartButton from "./HeartButton";

const BoardDetail = () => {

    const [like, setLike] = useState(false);

    const [board, setBoard] = useState([]);
    const [reply, setReply] = useState([]);
    const { id } = useParams();
    const [comment, setComment] = useState("");
    

    const [uploadUser_id, setUploadUser_id] = useState('');
    const [user_id, setUser_id] = useState('');


    useEffect(() => {
        axios.get('/api/users/auth')
            .then(res => {
                console.log(res.data.name);
                setUser_id(res.data.name)
            })

        axios.get('/api/boards/read/' + id)
            .then(response => {
                setBoard(response.data)
                console.log(response.data);
                setUploadUser_id(response.data[0].email)
            })

        axios.get('/api/replys/read/' + id)
            .then(response => {
                setReply(response.data)
                console.log(response.data);
            })    
    }, [])
    //한번 만 클릭 할 수 있음
const toggleLike = async (e) => {
     const res = await axios.post('/api/boards/like/'+ id).
     then(response => {
        if(response.data.success === true) {
            
        } else {
            
        }
     }) // [POST] 사용자가 좋아요를 누름 -> DB 갱신 setLike(!like) }
     setLike(!like)
}
    const onSubmitHandler = (e) => {
        let body = {
            bno: id,
            comment: comment, 
            email: user_id
        }
        axios.post('/api/replys/insert',body)
            .then(response => {
                console.log(response);

            })
        setComment('');
    }

    const OnCommitHandler = (e) => {
        setComment(e.currentTarget.value);
    }

    

    return (
        <>
            <Header />
            <div className="home_containerLine" />
            <div className="boardDetail">
                {board.map(b => {
                    return (
                        <>
                            <div className="boardList">
                                <div className="boardHeaderbox">
                                    <span className="boardTitle">{b.title}</span>
                                    <br />
                                    <span className="boardEmail">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{b.email} </span>
                                    <br />
                                    <span className="boardregdate">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{timeForToday(b.regdate)} </span>
                                    <span className="boardview_cnt">&nbsp; 조회 {b.view_cnt} </span>
                                </div>
                                
                                <div className="boardSectionbox" >
                                    <div className="cotent" dangerouslySetInnerHTML={{__html: b.content}}></div>
                                    {b.filename ? <div className="imageSection>">
                                        <img className="imagefile" src={'http://localhost:5000/api/boards/image/'+b.filename}></img>
                                    </div>
                                        : ""}

                                        {/* TODO: 좋아요 버튼 */}
                                    <div className="board_Like_Cnt">
                                        <HeartButton like={like} onClick={toggleLike}></HeartButton>
                                    </div>
                                </div>
                                
                                <div className="replieSectionbox">
                                    <span className="replyHeader">댓글</span>
                                    {reply.map(tweet => {
                                        return <SingleTweet key={tweet.email} tweet={tweet}/>
                                    })}
                                </div>
                                
                                {user_id ? <div className="replie_WriteSectionBox">
                                    <div className="replie_user_id">{user_id}</div>
                                    <TextArea className="input_comment" onChange={OnCommitHandler}
                                    type='text' value={comment} placeholder="댓글을 남겨보세요"></TextArea>
                                    <Button className="submit_Btn" onClick={onSubmitHandler} value='등록'>등록</Button>
                                </div>
                                : ""}

                            </div>
                        </>
                    )
                })}
            </div>
                
        </>
    )
}

export default BoardDetail;