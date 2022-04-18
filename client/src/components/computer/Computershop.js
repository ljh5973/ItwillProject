import React, { useEffect, useState } from "react";
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


    const [customersData, setCustomersData] = useState([]);


    const callApi = async () => {
      const response = await fetch('/api/users/product');
      const body = await response.json();
      
      console.log(body); 
      return body;
    };
  
    useEffect(() => {
      
      callApi().then(res => {
        setCustomersData(res);
      }).
        catch(err => console.log(err));
    }, []);  

    console.log(customersData);
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
                            <TableCell>상품이름</TableCell>
                            <TableCell>상품이미지</TableCell>
                            <TableCell>상품설명</TableCell>
                            <TableCell style={{textAlign: "center"}}>상품가격</TableCell>
                        </TableRow>
                    </TableHead> 
                    <TableBody>
                        {customersData ? customersData.map(c => {
                            return <ComputerPrd
                            key={c.id} id={c.id} product_name={c.product_name} product_image={c.product_image} product_desc={c.product_desc} product_price={c.product_price} />
                        }) : ""
                        
                        }
                        
                    </TableBody>
                </Table>
            </div>
            <Link to="/productUpload">
              <button className="write">상품등록</button>
            </Link>
            
        </div>
        </div>
        </>
    );
}



export default Computershop;