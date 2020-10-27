import React, { useContext, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Styled from "styled-components"
import Store from '../Store/Store';
import BoardItem from './BoardItem';
import { get } from 'axios';
import BoardDetails from './BoardDetails';

function ReadBoard() {
    const { globalState, globalStateDispatch, boardItemList, boardItemListDispatch } = useContext(Store);
    const [itemCnt, setItemCnt] = useState(1);
    const searchRef = useRef();
    const [keyword, setKeyword] = useState();
    useEffect(() => {
        get(`http://localhost:5000/${globalState.main}Cnt`)
            .then(({ data }) => {
                console.log(data);
                setItemCnt(parseInt(Number(data) / 7) + 1);
            })
            .catch(err => console.log(err));

        get(`http://localhost:5000/${globalState.main}list/${globalState.action}${keyword?`/${keyword}`:''}`)
            .then(({ data }) => {
                boardItemListDispatch({ type: 'CHANGE', payload: data.slice(0, 7) });
            })
            .catch(err => console.log(err));
    }, [globalState,keyword]);

    let selected = '';
    let navItem = [
        <LineSection key='1' id='event'>&nbsp;&nbsp;이벤트&nbsp;&nbsp;</LineSection>,
        <Section key='2' id='notice' onClick={e => changeGlobalState(e)}>&nbsp;공지사항&nbsp;</Section>,
        <Section key='3' id='center' onClick={e => changeGlobalState(e)}>&nbsp;고객센터&nbsp;</Section>
    ]
    if (globalState.main === 'event') {
        selected = '이벤트';
    }
    if (globalState.main === 'notice') {
        selected = '공지사항';
        navItem = [
            <Section key='1' id='event' onClick={e => changeGlobalState(e)}>&nbsp;&nbsp;이벤트&nbsp;&nbsp;</Section>,
            <LineSection key='2' id='notice'>&nbsp;공지사항&nbsp;</LineSection>,
            <Section key='3' id='center' onClick={e => changeGlobalState(e)}>&nbsp;고객센터&nbsp;</Section>
        ]
    }
    if (globalState.main === 'center') {
        selected = '고객센터';
        navItem = [
            <Section key='1' id='event' onClick={e => changeGlobalState(e)}>&nbsp;&nbsp;이벤트&nbsp;&nbsp;</Section>,
            <Section key='2' id='notice' onClick={e => changeGlobalState(e)}>&nbsp;공지사항&nbsp;</Section>,
            <LineSection key='3' id='center'>&nbsp;고객센터&nbsp;</LineSection>
        ]
    }

    let _boardItem = '';
    if (boardItemList) {
        if (globalState.main === 'event') _boardItem = boardItemList.map(({ eve_NUMBER, eve_THUMBNAIL, eve_TITLE, mem_ID, eve_REGISTER }, idx) => <BoardItem key={idx} id={eve_NUMBER} image={eve_THUMBNAIL} title={eve_TITLE} name={mem_ID} date={eve_REGISTER} />);
        if (globalState.main === 'notice') _boardItem = boardItemList.map(({ not_NUMBER, image, not_TITLE, mem_ID, not_REGISTER }, idx) => <BoardItem key={idx} id={not_NUMBER} image={image} title={not_TITLE} name={mem_ID} date={not_REGISTER} />);
        if (globalState.main === 'center') _boardItem = boardItemList.map(({ ser_NUMBER, image, ser_TITLE, mem_ID, ser_REGISTER }, idx) => <BoardItem key={idx} id={ser_NUMBER} image={image} title={ser_TITLE} name={mem_ID} date={ser_REGISTER} />);
    }
    const changeGlobalState = e => {
        e.preventDefault();
        const newGlobalState = {
            main: e.target.id,
            sub: 'all',
            action: 1,
            num: 0
        }
        globalStateDispatch({ type: 'GLOBAL', payload: newGlobalState });
    }
    let _main = 'Event';
    if (globalState.main === 'notice') _main = 'Notice'
    if (globalState.main === 'center') _main = 'Center'

    const writeBoard = (e) => {
        e.preventDefault();
        globalStateDispatch({
            type: 'GLOBAL', payload: {
                main: `add${_main}`,
                sub: 'all',
                action: 1,
                num: 0
            }
        })
    }
    const deleteBoard = (e) => {
        e.preventDefault();
        globalStateDispatch({
            type: 'GLOBAL', payload: {
                main: `delete${_main}`,
                sub: 'all',
                action: 1,
                num: 0
            }
        })
    }
    const changePage = e => {
        e.preventDefault();
        globalStateDispatch({
            type: 'GLOBAL', payload: {
                main: globalState.main,
                sub: globalState.sub,
                action: Number(e.target.pathname.split('/')[1]),
                num: globalState.num
            }
        })
    }
    const handleSearch = e=>{
        e.preventDefault();
        setKeyword(searchRef.current.value)
    }
    const setPaging = []
    for (var k = 1; k <= itemCnt; k++) {
        if (globalState.action === k) setPaging.push(
            <SelectedA href={k} onClick={e => e.preventDefault()}> [{k}] </SelectedA>
        );
        else setPaging.push(
            <A href={k} onClick={e => changePage(e)}> [{k}] </A>
        );
    }

    return (
        <Container>
            <Center>
                <Nav>
                    <Head>{selected}</Head>
                    <NavItem>
                        {navItem}
                    </NavItem>
                </Nav>
                {globalState.sub === 'all' ?
                    <>
                        <List>
                            {_boardItem}
                        </List>
                        <Search>
                            <EditBoard>
                                <button onClick={e => writeBoard(e)}>글작성</button>
                                <button onClick={e => deleteBoard(e)}>삭제</button>
                            </EditBoard>
                            <SearchDiv>
                                <SearchInput ref={searchRef} type="text" placeholder="검색어 입력" />
                                <SearchButton onClick={e=>handleSearch(e)}>검색</SearchButton>
                            </SearchDiv>
                            <br />
                            {setPaging}
                        </Search>
                    </>
                    :<BoardDetails/>
                }

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
const A = styled.a`
`
const SelectedA = styled.a`
    font-weight: bold;
`