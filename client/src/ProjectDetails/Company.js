import React from 'react';
import styled from 'styled-components';

function Company(props) {
    return <Container>
        <Logo><LogoImg>LOGO</LogoImg></Logo>
        <CompanyInfo>
            <Creator>창작자 명</Creator>
            <Email>Email@eamil.com</Email>
        </CompanyInfo>
    </Container>;
}

export default Company;
const Container = styled.div`
width: 306px;
height: 50px;
margin-top: 800px;
`
const Logo = styled.div`
float:left;
width: 50px;
height: 50px;
`
const LogoImg = styled.div`
border: 1px solid black;
width:45px; height:45px;
margin: 2.5px 2.5px;
`
const CompanyInfo = styled.div`
float:left;
width: 241px;
margin-left: 10px;
text-align: left;
`
const Creator = styled.div`
`
const Email = styled.div`
margin-top: 8px;
color: grey;
`