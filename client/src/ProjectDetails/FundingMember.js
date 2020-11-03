import React from 'react';
import styled from 'styled-components';

function FundingMember({id, title, period, name, phone, address, cnt, border, top, bottom, color, foneWeight, zIndex, type, act, header}) {
    return <>
        {type==='delete'?
            <>
            {header==='true'?
                <Container border={border} borderTop={top} borderBottom={bottom} color={color} foneWeight={foneWeight} zIndex={zIndex}>
                    <Title>{title}</Title>
                    <Period>{period}</Period>
                    <Name_>{name}</Name_>
                    <Address>{address}</Address>
                    <Act>{act}</Act>
                </Container>
                :
                <Container border={border} borderTop={top} borderBottom={bottom} color={color} foneWeight={foneWeight} zIndex={zIndex}>
                    <Title>{title}</Title>
                    <Period>{period}</Period>
                    <Name_>{name}</Name_>
                    <Address>{address}</Address>
                    <Act_>{act}</Act_>
                </Container>
            }
            </>
            :
            <Container border={border} borderTop={top} borderBottom={bottom} color={color} foneWeight={foneWeight} zIndex={zIndex}>
                <Id>{id}</Id>
                <Name>{name}</Name>
                <Phone>{phone}</Phone>
                <Address>{address}</Address>
                <Cnt>{cnt}</Cnt>
            </Container>
        }
        </>
}

export default FundingMember;
const Container = styled.div`
width: 100%;
height: 30px;
line-height: 30px;
border: ${({border})=>`${border}`};
border-top: ${({borderTop})=>`${borderTop}`};
border-bottom: ${({borderBottom})=>`${borderBottom}`};
box-shadow: 0px 3px #FAFAFA;
padding: 5px 0;
font-size: 16px;
font-weight: ${({foneWeight})=>`${foneWeight}`};
text-align: center;
background-color: ${({color})=>`${color}`};
z-index: ${({zIndex})=>`${zIndex}`};
`
const Id = styled.div`
    float: left;
    width: 17.5%;
`
const Title = styled.div`
    float: left;
    width: 33%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`
const Period = styled.div`
    float: left;
    width: 19%;
    z-index: 0;
`
const Name = styled.div`
    float: left;
    width: 15%;
`
const Name_ = styled(Name)`
    width: 10%;
`
const Phone = styled.div`
float: left;
width: 17.5%;
`
const Address = styled.div`
float: left;
width: 30%;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
`
const Cnt = styled.div`
float: left;
width: 10%;
`
const Act = styled.div`
    float: left;
    width: 8%;
`
const Act_ = styled(Act)`
    float: left;
    cursor: pointer;

    &:hover {
        font-size: 17.5px;
        
        animation-duration: 1s;
        animation-name: danger;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
    }

    @keyframes danger {
        0% {
            color: black;
        }
        40% {
            color: red;
        }
        50% {
            color: red;
            font-weight: bold;
        }
        90% {
            color: black;
            font-weight: bold;
        }
        100% {
            color: black;
        }
    }
`