import React from 'react';
import {createGlobalStyle} from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Header from './Header/Header_SC'
import Main from './Main/Main_SC'
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #252323;
  }
  a {
    text-decoration: none;

    &:visited {
      text-decoration: none;
    }
  }
  li {
    list-style: none;
  }
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function App() {
  return (
    <div className="App">
      <GlobalStyle/>
      <Header></Header>
      <Main></Main>
    </div>
  );
}

export default App;