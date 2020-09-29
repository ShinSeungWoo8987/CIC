import React from 'react';
import {createGlobalStyle} from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Header from './Header/Header'
import Main from './Main/Main'
import axios from 'axios'

function App() {
  axios.get('/type').then((res)=>console.log(res))
  .catch((error)=>console.log(error))
  .then(()=>{
    //이후 할 행동 추가
  });
  axios.get('/project').then((res)=>console.log(res))
  .catch((error)=>console.log(error))
  .then(()=>{
    //이후 할 행동 추가
  });

  return (
    <div className="App">
      <GlobalStyle/>
      <Header/>
      <Main/>
    </div>
  );
}

export default App;
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