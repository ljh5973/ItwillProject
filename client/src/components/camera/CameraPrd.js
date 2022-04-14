import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


function CameraPrd(props) {
    return (
        <div className="cameraprd">
            <TableRow>
                <TableCell>{props.id}</TableCell>
                <TableCell>{props.name}</TableCell>
                <TableCell>{props.price}</TableCell>
            </TableRow>
        </div>
    );
}







export default CameraPrd