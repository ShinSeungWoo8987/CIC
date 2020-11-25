import React, { useContext } from 'react';
import styled from 'styled-components';
import Store from '../Store/Store';

// 이메일 추가할 것???

function Company(props) {
    const { projectInformation } = useContext(Store);
    console.log(projectInformation);
    return <Container>
        <Logo><LogoImg src={projectInformation.logo}></LogoImg></Logo>
        <CompanyInfo>
            <Creator>{projectInformation.creator}</Creator>
            <Email>{projectInformation.email}</Email>
        </CompanyInfo>
    </Container>;
}

export default Company;
const Container = styled.div`
    position: fixed;
    width: 306px;
    margin: 750px 0 0 0;
`
const Logo = styled.div`
    float:left;
`
const LogoImg = styled.img`
    width: 50px;
    height: 50px;
    margin: 2.5px;
    border: none;
`
const CompanyInfo = styled.div`
    float:left;
    width: 241px;
    margin-left: 10px;
    text-align: left;
`
const Creator = styled.div`
    font-size: 20px;
    font-weight: normal;
`
const Email = styled.div`
    font-size: 15px;
    font-weight: normal;
    color: grey;
`