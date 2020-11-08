import React, { useContext } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import Store from '../Store/Store';

function ChargeItem({number, date, money, state, header}) {
    const fontWeight = header==='yes'?'bold':'';
    return (
        <Container fontWeight = {fontWeight}>
            <Number>{number}</Number>
            <Date>{date}</Date>
            <Money>{money}</Money>
            <State>{state}</State>
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
const Number = styled(Common)` 

    width: 10%;
`
const Date = styled(Common)`
    width: 45%;
`
const Money = styled(Common)`
    width: 25%;
`
const State = styled(Common)`
    width: 20%
` 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////