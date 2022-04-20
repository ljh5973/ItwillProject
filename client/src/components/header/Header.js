import React, {useState} from 'react';
import './Header.css';
// Header.css 연결
import { AccountCircle } from '@material-ui/icons';
import {ShoppingBasket} from '@material-ui/icons';
// material ui 설치해야함
import { Link } from 'react-router-dom';
// 클릭하면 페이지 변경 가능하게 Link 임포트
import SignUpModal from '../users/SignUpModal';
import SignInModal from '../users/SignInModal';


function Header() {
    const [signUpModalOn, setSignUpModalOn] = useState(false);
    const [signInModalOn, setSignInModalOn] = useState(false);
    return (
        <>
        <SignUpModal show={signUpModalOn} onHide={() => setSignUpModalOn(false)} />
        <SignInModal show={signInModalOn} onHide={() => setSignInModalOn(false)} />
        <div className="header">
            <Link to="/" className='link_box'>
                <div className='header_logo'><img src="../../img/logo.webp"/></div>         
            </Link>
            {/*<img className="header_logo" src="img/logo.webp" /> */}
            {/* 로고 이미지를 클릭하면 home으로 갈 수 있게 Link에 url 입력후 이미지 태그를 감싼다. */}

            <div className="header_menu">
                <ul className="header_menu_list">
                    <Link to="/" className="link_box">
                        <li>Home</li>
                    </Link>
                    <Link to="/computershop2" className="link_box">
                        <li>Computer</li>
                    </Link>
                    <Link to="/camerashop" className="link_box">
                        <li>Camera</li>
                    </Link>
                      
                    {/* <Link to="/manager" className="link_box">
                        <li>👍</li>
                    </Link> */}
                    
                </ul>
            </div>
            <div className="header_nav">
                <div className="header_option">
                    <span className="header_optionMenu" onClick={()=>setSignInModalOn(true)}>Log in</span>
                    <span className="header_optionMenu space">/</span>
                    <span className="header_optionMenu" onClick={()=>setSignUpModalOn(true)}>Sing up</span>
                    <Link to="/profile" className="link_box">
                        <span className="header_optionMenu"><AccountCircle/></span>
                    </Link>
                </div>
                
                {/* <div className="header_optionBasket">
                    <Link to="/checkout" className="link_box">
                    <ShoppingBasket/>
                    <span className="header_optionLineTwoheader_basketCount">
                        0
                    </span>
                    </Link>
                </div> */}
            </div>
        </div>
        </>
        
    );
}

export default Header;