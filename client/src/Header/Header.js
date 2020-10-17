import React, { useContext } from 'react';
import Styled from 'styled-components'; // Styled-components 라이브러리를 사용하기 위해 선언
import Store from '../Store/Store';
import Logo from './Logo'
import SubMenu from './SubMenu';

function Header() {
  var idx = 0;
  const { globalState } = useContext(Store);
  const mainPage = ['all', 'tech', 'travel', 'fashion']; // Main Page Menu List
  let mainPageSubMenut = '';
  while (idx<mainPage.length){
    if(mainPage[idx] === globalState.main){
      mainPageSubMenut = <SubMenu/>
      break;
    }
    idx += 1;
}
  return (
    <Container>
          <Logo/>
          {mainPageSubMenut}
    </Container>
  );
}
export default Header;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Container = Styled.div`
  position: fixed;
  float: left;
  width: 98%;
  height: 50px;
  margin: 0 1%;
  background-color: white;
  opacity: 0.8;
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
