import React, { useContext } from 'react';
import styled from 'styled-components';
import Store from '../Store/Store';

function FundingMember({id,name,phone,address,cnt, border, top, bottom, color, foneWeight}) {
    return (
        <Container border={border} borderTop={top} borderBottom={bottom} color={color} foneWeight={foneWeight}>
            <Id>{id}</Id>
            <Name>{name}</Name>
            <Phone>{phone}</Phone>
            <Address>{address}</Address>
            <Cnt>{cnt}</Cnt>
        </Container>
    );
}

export default FundingMember;
const Container = styled.div`
width: 100%;
height: 30px;
line-height: 30px;
border: ${({border})=>`${border}`};
border-top: ${({borderTop})=>`${borderTop}`};
border-bottom: ${({borderBottom})=>`${borderBottom}`};
padding: 5px 0;
box-shadow: 0px 2px 3px lightgray;
font-size: 16px;
font-weight: ${({foneWeight})=>`${foneWeight}`};
text-align: center;
background-color: ${({color})=>`${color}`};
`
const Id = styled.div`
float: left;
width: 17.5%;
`
const Name = styled.div`
float: left;
width: 15%;

`
const Phone = styled.div`
float: left;
width: 17.5%;
`
const Address = styled.div`
float: left;
width: 40%;

`
const Cnt = styled.div`
float: left;
width: 10%;
`