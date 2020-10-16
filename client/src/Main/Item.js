import React, { useContext } from 'react';
import Styled from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Store from '../Store/Store';
import ProgressBar from 'react-percent-bar'
import { moneyFormat, percentFormat } from '../Util/Util';

function Item(props){
    const { projectInfomation, projectInfomationDispatch } = useContext(Store);
    // const targetMoneyStr = moneyFormat(projectInfomation.targetMoney);
    // const saveMoneyStr = moneyFormat(projectInfomation.saveMoney);
    // const percent = (projectInfomation.saveMoney/projectInfomation.targetMoney)*100;
    const targetMoneyStr = moneyFormat(props.targetMoney);
    const saveMoneyStr = moneyFormat(props.saveMoney);
    const percent = percentFormat(props.saveMoney,props.targetMoney);
    const percentView = percent>100?100:percent;
    const dDayText = projectInfomation.dDay<0?'마감':'일 남음';
    let percentBarColor = '';
    // PercentBar Color Setting
    if(percent>70){
        percentBarColor = 'lime';
    }else if(percent>40){
        percentBarColor = 'orange';
    }else{
        percentBarColor = 'black';
    }
    return(
        <Container>
            <ItemImage/>
            <ItemLogo/>
            <Creator>{props.name}</Creator>
            <DDayText>{dDayText}</DDayText><Dday>{props.dDay}</Dday>
            <Title>{props.title}</Title>
            <CurrentStateContainer>
                <TargetMoney>{targetMoneyStr}</TargetMoney><TargetMoneyText>원 목표</TargetMoneyText><br/>
                <PercentBarContainer>
                    <ProgressBar width='270px' height='12.5px' fillColor={percentBarColor} borderColor='color' percent={percentView}/>
                    <PercentBarText>{percent}%</PercentBarText>
                </PercentBarContainer>
                <SaveMoneyContainer>
                    <Text>달성금액</Text><br/>
                    <SaveMoneyValue>{saveMoneyStr}원</SaveMoneyValue>                    
                </SaveMoneyContainer>
                <FundingCountContainer>
                    <_Text>참여자</_Text>
                    <Value>{props.fundingCount}명</Value>                    
                </FundingCountContainer>
                <PercentContainer>
                    <Text>달성률</Text><br/>
                    <PercentValue>{percent}%</PercentValue>                    
                </PercentContainer>
            </CurrentStateContainer>
        </Container>
        // <Container>
        //     <ItemImage/>
        //     <ItemLogo/>
        //     <Creator>{projectInfomation.name}</Creator>
        //     <DDayText>{dDayText}</DDayText><Dday>{projectInfomation.dDay}</Dday>
        //     <Title>{projectInfomation.title}</Title>
        //     <CurrentStateContainer>
        //         <TargetMoney>{targetMoneyStr}</TargetMoney><TargetMoneyText>원 목표</TargetMoneyText><br/>
        //         <PercentBarContainer>
        //             <ProgressBar width='270px' height='12.5px' fillColor={percentBarColor} borderColor='color' percent={percentView}/>
        //             <PercentText>{percent}%</PercentText>
        //         </PercentBarContainer>
        //         <SaveMoneyContainer>
        //             <Text>달성금액</Text><br/>
        //             <SaveMoneyValue>{saveMoneyStr}원</SaveMoneyValue>                    
        //         </SaveMoneyContainer>
        //         <FundingCountContainer>
        //             <_Text>참여자</_Text>
        //             <Value>{projectInfomation.fundingCount}명</Value>                    
        //         </FundingCountContainer>
        //         <PercentContainer>
        //             <Text>달성률</Text><br/>
        //             <PercentValue>{percent}%</PercentValue>                    
        //         </PercentContainer>
        //     </CurrentStateContainer>
        // </Container>
    );
}
export default Item;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Left = Styled.div`
    float: left;
`
const Container = Styled(Left)`
    width: 300px;
    height: 390px;
    border: 1px solid lightgrey;
    border-radius: 10px;
    margin: 0 0 40px 50px;

    &:hover {
        box-shadow: 0 0 10px 2.5px lightgrey;
        animation-duration: 0.5s;
        animation-name: projectShadow;
        animation-fill-mode: forwards;
    }
    @keyframes projectShadow {
        from {
            margin: 0 0 40px 50px;
        }
        to {
            margin: -5px 0 45px 50px;
            animation-fill-mode: forward;
        }
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
    height: 75px;
    font-size: 17.5px;
    font-weight: bold;
    margin: 10px 0 5px 5%;
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
    margin: -13px 0 0 5px;
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
const _Text = Styled(Creator)`
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
const PercentValue = Styled(Value)`
    float: right;
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////