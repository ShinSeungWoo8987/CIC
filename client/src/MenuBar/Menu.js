import React, { useContext } from 'react';
import Styled from 'styled-components'; // Styled-components 라이브러리를 사용하기 위해 선언
import Store from '../Store/Store';
import Login from './Login'
import Register from './Register'


function Menu() {
  const { session } = useContext(Store);
  const login = <LoginContainer><Login/><Register/></LoginContainer>; // When Non-Login, View
  const logout = <LogoutContainer><Login/></LogoutContainer>; // When Login, View
  const menu=session.state?logout:login;
    return menu;
  }
  export default Menu;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Left = Styled.div`
  float: left;
`
const LoginContainer = Styled(Left)`
  width: 80%;
  margin: 50px 0 20px 17.5px;
`
const LogoutContainer = Styled(LoginContainer)`
  position: relative;
  left: 25%;
  width: 40%;
  margin: 50px 0 20px 0px;
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////