import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Styled from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Store from '../Store/Store';
import BoardItem from './BoardItem';
import {get} from 'axios';

function ReadBoard() {
    const { globalState, globalStateDispatch } = useContext(Store);
    
    let selected = '';
    let navItem = [
        <LineSection key='1' id='event'>&nbsp;&nbsp;이벤트&nbsp;&nbsp;</LineSection>,
        <Section key='2' id='notice' onClick={e=>changeGlobalState(e)}>&nbsp;공지사항&nbsp;</Section>,
        <Section key='3' id='center' onClick={e=>changeGlobalState(e)}>&nbsp;고객센터&nbsp;</Section>
    ]
    if(globalState.main==='event') {
        selected = '이벤트';
    }
    if(globalState.main==='notice') {
        selected = '공지사항';
        navItem = [
            <Section key='1' id='event' onClick={e=>changeGlobalState(e)}>&nbsp;&nbsp;이벤트&nbsp;&nbsp;</Section>,
            <LineSection key='2' id='notice'>&nbsp;공지사항&nbsp;</LineSection>,
            <Section key='3' id='center' onClick={e=>changeGlobalState(e)}>&nbsp;고객센터&nbsp;</Section>
        ]
    }
    if(globalState.main==='center') {
        selected = '고객센터';
        navItem = [
            <Section key='1' id='event' onClick={e=>changeGlobalState(e)}>&nbsp;&nbsp;이벤트&nbsp;&nbsp;</Section>,
            <Section key='2' id='notice' onClick={e=>changeGlobalState(e)}>&nbsp;공지사항&nbsp;</Section>,
            <LineSection key='3' id='center'>&nbsp;고객센터&nbsp;</LineSection>
        ]
    }
    
    const boardItemList = [
        {title: 'Title', name: 'Creator', date: '2020.09.18'},
        {title: 'Title', name: '관리자', date: '2020.09.20'},
        {title: 'Title', name: '내가내다', date: '2020.10.20'},
        {title: 'Title', name: '신승우', date: '2020.11.20'},
        {title: 'Title', name: '신승우', date: '2020.11.20'},
        {title: 'Title', name: '신승우', date: '2020.11.20'},
        {title: 'Title', name: '신승우', date: '2020.11.20'}
    ]
    const _boardItem = boardItemList.map( ({title,name,date}, idx)=>{
        return <BoardItem key={idx} title={title} name={name} date={date} />;
    });
    const changeGlobalState = e=>{
        e.preventDefault();
        const newGlobalState = {
            main: e.target.id,
            sub: 'all',
        }
        globalStateDispatch( { type: 'GLOBAL', payload: newGlobalState });
    }
    let _main = 'Event';
    if(globalState.main==='notice') _main = 'Notice'
    if(globalState.main==='center') _main = 'Center'
    
    const writeBoard = (e)=>{
        e.preventDefault();
        globalStateDispatch({type:'GLOBAL', payload: {
            main: `add${_main}`,
            sub: 'all',
            action: ''
        }})
    }
    const deleteBoard = (e)=>{
        e.preventDefault();
        globalStateDispatch({type:'GLOBAL', payload: {
            main: `delete${_main}`,
            sub: 'all',
            action: ''
        }})
    }

    return(
        <Container>
            <Center>
                <Nav>
                    <Head>{selected}</Head>
                    <NavItem>
                        {navItem}
                    </NavItem>
                </Nav>
                <List>
                    {_boardItem}
                </List>
                <Search>
                    <EditBoard>
                        <button onClick={e=>writeBoard(e)}>글작성</button>
                        <button onClick={e=>deleteBoard(e)}>삭제</button>
                    </EditBoard>
                    <SearchDiv>
                        <SearchInput type="text" placeholder="검색어 입력"/>
                        <SearchButton>검색</SearchButton>
                    </SearchDiv>
                    <br/>
                    [이전] [1] [2] [3] [4] [다음]
                </Search>
            </Center>
        </Container>
    );
}
export default ReadBoard;

const Left = Styled.div`
    float: left;
`
const Container = Styled(Left)`
    margin-left: 110px;
    width: 100%;
    height: 880px;
`
const Center = Styled.div`
    margin: 0 auto;
    width: 100%;
    width: 60%;
`
const Nav = styled.div`
float: left;
width: 100%;
height: 112px;
text-align: center;
`
const Head = styled.div`
padding-top: 10px;
font-size: 38px;
font-weight: bold;
`
const NavItem = styled.div`
padding: 0 25%;
margin-top: 16px;
width: 50%;
height: 32px;
font-size: 18px;
border-bottom: 1px solid lightgrey;
`
const Section = styled.div`
    cursor: pointer;
    z-index: 3;
    height: 30px;
    float: left;
    margin: 0 31px;
`
const LineSection = styled.div`
    cursor: pointer;
    z-index: 3;
    height: 30px;
    border-bottom: 3px solid #83E538;
    float: left;
    margin: 0 31px;
`
const List = styled.div`
float: left;
width: 100%;
height: 650px;
`
const Search = styled.div`
float: left;
margin: 15px auto 0 auto;
width: 100%;
height: 100px;
text-align: center;
`
const EditBoard = styled.div`
text-align: right;
width: 100%;
`
const SearchDiv = styled.div`
margin: 0 auto;
height: 30px;
width: 400px;
border-radius: 6px;
border: 1px solid #A6A6A6;
background: white;
`
const SearchInput = styled.input`
font-size: 16px;
width: 325px;
height: 10px;
padding: 10px;
border: 0px;
outline: none;
float: left;
`
const SearchButton = styled.button`
cursor: pointer;
width: 50px;
height: 100%;
border: 0px;
outline: none;
float: right;
color: white;
font-size: 16px;
font-weight: bold;
background-color: #A6A6A6;
`