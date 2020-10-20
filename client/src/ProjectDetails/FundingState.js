import React, { useState } from 'react';
import Styled from 'styled-components';
import ProgressBar from 'react-percent-bar'
import { moneyFormat } from '../Util/Util';

function FundingState(props) {
    const [fundingModalState, setFundingModalState] = useState(false);
    const targetMoney = 1000000;
    const saveMoney = 5000000;
    const percent = ((saveMoney / targetMoney) * 100);
    const percentView = percent > 100 ? 100 : percent;
    const dDay = 30;
    const progress = <ProgressBar width='300px' height='10px' fillColor='lime' percent={percentView} />;
    const saveMoneyStr = moneyFormat(saveMoney);
    const fundingCount = 1000;

        return  <CurrentStateContainer>
                    <Text>모인금액</Text><br />
                        <SubContainer>
                            <Value>{saveMoneyStr}</Value><BottomText>원</BottomText><PercentText>{percent + '%'}</PercentText><br /><br />
                            {progress}
                        </SubContainer><br />
                    <Text>참여인원</Text><br />
                        <SubContainer>
                            <Value>{fundingCount}</Value><BottomText>명</BottomText>
                        </SubContainer><br />
                    <Text>남은기간</Text><br />
                        <SubContainer>
                            <Value>{dDay}</Value><BottomText>일</BottomText>
                        </SubContainer>
                    <FundingBtn>펀딩하기</FundingBtn>
                </CurrentStateContainer>;
}

export default FundingState;

const Left = Styled.div`
    float: left;
`
const CurrentStateContainer = Styled(Left)`
    position: fixed;
    width: 300px;
    margin: 57px 0 0 0;
`
const Text = Styled(Left)`
    font-size: 15px;
`
const SubContainer = Styled(Left)`
    width: 100%;
    margin: 0 0 20px 0;
`
const Value = Styled(Left)`
    font-size: 30px;
    font-weight: bold;
    color: #80C72D;
`
const BottomText = Styled(Text)`
    position: relative;
    top: 20px;
`
const PercentText = Styled(BottomText)`
    float: right;
    font-weight: bold;
    color: #80C72D;
`
const FundingBtn = Styled.button`
    left: 14%;
    width: 300px;
    height: 50px;
    font-size: 20px;
    font-weight: bold;
    text-shadow: 1px 1px 7px #BDBDBD; 
    box-shadow: 1px 1px 7px #BDBDBD;
    border: none;
    border-radius: 10px;
    color: white;
    margin-top: 20px;
    background-color: #83E538;

    &:hover {
        box-shadow: 1px 1px 9px #8C8C8C; 
    }
`