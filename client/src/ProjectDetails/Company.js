import React, { useContext } from 'react';
import styled from 'styled-components';
import Store from '../Store/Store';

// 이메일 추가할 것???

function Company(props) {
    const { projectInformation } = useContext(Store);
    return <Container>
        <Logo><LogoImg src={projectInformation.logo}></LogoImg></Logo>
        <CompanyInfo>
            <Creator>{projectInformation.creator}</Creator>
            <Email>Email@eamil.com</Email>
        </CompanyInfo>
    </Container>;
}

export default Company;
const Container = styled.div`
    position: fixed;
    width: 306px;
    height: 50px;
    margin: 750px 0 0 0;
`
const Logo = styled.div`
    float:left;
    width: 50px;
    height: 50px;
`
const LogoImg = styled.img`
    border: 1px solid black;
    width:45px; height:45px;
    margin: 2.5px 2.5px;
    border: none;
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