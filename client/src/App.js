
import Home from "./components/main/Home";
import Checkout from "./Checkout";
import Computershop from "./components/computer/Computershop";
import Camerashop from "./components/camera/Camerashop";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Manager from "./components/manager/Manager"
import Product from './components/manager/Product';
import Auth from "./components/users/kakaologin/Auth";
import ProductUpload from "./components/computer/ProductUpload";
import ProductDetail from "./components/computer/ProductDetail";
import ProductUpdate from "./components/computer/ProductUpdate";
import Profile from "./components/users/Profile";
import Computershop2 from "./components/computer/Computershop2";




function App() {
 
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/computershop" element={<Computershop/>}/>
          <Route path="/camerashop" element={<Camerashop/>}/>
          <Route path="/manager" element={<Manager/>}/>
          <Route path="/product" element={<Product/>}/>
          <Route path="/oauth/kakao/callback" element={<Auth/>} />
          <Route path="/productUpload" element={<ProductUpload/>} />
          <Route path="/productDetail/:id" element={<ProductDetail/>} />
          <Route path="/productUpdate/:id" element={<ProductUpdate />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/computershop2" element={<Computershop2/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;