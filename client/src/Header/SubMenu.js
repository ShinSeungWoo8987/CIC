import React, { useContext } from 'react';
import Styled from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Store from '../Store/Store';

function SubMenu() {
    var idx = 0;
    const {globalState, globalStateDispatch} = useContext(Store);
    const menuList = [
        {id: 'all', title: '전체'},
        {id: 'new', title: '신규'},
        {id: 'closeSoon', title: '마감임박'},
        {id: 'close', title: '마감'}
    ];
    const menu = [];
    // Menu List Setting
    while(idx<menuList.length){
        if(globalState.sub === menuList[idx].id){
            menu.push(
                <A key={idx} id={menuList[idx].id} onClick={(e)=>changMenuState(e)}>
                <SelectMenuContainer>
                    <TextContainer>
                    <Text>{menuList[idx].title}</Text>
                    </TextContainer><br/>
                </SelectMenuContainer>
                </A>
            )
        }else{
            menu.push(
                <A key={idx} id={menuList[idx].id} onClick={(e)=>changMenuState(e)}>
                <MenuContainer >
                    <TextContainer>
                    <Text>{menuList[idx].title}</Text>
                    </TextContainer><br/>
                </MenuContainer>
                </A>
            )
        }
        idx += 1;
    }
    // Selected Menu Setting
    const changMenuState = (e) => {
        e.preventDefault();
        const newGlobalState = {
            main: globalState.main,
            sub: e.currentTarget.id
        }
        globalStateDispatch( { type: 'GLOBAL', payload: newGlobalState });
    }
    return(
        <Menu>
            {menu}   
        </Menu>
    );
}
export default SubMenu;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Left = Styled.div`
    float: left;
`

const Menu = Styled(Left)`
    position: relative;
    left: 43.75%;
    margin: 0 0 0 -187.5px;
    width: 375px;
`
const MenuContainer = Styled(Left)`
    padding: 0 25px;

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
    line-height: 50px;
`
const Text = Styled.div`
    font-size: 17.5px;
`
const A = Styled.a`
    cursor: pointer;
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////