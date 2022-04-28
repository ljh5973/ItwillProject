import React from 'react';
import './CameraPrd.css';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CameraDelete from './CameraDelete'
import {Link} from 'react-router-dom';
function ComputerPrd(props) {
    //console.log(props.product_image);
    return (
                         
        <TableRow >          
            <TableCell style={{width: "150px"}}>{props.camera_name}</TableCell>
            <TableCell style={{width:"200px"}}>
                <Link to={`/CameraDetail/${props.id}`}>
                <img src={props.camera_image} className="product_img"/>
                </Link>
            </TableCell>
            <TableCell>{props.camera_desc.length < 40 ? props.camera_desc : props.camera_desc.slice(0, 40) + '...'}</TableCell>
            <TableCell style={{width:"200px"}}>{props.camera_price}</TableCell>
        </TableRow>    
             
    );
}



export default ComputerPrd