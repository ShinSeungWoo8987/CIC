import React, { useContext } from 'react';
import Styled from 'styled-components';
import Store from '../Store/Store';

function SubMenu(){
    const { globalState, globalStateDispatch, pageNumberDispatch, searchDispatch } = useContext(Store);
    const mainPage = ['all', 'tech', 'travel', 'fashion']; // Main Page Menu List
    const projectListPage = ['fundingList','projectList','projectListAll']
    let menuList = [];
    const menu = [];
    // Main Page, Sub Menu Setting
    var idx=0;
    while(idx<mainPage.length){
        if(mainPage[idx]===globalState.main){
            menuList = [
                {id: 'all', title: '전체'},
                {id: 'new', title: '신규'},
                {id: 'closeSoon', title: '마감임박'},
                {id: 'close', title: '마감'}
            ];
        }
        idx++;
    }
    // Funding List & Project List & All Project List, Sub Menu Setting
    idx = 0;
    while(idx<projectListPage.length){
        if(projectListPage[idx]===globalState.main){
            menuList = [
                {id: 'continue', title: '진행중'},
                {id: 'close', title: '마감'}
            ]
        }
        idx++;
    }
    if(globalState.main==='projectDetails'){
        if(globalState.sub !== 'editProject'){
            menuList = [
                {id: 'introduction', title: '소개'},
                {id: 'recentlyNews', title: '최근소식'},
                {id: 'supportMessage', title: '참여자 응원'}
            ]
        }
    }
    // Selected Sub Menu Setting
    const changMenuState = (e) => {
        e.preventDefault();
        const newGlobalState = {
            main: globalState.main,
            sub: e.currentTarget.id,
            action: 1,
            num:0
        }
        globalStateDispatch( { type: 'GLOBAL', payload: newGlobalState });
        pageNumberDispatch({ type: 'DEFAULT'});
        searchDispatch({type:'DEFAULT'});
    }
    // Sub Menu List Setting
    idx=0;
    while(idx<menuList.length){
        if(globalState.sub === menuList[idx].id){
            menu.push(
                <SelectMenuContainer key={idx} id={menuList[idx].id} onClick={(e)=>changMenuState(e)}>
                    <TextContainer>
                    <Text borderBottom='3px solid #83E538'>{menuList[idx].title}</Text>
                    </TextContainer><br/>
                </SelectMenuContainer>
            )
        }else{
            menu.push(
                <MenuContainer key={idx} id={menuList[idx].id} onClick={(e)=>changMenuState(e)}>
                    <TextContainer>
                    <Text>{menuList[idx].title}</Text>
                    </TextContainer><br/>
                </MenuContainer>
            )
        }
        idx += 1;
    }
    return(
        <Container
            color={globalState.sub==='editProject'?"none":"white"}
            margin={globalState.main==='projectDetails'?"265px":"0px"} 
            width={globalState.main==='projectDetails'?"1010.7px":"1920px"}
            height={globalState.main==='event' || globalState.main==='notice' || globalState.main==='center' ||
                    globalState.main==='adminGradeUp' || globalState.main==='userList' ||
                    globalState.main==='gradeUp' || globalState.main==='addProject'?'0px':'auto'}>
            <Menu>
                <AlignCenter>
                    {menu}
                </AlignCenter>
            </Menu>
        </Container>
    )
}
export default SubMenu;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Left = Styled.div`
    float: left;
`
const Container = Styled(Left)`
    width: ${({width}) => width};
    height: ${({height}) => height};
    margin: ${({margin}) => "0 0 0 "+margin};
    opacity: 0.8;
    background-color: ${({color}) => color};
`
const Menu = Styled(Left)`
    position: relative;
    left: 50%;
    transform: translate(-50%);
    height: 34px;
    line-height: 34px;
    margin: 10px 0 0 0;
    border-bottom: 1px solid lightgrey;
`
const MenuContainer = Styled(Left)`
    font-weight: normal;
    color: #A3A3A3;
    cursor: pointer; 
    
    &:hover {
        color: black;
        font-weight: bold;
    }
`
const SelectMenuContainer = Styled(MenuContainer)`  
    font-weight: bold;
    color: black;
    text-shadow: 1px 1px 2px gray;
`
const AlignCenter = Styled(Left)`
    position: relative;
    left: 50%;
    transform: translate(-50%);
`
const TextContainer = Styled(Left)`
    
`
const Text = Styled.div`
    height: 32px;
    border-bottom: ${({ borderBottom }) => `${borderBottom}`};
    font-size: 17.5px;
    padding: 0 20px;
    margin: 0 20px;
    z-index: 3;
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////