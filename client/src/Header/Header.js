import React from 'react';
import './Header.css';
import Login from './Login_SC.js';

function Header() {
  return (
    <div className="header">
        <div className="headerContainer">
            <div className="headerLogo">
                LOGO
            </div>
            <div className="headerArticle_1">
                <div className="headerMenu">
                    이벤트
                </div>
                <div className="headerMenu">
                    공지사항
                </div>
                <div className="headerMenu">
                    고객센터
                </div>
            </div>
            <div className="headerArticle_1">
                <div className="headerMenu">
                    회원가입
                </div>
                <div className="headerMenu">
                    <Login></Login>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Header;