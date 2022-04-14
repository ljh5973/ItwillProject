import React from "react";
import Header from "../header/Header";
import "./Camerashop.css";
import CameraPrd from './CameraPrd';
import { Table } from "react-bootstrap";
import TableHead from "@material-ui/core/TableHead";
import { TableBody } from "@material-ui/core";
import { TableRow } from "@material-ui/core";
import { TableCell } from "@material-ui/core";

function Camerashop() {

    const coustomer = [
        {'id': '1',
         'name': '캐논',
         'price': '100,000'
    },
    {'id': '2',
         'name': '캐논',
         'price': '100,000'
    },
    {'id': '3',
         'name': '캐논',
         'price': '100,000'
    }
    ]

    return (
        <>
        <Header/>
        <div className="camerashop">
            <Table>
                <TableHead>
                    {coustomer.map(c => {
                        return <CameraPrd key={c.id} id={c.id} name={c.name} price={c.price} /> })}
                </TableHead>
            </Table>
           
        </div>
        </>
    );
}







export default Camerashop;