import React from 'react';
import './BoardsPrd.css';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
//import ProductDelete from './ProductDelete';
import {Link} from 'react-router-dom';
import {emailChange, timeForToday} from './TimeForToday';
function ComputerPrd(props) {
    //console.log(props.product_image);

    return (
        //const cellList = ['글번호', '제목', '작성자', '작성일', '조회수', '좋아요']
        <TableRow >          
            <TableCell style={{width: "150px"}}>{props.id}</TableCell>
            <TableCell style={{width:"200px"}}>
                <Link to={`/detail/${props.id}`}>
                {props.board_title}
                </Link>
            </TableCell>
            {/* <TableCell>{props.board_title.length < 40 ? props.board_title : props.board_title.slice(0, 40) + '...'}</TableCell> */}
            {/* <TableCell style={{width:"200px"}}>{props.board_regdate}</TableCell> */}
            
            <TableCell style={{width:"200px"}}>{emailChange(props.board_email)}</TableCell>
            <TableCell style={{width:"200px"}}>{timeForToday(props.board_regdate)}</TableCell>
            <TableCell style={{width:"200px"}}>{props.board_like_cnt}</TableCell>
            <TableCell style={{width:"200px"}}>{props.board_view_cnt}</TableCell>
        </TableRow>    
             
    );
}



export default ComputerPrd