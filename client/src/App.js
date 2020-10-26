import React from 'react';
import styled, { createGlobalStyle } from "styled-components"; // styled-components 라이브러리를 사용하기 위해 선언
import ClientStore from './Store/ClientStore';
import Head from './Header/Head';
import View from './View/View';

function App() {
    return (
        <ClientStore>
            <Container>
                <GlobalStyle />
                <Header>
                    <Head/>
                </Header>
                <Main>
                    <View/>
                </Main>
            </Container>
        </ClientStore>
    );
}
export default App;

const Container = styled.div`
  margin: 0 auto;
  background-color: #F9F9F9;
  width: 1920px;
  min-height: 100vh-106px;
`
const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
  }
  a {
    text-decoration: none;
    color: black;

    &:visited {
      text-decoration: none;
      color: black;
    }
  }
`
const Header = styled.div`
background-color: #E6E6E6;
width: 1460px;
height: 46px;
padding: 0 230.2px;
z-index: 1;
`
const Main = styled.div`
  margin-left: 120px;
  width: 76%;
  height: 890px;
  text-align: left;
`
