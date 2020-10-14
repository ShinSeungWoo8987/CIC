import React from 'react';
import Styled from 'styled-components'; // Styled-components 라이브러리를 사용하기 위해 선언
import Search from './Search';
import Menu from './Menu';
import DefaultMenu from './DefaultMenu';
import MyInformation from './MyInformation';

function MenuBar() {
    return (
      <Container>
        <Search/>
        <Menu/>
        <BottomLine/>
        <DefaultMenu/>
        <MyInformation/>
      </Container>
    );
  }
export default MenuBar;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Left = Styled.div`
  float: left;
`
const Container = Styled(Left)`
  float: left;
  width: 12.5%;
  height: 858px;
  margin: 10px 0 0 0;
  background-color: #FAFAFA;
`
const BottomLine = Styled(Left)`
  width: 100%;
  border-bottom: 1px solid #E1E1E1;
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////