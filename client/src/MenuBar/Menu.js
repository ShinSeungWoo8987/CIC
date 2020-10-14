import React, { useContext } from 'react';
import Login from './Login'
import Register from './Register'
import Styled from 'styled-components'; // Styled-components 라이브러리를 사용하기 위해 선언
import Store from '../Store/Store';


function Menu() {
  const login = <LoginContainer><Login/><Register/></LoginContainer>; // When Non-Login, View
  const logout = <LogoutContainer><Login/></LogoutContainer>; // When Login, View
  const { session } = useContext(Store); // Login State
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
  margin: 40px 0 10px 17.5px;
`
const LogoutContainer = Styled(LoginContainer)`
  position: relative;
  left: 25%;
  width: 40%;
  margin: 40px 0 10px 0px;
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////