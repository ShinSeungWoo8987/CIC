import React from 'react';
import Styled from 'styled-components'; // Styled-components 라이브러리를 사용하기 위해 선언
import Search from './Search';
import Menu from './Menu';
import DefaultMenu from './DefaultMenu';
import MyInformation from './MyInformation';
import UpdateUser from './UpdateUser';
import Authority from './Authority';
import Postcode from '../Components/Postcode';

function MenuBar() {
    return (
      <Container>
        <Search/>
        <Menu/>
        <BottomLine/>
        <DefaultMenu/>
        <MyInformation/>
        <Postcode/>
        <UpdateUser/>
        <Authority/>
      </Container>
    );
  }
export default MenuBar;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Left = Styled.div`
    float: left;
`
const Container = Styled(Left)`
    position: fixed;
    top: 50px;
    float: left;
    width: 237.5px;
    height: 910px;
    margin: 10px 0 0 0;
    background-color: #FAFAFA;
`
const BottomLine = Styled(Left)`
    width: 100%;
    border-bottom: 1px solid #E1E1E1;
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////