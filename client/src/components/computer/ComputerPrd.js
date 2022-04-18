import React from 'react';
import './ComputerPrd.css';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import ProductDelete from './ProductDelete';
import {Link} from 'react-router-dom';
function ComputerPrd(props) {

    return (
                         
        <TableRow >          
            <TableCell style={{padding: 5, width: "120px"}}>{props.product_name}</TableCell>
            <TableCell style={{padding: 5}}>
                <Link to={`/productDetail/${props.id}`}>
                <img src={props.product_image} className="product_img"/>
                </Link>
            </TableCell>
            <TableCell style={{padding: 5}}>{props.product_desc.length < 50 ? props.product_desc : props.product_desc.slice(0, 50) + '...'}</TableCell>
            <TableCell style={{padding: 5, textAlign: "center"}}>{props.product_price} <br/>
                        <button className='cart'>담기</button></TableCell>
        </TableRow>    
             
    );
}



export default ComputerPrd