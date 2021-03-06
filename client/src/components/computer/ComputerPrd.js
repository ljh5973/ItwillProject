import React from 'react';
import './ComputerPrd.css';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {Link} from 'react-router-dom';
function ComputerPrd(props) {
    //console.log(props.product_image);
    return (                    
        <TableRow >          
            <TableCell style={{width: "150px"}}>{props.product_name}</TableCell>
            <TableCell style={{width:"200px"}}>
                <Link to={`/productDetail/${props.id}`}>
                <img src={props.product_image} className="product_img"/>
                </Link>
            </TableCell>
            <TableCell>{props.product_desc.length < 40 ? props.product_desc : props.product_desc.slice(0, 40) + '...'}</TableCell>
            <TableCell style={{width:"200px"}}>{props.product_price}</TableCell>
        </TableRow>     
    );
}



export default ComputerPrd