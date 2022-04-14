import React from 'react';
import './ComputerPrd.css';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
function ComputerPrd(props) {

    return (
                         
        <TableRow >
            <TableCell style={{padding: 5, width: "120px"}}>{props.id}</TableCell>
            <TableCell style={{padding: 5}}><img src={props.img} className="product_img"/></TableCell>
            <TableCell style={{padding: 5}}>{props.name}</TableCell>
            <TableCell style={{padding: 5, textAlign: "center"}}>{props.price} <br/>
                        <button>담기</button></TableCell>
        </TableRow>    
             
    );
}



export default ComputerPrd