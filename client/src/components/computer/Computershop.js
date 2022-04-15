import React, { useState } from "react";
import "./Computershop.css";
import Header from "../header/Header";
import ComputerPrd from './ComputerPrd';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import ComputerBox from './ComputerBox';
import {Link} from 'react-router-dom';

function Computershop() {

    const customers = [
       
    ]
    const [files, setFiles] = useState('');

    const onLoadFile = (event) => {
        console.log(event);

    }

    return (
        <>
        <Header/>
        <div className="home_containerLine"></div>
        <div className="body">
        <div className="computershop">
            <ComputerBox/>
            <div className="computershop_list">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>상품번호</TableCell>
                            <TableCell>상품이미지</TableCell>
                            <TableCell>상품설명</TableCell>
                            <TableCell style={{textAlign: "center"}}>상품가격</TableCell>
                        </TableRow>
                    </TableHead> 
                    <TableBody >
                        {customers.map(c => {
                            return <ComputerPrd
                            key={c.id}
                            id={c.id}
                            img={c.img}
                            name={c.name}
                            price={c.price}
                            />
                        })}
                    </TableBody>
                </Table>
            </div>
            <Link to="/productUpload">
              <button>상품등록하기</button>
            </Link>
            
        </div>
        </div>
        </>
    );
}



export default Computershop;