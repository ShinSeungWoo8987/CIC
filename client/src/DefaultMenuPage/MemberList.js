import React, { useContext, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Store from '../Store/Store';
import Member from './Member';
import axios, {get} from 'axios';
import Career from './Career';
import { replaceInputValueRestirctedCharacter } from '../Util/Util';
import Paging from '../Components/Paging';

function MemberList(props) {
    const {globalState, globalStateDispatch, pageNumber} = useContext(Store);
    const searchRef = useRef();
    const [memberList, setMemberList] = useState();
    const [keyword, setKeyword] = useState();
    const [itemCnt, setItemCnt] = useState(1);
    const [changed, setChanged] = useState(false);
    const [career, setCareer] = useState();
    
    useEffect(()=>{
        console.log('pageCnt : ',pageNumber.value);
        if(globalState.sub==='all'){ // 리스트
            get(`/memberCnt/${globalState.main==='userList'?'all':'creator_request'}${keyword?`/${keyword}`:''}`)
                .then( ({ data }) => setItemCnt(data) )
                .catch(err => console.log(err));
            get(`/member/${globalState.main==='userList'?'all':'creator_request'}/${pageNumber.value}${keyword?`/${keyword}`:''}`)
                .then(res=>setMemberList(res.data))
                .catch(err=>console.log(err));
        }else if(globalState.sub==='selected'){
            get(`/creator_request/${globalState.num}`) //globalState.num : 선택된 아이디
                .then( ({data})=>setCareer(data) )
                .catch(err=>console.log(err))
        }
    },[globalState,keyword,changed, pageNumber]);

    const handleSearch = e=>{
        e.preventDefault();
        setKeyword(replaceInputValueRestirctedCharacter(searchRef.current.value));
    }
    const returnPage = ()=>{
        globalStateDispatch({type:'GLOBAL', payload:{
            main: globalState.main,
            sub: 'all',
            action: globalState.action,
            num: 0
        } });
    }
    const decision = _decesion=>{
        axios.delete(`/creator_request/${globalState.num}/${_decesion}`)
            .then(()=>globalStateDispatch({type:'GLOBAL', payload:{
                main: globalState.main,
                sub: 'all',
                action: globalState.action,
                num: 0
            } }) )
            .catch(err=>alert(`실패하였습니다. ${err}`));
    }
    const _all = (<>
        <List>
            <Member key='99' idx='99' authority='권한' userId='아이디' name='이름' phone='전화번호' birth='생년월일' adress='주소' del='삭제' fontWeight='bold' bg='#b8e994'/>
            {memberList ?
                memberList.map((i, idx) => <Member key={idx} idx={idx} authority={i.gra_number} userId={i.mem_id} name={i.mem_name} phone={i.mem_phone} birth={i.mem_birth} adress={i.mem_address1 + ' ' + i.mem_address2} changed={changed} setChanged={setChanged}/>)
                : '불러오는 중입니다.'}
        </List>
        <Bottom>
            <SearchDiv>
                <SearchInput id="searchBox" ref={searchRef} type="text" placeholder="검색어 입력" />
                <SearchButton onClick={e => handleSearch(e)}>검색</SearchButton>
            </SearchDiv>
            <br />
            <Paging maxPage={itemCnt}/>
        </Bottom>
    </>);
    
    const _selected = <>
        <List>
            <ListContainer>
                <Up>'<b>{globalState.num}</b>'의 창작자 신청서</Up>
                {career?
                career.map( (i,idx)=><Career key={idx} period_start={i.car_start} period_finish={i.car_finish} agency={i.car_org} activity={i.car_act}/> )
                :'신청서 로딩중...'}
            </ListContainer>
            <Decision>
                <Btn width='50px' height='30px' size='15px' bg='#87d37c' onClick={e=>decision('accept')}> 승인 </Btn>
                &nbsp;&nbsp;&nbsp;
                <Btn width='50px' height='30px' size='15px' bg='#b2bec3' onClick={e=>decision('deny')}> 거절 </Btn>
                
            </Decision>
        </List>
        <Bottom>
            <Btn width='300px' height='50px' size='20px' bg='#74b9ff' onClick={()=>returnPage()}>목록으로 돌아가기</Btn>
        </Bottom>
    </>;

    return (
        <Container>
            <Center>
                <Nav>
                    <Title>{globalState.main==='userList'?'회원관리':'창작자 승인'}</Title>
                </Nav>
                {globalState.sub==='all'?_all:_selected}
            </Center>
        </Container>
    );
}

export default MemberList;

const Container = styled.div`
    float: left;
    width: 100%;
    height: 880px;
    margin: -54px 0 0 110px;
`
const Center = styled.div`

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
    width: 95%;
    min-height: 570px;
    margin: 30px 0 0 2.5%;
    padding: 0 0 20px 0;

    animation-duration: 1s;
    animation-name: preparing;
    animation-fill-mode: forwards;

    @keyFrames preparing {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
`
const ListContainer = styled.div`
    text-align: center;
`
const Decision = styled.div`
float: left;
width:100%;
text-align:center;
`
const Up = styled.div`
margin: 15px 0;
font-size: 20px;
`
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
border-radius: 5px;
border: 1px solid #a29bfe;
background: white;
`
const SearchInput = styled.input`
font-size: 16px;
width: 325px;
height: 10px;
padding: 10px;
border: none;
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
background-color: #a29bfe;
`
const Btn = styled.button`
width: ${({width})=>`${width}`};
height: ${({height})=>`${height}`};
font-size: ${({size})=>`${size}`};
font-weight: bold;
border: none;
border-radius: 5px;
text-shadow: 1px 1px 3px grey;
box-shadow: 1px 1px 5px #BDBDBD;
color: white;
background-color: ${({bg})=>`${bg}`};
cursor: pointer;

&:hover {
    box-shadow: 2px 2px 5px #BDBDBD;
}
`