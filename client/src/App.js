import './App.css';
import Home from "./components/main/Home";
import Camerashop from "./components/camera/Camerashop";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Auth from "./components/users/kakaologin/Auth";
import ProductDetail from "./components/computer/ProductDetail";
import ProductUpdate from "./components/computer/ProductUpdate";
import Profile from "./components/users/Profile";
import Computershop2 from "./components/computer/Computershop2";
import Chatbot from'./components/chatbot/chatbot';
import UserCart from './components/users/UserCart';
import Board from './components/boards/Board';
import BoardDetail from './components/boards/BoardsDetail';
import BoardWrite from './components/boards/BoardsWrite';




function App() {
 
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/camerashop" element={<Camerashop/>}/>
          <Route path="/oauth/kakao/callback" element={<Auth/>} />
          <Route path="/productDetail/:id" element={<ProductDetail/>} />
          <Route path="/productUpdate/:id" element={<ProductUpdate />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/computershop2" element={<Computershop2/>} />
          <Route path="/userCart" element={<UserCart/>}/>

          <Route path="/board" element={<Board/>}/>
          <Route path="/detail/:id" element={<BoardDetail/>}/>
          <Route path="/boardPost" element={<BoardWrite/>}/>


        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;