import React from 'react';
import styled, {createGlobalStyle} from "styled-components"; // styled-components 라이브러리를 사용하기 위해 선언
import ClientStore from './Store/ClientStore';
import Header from './Header/Header';
import MenuBar from './MenuBar/Menubar';
import View from './View/View';
import Footer from './Footer/Footer';

function App() {
  return (
    <ClientStore>
      {/* <img src="https://crowdincreative.s3.ap-northeast-2.amazonaws.com/static/SelectUpdateUser.png"/> */}
      <Container>
        <GlobalStyle/>
        <Header/>
        <MenuBar/>
        <View/>
        <Footer/>
      </Container>
    </ClientStore>
  );
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Container = styled.div`
  width: 1903px;
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default App;
