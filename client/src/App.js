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
  width: 1900px;
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
width: 1460px;
height: 46px;
`
const Main = styled.div`
  width: 76%;
  margin: 50px 0 0 120px;
`
