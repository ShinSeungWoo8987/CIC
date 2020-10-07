import React, { useContext } from 'react';
import Login from './Login.js'
import Register from './Register.js'
import Styled from 'styled-components'; // Styled-components 라이브러리를 사용하기 위해 선언
import Store from '../Store/store.js';

function Menu() {
  const {example, exampleDispatch} = useContext(Store);
    return (
      <Container>
        <Login/>
        {/*<button onClick={()=>exampleDispatch( {type: 'DEFAULT',payload: example+1} )}>{example}</button>*/}
        <Register/>
      </Container>
    );
  }
  export default Menu;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Left = Styled.div`
  float: left;
`
const Container = Styled(Left)`
  float: left;
  width: 12.5%;
  height: 50px;
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////