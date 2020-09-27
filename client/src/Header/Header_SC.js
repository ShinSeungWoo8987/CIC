import React from 'react';
import styled from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Login from './Login_SC_Test.js';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Left = styled.div`
    float: left;
`
const Header = styled(Left)`
    width: 100%;
    color: white;
`
const Container = styled.div`
    position: relative;
    left: 5%;
    width: 90%;
    margin: 30px 0 0 0;
`
const Logo = styled(Left)`
    width: 800px;
    font-size: 90px;
    line-height: 90px;
`
const MenuContainer = styled(Left)`
    width: 550px;
    padding: 49.5px 0 0 0;
`
const Menu = styled.div`
    float: right;
    font-size: 30px;
    padding: 0 0 0 25px;
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Header_SC() {
  return (
    <Header>
        <Container>
            <Logo>
                LOGO
            </Logo>
            <MenuContainer>
                <Menu>
                    이벤트
                </Menu>
                <Menu>
                    공지사항
                </Menu>
                <Menu>
                    고객센터
                </Menu>
            </MenuContainer>
            <MenuContainer>
                <Menu>
                    회원가입
                </Menu>
                <Menu>
                    <Login></Login>
                </Menu>
            </MenuContainer>
        </Container>
    </Header>
  );
}

export default Header_SC;