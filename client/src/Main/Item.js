import React from 'react';
import './Item.css';

function Item() {
    return(
        <div className="item">
            <div className="new">
                신규
            </div>
            <div className="itemContainer">
                <div className="itemImage">
                    이미지
                </div>
                <div className="itemLogo">
                </div>
                <div className="itemProducer">
                    이름/회사명
                </div>
                <div className="itemDday">
                    60일남음
                </div>
                <div className="itemTitle">
                    티셔츠 한 장으로 유니콘에게 힘이 되어주세요!
                </div>
                <div className="itemDescription">
                    티셔츠 한 장으로 유니콘에게 힘이 되어주세요! 설명 설명 설명 설명 설명 설명 설명
                </div>
                <div className="itemTargetAmount">
                    0,000,000 원 목표
                </div>
                <div className="itemPercentBar">
                </div>
                <div className="itemCurrentAmount">
                    <div className="itemAchievementAmount">
                        <div className="itemCurrentAmountText">달성금액</div>
                        <div className="itemCurrentAmountValue">0,000,000 원</div>
                    </div>
                    <div className="itemInvestor">
                        <div className="itemCurrentAmountText">투자자</div>
                        <div className="itemCurrentAmountValue">00명</div>
                    </div>
                    <div className="itemPercentRate">
                        <div className="itemCurrentAmountText">진행률</div>
                        <div className="itemCurrentAmountValue">00.00%</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Item;