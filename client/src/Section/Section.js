import React from 'react';
import './Section.css';

function Section() {
    return(
        <div className="section">
            <div className="sectionContainer">
                <div className="sectionArticle_1">
                    <div className="search">
                        검색창
                    </div>
                    <div className="category">

                    </div>
                    <div>
                        <div className="title">
                            테크·가전
                        </div>
                        <div className="menu">
                            <li>전체</li>
                            <li>신규</li>
                            <li>마감임박</li>
                            <li>마감</li>
                        </div>
                    </div>
                </div>
                <div className="sectionArticle_2">
                    
                </div>
                <div className="sectionArticle_3">
                    
                </div>
            </div>
        </div>
    );
}

export default Section;