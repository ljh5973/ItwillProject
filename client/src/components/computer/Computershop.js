import React from "react";
import "./Computershop.css";
import Header from "../header/Header";
import ComputerPrd from './ComputerPrd';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import ComputerBox from './ComputerBox';

function Computershop() {

    const customers = [
        {'id':'1',
         'img':'img/computershop/computer1.jpg',
         'name':'인텔 코어i7-12세대 12700K (엘더레이크)(정품)인텔',
         'price': '1,000,000'
        },
        {'id':'2',
        'img':'img/computershop/computer2.jpg',
        'name':'애인텔 코어i7-12세대 12700K (엘더레이크) (정품)',
        'price': '1,000,000'
       },
       {'id':'3',
       'img':'img/computershop/computer3.jpg',
       'name':'AMD 라이젠7-4세대 5800X (버미어) (멀티팩(정품))',
       'price': '1,000,000'
      },
      {'id':'4',
       'img':'img/computershop/computer3.jpg',
       'name':'AMD 라이젠7-4세대 5800X (버미어) (멀티팩(정품))',
       'price': '1,000,000'
      },
      {'id':'5',
       'img':'img/computershop/computer3.jpg',
       'name':'AMD 라이젠7-4세대 5800X (버미어) (멀티팩(정품))',
       'price': '1,000,000'
      },
    ]

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
        </div>
        </div>
        </>
    );
}



export default Computershop;