import React, { useContext } from 'react';
import Styled from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Store from '../Store/Store';
import ProgressBar from './PercentBar';
import { moneyFormat, percentFormat, dDayFormat } from '../Util/Util';

function Item(props){
    const { globalStateDispatch, projectInformationDispatch, pageNumberDispatch } = useContext(Store);
    const targetMoneyStr = moneyFormat(props.targetMoney);
    const saveMoneyStr = moneyFormat(props.saveMoney);
    const percent = percentFormat(props.saveMoney,props.targetMoney);
    const dDay = dDayFormat(props.dDay);
    const dDayText = props.dDay<0?"":"일 남음";
    
    const moveProjectDetailes = (e) =>{
        e.preventDefault();
        const newProjectInformation = {
            number: props.number,
            title: props.title,
            target: targetMoneyStr,
            thumbnail: props.thumbnail,
            logo: props.logo,
            creator: props.creator,
            dDay: dDay,
            price: moneyFormat(props.price),
            fundingCnt: props.fundingCnt,
            save: saveMoneyStr,
            percent: percent,
            email: props.email
        }
        projectInformationDispatch( { type: 'PROJECT', payload: newProjectInformation });
        const newGlobalState = {
            main: e.currentTarget.id,
            sub: 'introduction',
            action: 1,
            num:0
        }
        globalStateDispatch( { type: 'GLOBAL', payload: newGlobalState });
        pageNumberDispatch({type: 'DEFAULT'}); // 메인 페이지 페이징 처리 후 제거할 것
    }
    return(
        <Container id='projectDetails' onClick={(e)=>moveProjectDetailes(e)}>
            <ItemImage src={props.thumbnail}/>
            <ItemLogo src={props.logo}/>
            <Creator>{props.creator}</Creator>
            <DDayText>{dDayText}</DDayText><Dday>{dDay}</Dday>
            <Title>{props.title}</Title>
            <CurrentStateContainer>
                <TargetMoney>{targetMoneyStr}</TargetMoney><TargetMoneyText>원 목표</TargetMoneyText><br/>
                <PercentBarContainer>
                    <ProgressBar width='270px' height='12px' borderColor='white' percent={percent}/>
                    <PercentBarText>{percent}%</PercentBarText>
                </PercentBarContainer>
                <SaveMoneyContainer>
                    <Text>달성금액</Text><br/>
                    <SaveMoneyValue>{saveMoneyStr}원</SaveMoneyValue>                    
                </SaveMoneyContainer>
                <FundingCountContainer>
                    <FundingText>참여자</FundingText>
                    <Value>{props.fundingCnt}명</Value>                    
                </FundingCountContainer>
                <PercentContainer>
                    <PercentText>달성률</PercentText><br/>
                    <PercentValue color={percent<=40?'black': percent<=70?'orange':'lime'}>
                        {percent}%
                    </PercentValue>
                </PercentContainer>
            </CurrentStateContainer>
        </Container>
    );
}
export default Item;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Left = Styled.div`
    float: left;
`
const Container = Styled(Left)`
    cursor: pointer;
    width: 300px;
    height: 370px;
    border: 1px solid lightgrey;
    border-radius: 10px;
    margin: 0 0 40px 50px;

    transition: margin 0.5s,box-shadow 0.7s ease-in-out;

    &:hover {
        box-shadow: 0 0 10px 2.5px lightgrey;
        margin: -5px 0 45px 50px;
    }
`
const ItemImage = Styled.img`
    float: left;
    width: 100%;
    height: 175px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background-color: lightgrey;
    z-index: 1;
`
const ItemLogo = Styled.img`
    postion: relative;
    float: left;
    width: 60px;
    height: 60px;
    margin: -35px 0 0 5%;
    border: 1px solid lightgrey;
    background-color: white;
    z-index: 2;
`
const Creator = Styled(Left)`
    font-size: 12px;
    color: #7D7D7D;
    margin: 10px 0 0 5px;
`
const Dday = Styled(Creator)`
    float: right;
    margin: 10px 0 0 0;
`
const DDayText = Styled(Dday)`
    line-height: 17px;
    font-size: 11px;
    margin: 10px 5% 0 0;
`
const Title = Styled(Left)`
    width: 90%;
    height: 45px;
    font-size: 17px;
    font-weight: bold;
    margin: 10px 0 20px 5%;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`
const CurrentStateContainer = Styled(Left)`
    width: 90%;
    height: 90px;
    margin: 0 0 0 5%;
`
const TargetMoney = Styled(Creator)`
    display: inline-block;
    margin: 0 0 0 0;
    text-align: left;
    vertical-align: top;
`
const TargetMoneyText = Styled(TargetMoney)`
    font-size: 11px;
    line-height: 18px;
`
const PercentBarContainer = Styled(Left)`
    margin: -2px 0 15px 0;
    border: none;
    border-radius: 10px;
    background-color: #E1E1E1 ;
`
const PercentBarText = Styled.div`
    text-align: left;
    margin: -14px 0 0 5px;
    font-size: 10px;
    color: white;
`
const SaveMoneyContainer = Styled(Left)`
    width: 42.5%;
    text-align: left;
`
const Text = Styled(Creator)`
    margin: 0 0 0 0;
`
const FundingText = Styled(Creator)`
    float: none;
    margin: 0 0 5px 0;
`
const Value = Styled(Left)`
    width: 100%;
    margin: -5px 0 0 0;
    font-weight: bold;
`
const SaveMoneyValue = Styled(Value)`
    float: left;
    width: 90%;
    margin: -5px 0 0 0;
    font-weight: bold;
    white-space: nowrap;
    overFlow: hidden;
    text-overflow: ellipsis;
    
    &:hover {
        font-size: 15px;
    }   
`
const FundingCountContainer = Styled(Left)`
    width: 54px;
    text-align: center;

`
const PercentContainer = Styled(SaveMoneyContainer)`
    float: right;
    width: auto;
`
const PercentText = Styled(Text)`
    float: right;
    text-align: right;
`
const PercentValue = Styled(Value)`
    float: right;
    text-align: right;
    color: ${({color})=>`${color}`};
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////