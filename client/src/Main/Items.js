import React from 'react';
import Styled from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import ProgressBar from 'react-percent-bar'

/*
    Item 하단부 제작할 것
*/

function Item(){
    // Funding Information
    const creatorName = 'CIC'; 
    const title = '이곳은 제목이 작성될 자리입니다.';
    const targetMoney = 1000000;
    const saveMoney = 500000;
    const percent = ((saveMoney/targetMoney)*100);
    const dDay = 30;
    const progress = <ProgressBar width='250px' height='10px' fillColor='lime' percent={percent}/>;
    // Format - (###,###,###)
    const changeFormat = (source) => {
        const reverseSource = String(source).split("").reverse().join("");
        let result = '';
        var idx = 0;
        while(idx<String(reverseSource).length){
            if(idx%3 === 2 && idx !== String(reverseSource).length-1){
                result += String(reverseSource)[idx] + ',';
            }else{
                result += String(reverseSource)[idx]
            }
            idx++;
        }
        return String(result).split("").reverse().join("");
    }
    const saveMoneyStr = changeFormat(saveMoney);
    const fundingCountStr = changeFormat(1000);
    return(
        <Container>
            <ItemImage/>
            <ItemLogo/>
            <ItemCreator>{creatorName}</ItemCreator>
            <Dday>{dDay}일 남음</Dday>
            <Title>{title}</Title>
            <CurrentStateContainer>
                제작할 것
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
    width: 270px;
    height: 360px;
    border: 1px solid lightgrey;
    border-radius: 10px;
`
const ItemImage = Styled.img`
    float: left;
    width: 100%;
    height: 140px;
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
    margin: -30px 0 0 5%;
    border: 1px solid lightgrey;
    background-color: white;
    z-index: 2;
`
const ItemCreator = Styled(Left)`
    font-size: 12.5px;
    color: #7D7D7D;
    margin: 15px 0 0 5px;
`
const Dday = Styled(ItemCreator)`
    float: right;
    margin: 15px 5% 0 0;
`
const Title = Styled(Left)`
    width: 90%;
    height: 75px;
    font-size: 17.5px;
    font-weight: bold;
    margin: 10px 0 5px 5%;
    background-color: lime;
`
const CurrentStateContainer = Styled(Left)`
    width: 90%;
    height: 90px;
    margin: 0 0 0 5%;
    background-color: orange;
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////