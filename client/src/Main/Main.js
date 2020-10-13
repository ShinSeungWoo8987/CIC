import React, {useContext} from 'react';
import Styled from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Store from '../Store/Store';

function Main() {
    const {globalState, globalStateDispatch} = useContext(Store);
    // Menu List
    const menuList = [
        {id: 'all', title: '전체'},
        {id: 'new', title: '신규'},
        {id: 'closeSoon', title: '마감임박'},
        {id: 'close', title: '마감'}
    ]
    // Menu List Setting
    const menu = [];
    var i = 0;
    while(i <menuList.length){
        if(globalState.sub === menuList[i].id){
            menu.push(
                <A key={i} id={menuList[i].id} onClick={(e)=>changeState(e)}>
                <SelectMenuContainer>
                    <TextContainer>
                    <Text>{menuList[i].title}</Text>
                    </TextContainer><br/>
                </SelectMenuContainer>
                </A>
            )
        }else{
            menu.push(
                <A key={i} id={menuList[i].id} onClick={(e)=>changeState(e)}>
                <MenuContainer >
                    <TextContainer>
                    <Text>{menuList[i].title}</Text>
                    </TextContainer><br/>
                </MenuContainer>
                </A>
            )
        }
        i += 1;
    }
    // Selected Menu Setting
    const changeState = (e) => {
        e.preventDefault();
        let newGlobalState;
        newGlobalState = {
            main: globalState.main,
            sub: e.currentTarget.id
        }
        globalStateDispatch( { type: 'GLOBAL', payload: newGlobalState });
        console.log(newGlobalState);
    }
    return(
        <Container>
            <Menu>
                {menu}      
            </Menu>
        </Container>
    );
}
export default Main;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Left = Styled.div`
    float: left;
`
const Container = Styled(Left)`
    width: 1665px;
    height: 919px;
    text-align: center;
`
const Menu = Styled.div`
    display: inline-block;
    margin: 0 auto;
`
const MenuContainer = Styled(Left)`
  padding: 0 50px 0 0;

  &:hover {
    font-weight: bold;
  }
`
const SelectMenuContainer = Styled(MenuContainer)`  
  font-weight: bold;
  text-shadow: 1px 1px 2px gray;
`
const TextContainer = Styled(Left)`
  height: 50px;
  line-height :50px;
`
const Text = Styled.div`
font-size: 17.5px;
`
const A = Styled.a`
  cursor: pointer;
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////