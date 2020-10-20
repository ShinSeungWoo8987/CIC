import React, { useContext } from 'react';
import Styled from 'styled-components';
import Store from '../Store/Store';
import PercentBar from '../Components/PercentBar'
import { moneyFormat } from '../Util/Util';

function FundingState(props) {
    const [ session, modalStateDispatch ] = useContext(Store);
    const targetMoney = 1000000;
    const saveMoney = 5000000;
    const percent = ((saveMoney / targetMoney) * 100);
    const dDay = 30;
    const progress = <PercentBar width='300px' height='10px' borderColor='white' percent={percent}/>;
    const saveMoneyStr = moneyFormat(saveMoney);
    const fundingCount = 1000;
    // When Login & Non-Login, Modal Setting
    const openModal = (e) => {
        e.preventDefault();
        if( !session.state ) { //로그인상태
            const newModalState = {
                funding: true
            }
            modalStateDispatch({type: 'CHANGE_MODALSTATE', payload: newModalState});
        }else{ //로그아웃상태
            const newModalState = {
                login: true
            }
            modalStateDispatch({type:"CHANGE_MODALSTATE", payload: newModalState});
        }
    }
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
                <FundingBtn onClick={(e)=>openModal(e)}>펀딩하기</FundingBtn>
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
    transition-daly: 10s;
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