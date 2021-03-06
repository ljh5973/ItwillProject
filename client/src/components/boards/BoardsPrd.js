import React from 'react';
import './css/BoardsPrd.css';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
//import ProductDelete from './ProductDelete';
import {Link} from 'react-router-dom';
import {emailChange, timeForToday} from './Page/TimeForToday';
import axios from 'axios';

function ComputerPrd(props) {
    //console.log(props.product_image);
    
    //조회 수 증가
    const BtnHandler = () => {
        axios.put('/api/boards/view/'+props.id, (response => {
            console.log(response.data);
        }));
    }


    return (
        //const cellList = ['글번호', '제목', '작성자', '작성일', '조회수', '좋아요']
        <TableRow >          
            <TableCell style={{width: "150px"}}>{props.id}</TableCell>
            <TableCell >
                <Link to={`/detail/${props.id}`} onClick={BtnHandler} className="link_box">
                {props.board_title}
                </Link>
                <span>&nbsp;[{props.board_reply_cnt}]</span>
            </TableCell>
            {/* <TableCell>{props.board_title.length < 40 ? props.board_title : props.board_title.slice(0, 40) + '...'}</TableCell> */}
            {/* <TableCell style={{width:"200px"}}>{props.board_regdate}</TableCell> */}
            
            <TableCell style={{width:"100px"}}>{emailChange(props.board_email)}</TableCell>
            <TableCell style={{width:"100px"}}>{timeForToday(props.board_regdate)}</TableCell>
            <TableCell style={{width:"100px"}}>{props.board_view_cnt}</TableCell>
            <TableCell style={{width:"100px"}}>{props.board_like_cnt}</TableCell>
        </TableRow>    
             
    );
}



export default ComputerPrd