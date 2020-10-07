import React, { useContext } from 'react';
import Logo from './Logo.js'
import Search from './Search.js'
import Menu from './Menu.js'
import Styled from 'styled-components'; // Styled-components 라이브러리를 사용하기 위해 선언

function Header() {
  return (
    <Container>
        <Logo/>
        <Search/>
        <Menu/>
    </Container>
  );
}
export default Header;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Container = Styled.div`
  width: 98%;
  margin: 10px 1% 0 1%;
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
