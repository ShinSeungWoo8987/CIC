import React, {useContext, useEffect, useState} from 'react';
import Styled from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Store from '../Store/Store';
import Item from '../Components/Item';
import { post } from 'axios'

// 나중에 펀딩인원수 계산하여 추가할 것

function Main() {
    const { globalState, globalStateDispatch, searchProject, mainPageCnt, mainPageCntDispatch, searchProjectDispatch } = useContext(Store);
    const [ projectList, setProjectList ] = useState('');
    const [ currnetPageProjectCnt, setCurrnetPageProjectCnt] = useState('');
    const mainPage = ['all', 'tech', 'travel', 'fashion']; // Main Page Menu List
    let menuList = [];
    const menu = [];
    const buttonImg = `https://crowdincreative.s3.ap-northeast-2.amazonaws.com/static/`;
    const projectCnt = 8
    const fundingCount = 1000;
    // Get Project List
    useEffect(() => {
        const newProjectList = [];
        const url = '/project/list';
        const data = {
            page: mainPageCnt.value+'',
            search: searchProject.value,
            main: globalState.main,
            sub: globalState.sub
        }
        post(url, data).then(res=>{
            setCurrnetPageProjectCnt(res.data.length);
            var idx=0;
            while(idx<res.data.length){
                newProjectList.push(<Item key={idx} number={res.data[idx].pro_number} dDay={res.data[idx].dday} thumbnail={res.data[idx].pro_thumbnail} logo={res.data[idx].pro_logo} 
                    creator={res.data[idx].mem_id} title={res.data[idx].pro_title} targetMoney={res.data[idx].pro_target} saveMoney={res.data[idx].pro_price*fundingCount} fundingCount={fundingCount} price={res.data[idx].pro_price}/>)
                idx++;
            }
            setProjectList(newProjectList);
        })
    }, [ globalState, searchProject, mainPageCnt ]);
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
    // Funding List, Sub Menu Setting
    if(globalState.main==='fundingList'){
        menuList = [
            {id: 'continue', title: '진행중'},
            {id: 'close', title: '종료'}
        ]
    }
    // Sub Menu List Setting
    idx=0;
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
    // Selected Sub Menu Setting
    const changMenuState = (e) => {
        e.preventDefault();
        const newGlobalState = {
            main: globalState.main,
            sub: e.currentTarget.id
        }
        globalStateDispatch( { type: 'GLOBAL', payload: newGlobalState });
        const newMainPageCnt = {
            value: 1
        }
        mainPageCntDispatch({ type: 'MOVE_PAGE', payload: newMainPageCnt});
        const newSearchProject = {
            value: ''
          }
          searchProjectDispatch({type:'SEARCH', payload:newSearchProject});
    }
    // 페이징 관련 문제 해결할 것 - 8개를 기준으로 작성해두었으나 마지막8개만 있는 경우 다음페이지로 이동
    const moveMainPage = (e, direction) => {
        e.preventDefault();
        if(direction==='left' && mainPageCnt.value>1){
            const newMainPageCnt = {
                value: mainPageCnt.value-1
            }
            mainPageCntDispatch({ type: 'MOVE_PAGE', payload: newMainPageCnt});
        }
        if(direction==='right' && currnetPageProjectCnt===projectCnt){
            const newMainPageCnt = {
                value: mainPageCnt.value+1
            }
            mainPageCntDispatch({ type: 'MOVE_PAGE', payload: newMainPageCnt});
        }
    }
    return(
        <Container>
            <Menu>
                {menu}   
            </Menu><br/>
            <SubContainer>
                <LeftSide>
                    <Image src={buttonImg+'LeftMainButton.png'} onClick={(e)=>moveMainPage(e, 'left')}></Image>
                </LeftSide>
                <ItemContainer>
                    {projectList}
                </ItemContainer>
                <RightSide>
                <Image src={buttonImg+'RightMainButton.png'} onClick={(e)=>moveMainPage(e, 'right')}></Image>
                </RightSide>
            </SubContainer>
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
    text-align: center;
`
const Menu = Styled.div`
    display: inline-block;
    margin:  10px 0;
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
    height: 40px;
    line-height: 40px;
`
const Text = Styled.div`
    font-size: 17.5px;
`
const A = Styled.a`
    cursor: pointer;
`
const SubContainer = Styled(Left)`

`
const Image = Styled.img`
    width: 60px;
    vertical-align: middle;
    cursor: pointer;
`
const LeftSide = Styled(Left)`
    width: 100px;
    height: 865px;
    line-height: 800px;
`
const ItemContainer = Styled(Left)`
    width: 1465px;
    height: 100px;
`
const RightSide = Styled(LeftSide)`
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////