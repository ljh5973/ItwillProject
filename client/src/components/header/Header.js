import React, { useState } from 'react';
import './Header.css';
// Header.css 연결
import SearchIcon from '@material-ui/icons/Search';
import { ShoppingBasket } from '@material-ui/icons';
// material ui 설치해야함
import { Link, Navigate } from 'react-router-dom';
// 클릭하면 페이지 변경 가능하게 Link 임포트
import SignUpModal from '../users/SignUpModal';
import SignInModal from '../users/SignInModal';
import axios from 'axios';




function Header() {
    var islogin = false;
    const [signUpModalOn, setSignUpModalOn] = useState(false);
    const [signInModalOn, setSignInModalOn] = useState(false);

    const logoutHandler = () => {
        axios.get(`/api/users/logout`).then(response => {
            console.log(response.data.success);
            if (response.data.success == true) {
                //props.history.push("/login");
                //Navigate('/');
                window.location.reload();

            } else {
                alert('Log Out Failed')
            }
        });
    };
    //if 문으로 로그인 로그아웃 지울 방법!!! ㅠㅠㅠ 세션을 받아와야 하나?

    return (
        <>
            <SignUpModal show={signUpModalOn} onHide={() => setSignUpModalOn(false)} />
            <SignInModal show={signInModalOn} onHide={() => setSignInModalOn(false)} />
            <div className="header">
                <Link to="/">
                    <img className="header_logo" src="img/logo.webp" />
                </Link>
                {/* 로고 이미지를 클릭하면 home으로 갈 수 있게 Link에 url 입력후 이미지 태그를 감싼다. */}

                <div className="header_menu">
                    <ul className="header_menu_list">
                        <Link to="/" className="link_box">
                            <li>Home</li>
                        </Link>
                        <Link to="/computershop" className="link_box">
                            <li>Computer</li>
                        </Link>
                        <Link to="/camerashop" className="link_box">
                            <li>Camera</li>
                        </Link>
                        <li>house</li>
                        <Link to="/manager" className="link_box">
                            <li>👍</li>
                        </Link>

                    </ul>
                </div>
                <div className="header_nav">
                    <div className="header_option">
                        <span className="header_optionMenu" onClick={() => setSignInModalOn(true)}>Log in</span>
                        <span className="header_optionMenu space">/</span>
                        <span className="header_optionMenu" onClick={logoutHandler}>logout</span>
                        <span className="header_optionMenu space">/</span>
                        <span className="header_optionMenu" onClick={() => setSignUpModalOn(true)}>Sing up</span>
                    </div>

                    <div className="header_optionBasket">
                        <Link to="/checkout" className="link_box">
                            <ShoppingBasket />
                            <span className="header_optionLineTwoheader_basketCount">
                                0
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </>

    );

}

export default Header;