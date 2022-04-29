import React, { forwardRef, useState, useEffect } from 'react';
import Header from '../header/Header';
import './Board.css';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from "@material-ui/core/styles";
//import ProductUpload2 from './ProductUpload2';
import CircularProgress from '@material-ui/core/CircularProgress';

import { TableContainer } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

import BoardPrd from './BoardsPrd';
import {styled, alpha} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Pagination from "./Pagination";
import Chatbot from '../chatbot/chatbot';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    minWidth: 1080,
  },
  progress: {
    margin: 10,
  },
  tableHead: {
    fontSize: '1.0rem'
  },
  menu: {
      marginTop: 15,
      display: 'flex',
      justifyContent: 'right'
  }
});



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function Board() {

  const classes = useStyles();
    const [customersData, setCustomersData] = useState([]);
    const [progress, setProgress] = useState(0);
    const [search, setSearch] = useState('');
    const [isLoad, setIsLoad] = useState(false);
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const [count, setcount] = useState('');

    const offset = (page - 1) * limit;
   

    

    const callApi = async () => {
      const response = await fetch('/api/boards/read');
      const body = await response.json();
      
      console.log("body", body); 
      setIsLoad(true);
      return body;
    };

    const handleValueChange = (e) => {    
        setSearch(e.target.value)
    }

    
    const filteredComponents = (data) => {
          data = data.filter((c) => {
            return c.title.indexOf(search) > -1 || c.content.indexOf(search) > -1
            
        }); 
        
        //const cellList = ['글번호', '글 제목', '작성일', '조회수', '작성자']          
        //TODO: 작성자는 이름 중간에 별표 dudgh7410
        return data.slice(offset, offset + limit).map((c) => {
            return <BoardPrd stateRefresh = {stateRefresh}
            key={c.bno} id={c.bno} board_title={c.title} board_regdate={c.regdate}
            board_view_cnt={c.view_cnt}
            board_like_cnt={c.like_cnt} board_email={c.email} />
        })

    }
   

    const stateRefresh = async () => {
        setSearch('');
        setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 1));
          }, 20);
        callApi().then(res => {
            setCustomersData(res);
          })
      }
  
    useEffect(() => {
        let complete = 0;
        let timer = setInterval(() => {
          if (complete >= 100) {
            complete = 0
          } else {
            complete += 1;
          }
          setProgress(complete);
          if (isLoad) {
            clearInterval(timer);
            
          }
        }, 20);
        callApi().then(res => {
            setCustomersData(res);
        }).
          catch(err => console.log(err));
      }, [isLoad]);

    //console.log(customersData);

    const cellList = ['글번호', '제목', '작성자', '작성일', '조회수', '좋아요']         
    //TODO: 

  return (
    <>
    <Header/>
    <div className="home_containerLine"></div>
        <div className="body">
        <div className="computershop">
          {/* <label style={{marginBottom:"15px"}}>
            페이지 당 표시할 게시물 수:&nbsp;
            <select type="number" value={limit} onChange={({target: {value}}) => {
              setLimit(Number(value))
            }}>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
          </label> */}
 
            <div className= {classes.root} >
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" >
                        <Toolbar style={{backgroundColor:"#fbb04c"}}>
                        
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            게 시 판
                        </Typography>
                        <Search style={{position:'absolute', right:'15px'}}>
                            <SearchIconWrapper>
                            <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase style={{marginRight:"20px", marginLeft:"70px"}}
                            placeholder="검색"
                            inputProps={{ 'aria-label': 'search' }}
                            value={search}
                            onChange={handleValueChange}
                            />
                        </Search>
                        </Toolbar>
                    </AppBar>
                </Box>
           
                <TableContainer component={Paper}>
                <Paper > 
                    <Table style={{backgroundColor:"#f8eee1"}} className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                               {cellList.map(c => {
                                   return <TableCell key={c.bno} className={classes.tableHead}>{c}</TableCell>
                               })}
                            </TableRow>
                        </TableHead> 
                        <TableBody>
                            {customersData !=0 ? filteredComponents(customersData): 
                            <TableRow>
                                <TableCell colSpan="6" align="center">
                                    <CircularProgress style={{color: "orange"}} className={progress} variant="indeterminate" value={progress}/>
                                </TableCell>
                            </TableRow>     
                            }
                                          
                        </TableBody>      
                                   
                    </Table>
                </Paper>               
                </TableContainer>
                <div className={classes.menu}>
                <Link to={`/boardPost`} className="link_box">
                   <Button variant="contained" style={{backgroundColor: "#fbb04c", color:"white"}}>글쓰기</Button>
                </Link>
                </div>
                
               <Pagination total={customersData.length} limit={limit} page={page} setPage={setPage} />
            </div>

           
            {/* <Link to="/productUpload">
              <button className="write">상품등록</button>
            </Link> */}
             <div className='chatbotArea'>
                <Chatbot> </Chatbot>
            </div>
        </div>
        </div>
    </>
  )
}

export default Board;