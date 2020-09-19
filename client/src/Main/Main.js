import React from 'react';
import './Main.css';
import Item from './Item.js';

function Main() {
    return(
        <div className="main">
            <div className="mainContainer">
                <div className="mainSection_1">
                    <div className="search">
                        검색창
                    </div>
                    <div className="title">
                        테크·가전
                    </div>
                    <div>
                        <div className="category">
                            <li>카</li>
                            <li>테</li>
                            <li>고</li>
                            <li>리</li>
                        </div>
                        <div className="menu">
                            <li>전체</li>
                            <li>신규</li>
                            <li>마감임박</li>
                            <li>마감</li>
                        </div>
                    </div>
                </div>
                <div className="mainSection_2">
                    이미지
                </div>
                <div className="mainSection_3">
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                </div>
            </div>
        </div>
    );
}

export default Main;