import React from 'react';
import styled, {createGlobalStyle} from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Header from './Header/Header.js'
import MenuBar from './MenuBar/Menubar.js'
import ClientStore from './Store/ClientStore.js';

function App() {
  return (
    <ClientStore>
      <Container>
        <GlobalStyle/>
        <Header/>
        <MenuBar/>
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
