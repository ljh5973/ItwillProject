import React from 'react';
import './ComputerPrd.css';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import ProductDelete from './ProductDelete';
import {Link} from 'react-router-dom';
function ComputerPrd(props) {

    return (
                         
        <TableRow >          
            <TableCell style={{width: "150px"}}>{props.product_name}</TableCell>
            <TableCell style={{width:"200px"}}>
                <Link to={`/productDetail/${props.id}`}>
                <img src={props.product_image} className="product_img"/>
                </Link>
            </TableCell>
            <TableCell>{props.product_desc.length < 45 ? props.product_desc : props.product_desc.slice(0, 45) + '...'}</TableCell>
            <TableCell style={{width:"200px"}}>{props.product_price}</TableCell>
        </TableRow>    
             
    );
}



export default ComputerPrd