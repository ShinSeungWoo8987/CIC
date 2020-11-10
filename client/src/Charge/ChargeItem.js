import React, { useContext } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import Store from '../Store/Store';

function ChargeItem({date, detail, money, state, header}) {
    const fontWeight = header==='yes'?'bold':'';
    
    let year, month, day;
    let _date;
    
    if(date!=='날짜'){
        year = date.split('-')[0]
        month = date.split('-')[1]
        day = date.split('-')[2]
        _date = `${year.substr(0,2)}.${month}.${day.substr(0,8)}`
    }

    return (
        <Container fontWeight = {fontWeight}>
            <Date>{date!=='날짜'?_date:date}</Date>
            <Detail>{detail}</Detail>
            <Money>{money}</Money>
            <State>{state===0?'충전':'사용'}</State>
        </Container>
    );
}
export default ChargeItem;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Container = styled.div`
    width: 560px;
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid #FAFAFA;
    font-weight: ${({fontWeight})=>`${fontWeight}`};
`
const Common = styled.div`
    float: left;
    text-align: center;
`
const Date = styled(Common)`
    width: 25%;
`
const Detail = styled(Common)`
    width: 39%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
`
const Money = styled(Common)`
    width: 18%;
`
const State = styled(Common)`
    width: 18%
` 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////