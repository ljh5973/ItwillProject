import React, { useEffect, useState } from "react";
import axios from "axios";
import Editor from './UploadConfig/EditorComponent';
import UploadFiles from './UploadConfig/UploadFiles';

import './BoardsWrite.css';

import Header from '../header/Header';
import { Link } from "react-router-dom";
import { Button } from '@material-ui/core';

const BoardWrite = () => {

    const tabs = [
        { value: '공지사항', text: '공지사항' },
        { value: '업데이트', text: '업데이트' }
     ]

    const [id, setId] = useState(0);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [type, setType] = useState('공지사항');
    const uploadReferenece = React.createRef();

    async function onClickSearch() {

        if (title.trim() == '') {
            alert('제목을 입력해주세요'); return;
        }

        if (desc.trim() == '') {
            alert('내용을 입력해주세요'); return;
        }

        await uploadReferenece.current.upload().then(function (result) {

            const files = result;
            
            let body = {
                title: title,
                content: desc,
                filename: files,
                email: 'test@naver.com',
            }
            axios.post('/api/boards/create', body).then(response => {
                if(response.data) {
                    alert('저장 완료');
                    var linkToClick = document.getElementById('notice_Detail_Link');
                    linkToClick.click();
                } else {
                    alert('공지사항을 저장하는 도중 오류가 발생하였습니다.')
                }
            })
        
        }).catch(function (err) {

        });

    }

    function onEditorChange(value) {
        setDesc(value)
    }


    return (
        <>
        <Header/>
        <div className="container" style={{ fontFamily: 'Noto Sans Korean,Malgun Gothic,sans-serif' }}>
            <div className="lf-contents pd12">

                <div style={{ padding: "12px" }}>
                  
                    <div className="form-group">
                    <Button options={tabs} onChange={(event) => setType(event.target.value)}/>
                    </div>
                    <div className="form-group">
                    <input type="text" placeholder="제목" className="form-control" onChange={(event) => setTitle(event.target.value)} />
                    </div>
                    <UploadFiles ref={uploadReferenece} />
                    <Editor value={desc} onChange={onEditorChange} />
                    <div className="text-center-pd12">
                        <Button variant="outlined" className="lf-button primary" onClick={onClickSearch}>저장</Button>
                        <a href="/boards"><Button variant="outlined" className="lf-button primary float-right">목록으로</Button></a>
                    </div>
                    <Link id="notice_Detail_Link" to={{ pathname: '/board', state: { _id: id } }}></Link>
                    <div className="top-controls">
                </div>
                </div>
            </div>
        </div>

        </>
    )
}

export default BoardWrite