import React, { useContext, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Store from '../Store/Store';
import Member from './Member';
import {get} from 'axios';

function MemberList(props) {
    const {globalState, globalStateDispatch} = useContext(Store);
    const searchRef = useRef();
    const [memberList, setMemberList] = useState();
    const [keyword, setKeyword] = useState();
    const [itemCnt, setItemCnt] = useState(1);
    console.log(globalState);
    console.log(keyword);
    
    useEffect(()=>{
        get(`/memberCnt/${globalState.main==='memberList'?'all':'creator_request'}${keyword?`/${keyword}`:''}`)
            .then(({ data }) => {
                setItemCnt(parseInt(Number(data) / 18) + 1);
            })
            .catch(err => console.log(err));

        get(`/member/${globalState.main==='memberList'?'all':'creator_request'}/${globalState.action}${keyword?`/${keyword}`:''}`)
        .then(res=>setMemberList(res.data))
        .catch(err=>console.log(err));
    },[globalState,keyword]);

    const handleSearch = e=>{
        e.preventDefault();
        setKeyword(searchRef.current.value);
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
    return (
        <Container>
            <Center>
                <Nav>
                    <Title>{globalState.main==='memberList'?'회원관리':'창작자 승인'}</Title>
                </Nav>
                <List>
                    <Member key='0' authority='권한' userId='아이디' name='이름' phone='전화번호' birth='생년월일' adress='주소' del='삭제'/>
                    {memberList?
                    memberList.map((i,idx)=><Member key={idx} authority={i.gra_number} userId={i.mem_id} name={i.mem_name} phone={i.mem_phone} birth={i.mem_birth} adress={i.mem_address1+' '+i.mem_address2} del=' X '/>)
                    :'불러오는 중입니다.'}
                </List>
                <Bottom>
                    <SearchDiv>
                        <SearchInput id="searchBox" ref={searchRef} type="text" placeholder="검색어 입력" />
                        <SearchButton onClick={e => handleSearch(e)}>검색</SearchButton>
                    </SearchDiv>
                    <br />
                    {setPaging}
                </Bottom>
            </Center>
        </Container>
    );
}

export default MemberList;

const Container = styled.div`
    float: left;
    margin-left: 110px;
    width: 100%;
    height: 880px;
`
const Center = styled.div`
    margin: 0 auto;
    width: 70%;
`
const Nav = styled.div`
float: left;
width: 100%;
text-align: center;

`
const Title = styled.div`
width: 100%;
padding: 20px 0;
text-align: center;
font-size: 38px;
`
const List = styled.div`
float: left;
margin-top: 30px;
min-height: 570px;
width: 100%;
padding-bottom: 20px;
border-top: 1px solid lightgrey;
border-bottom: 1px solid lightgrey;
`
// const Sort = styled.div`
// padding: 0 2%;
// width: 96%;
// height: 30px;
// line-height: 30px;
// font-size: 20px;
// border: 1px solid black;
// `
const Bottom = styled.div`
margin-top: 20px;
float: left;
height: 100px;
width: 100%;
text-align: center;
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