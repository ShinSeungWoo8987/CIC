import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Store from '../Store/Store';
import Login from './Login';
import Search from './Search';
import SubMenu from './SubMenu';
import Postcode from '../Components/Postcode';
import UpdateUser from '../MenuBar/UpdateUser';
import Authority from '../MenuBar/Authority';

function Head(props) {
    const { session, globalState, modalStateDispatch, globalStateDispatch, searchDispatch, pageCntDispatch } = useContext(Store);
    const [showMore, setShowMore] = useState(false);

    const categoryList = [
        {id: 'all', title: '전체'},
        {id: 'tech', title: '테크·가전'},
        {id: 'travel', title: '여행·레저'},
        {id: 'fashion', title: '패션·잡화'}
    ]
    const moreList = [
        {id: 'event', title: '이벤트'},
        {id: 'notice', title: '공지사항'},
        {id: 'center', title: '고객센터'}
    ]
    const [myInfoList, setMyInfoList] = useState([{id: '', title: ''}]);
    const common = [
        {id: 'updateUser', title: '정보수정'},
        {id: 'fundingList', title: '펀딩목록'},
        {id: 'gradeUp', title: '창작자신청'},
        {id: 'deleteUser', title: '회원탈퇴'}
    ]
    const creator = [
        {id: 'updateUser', title: '정보수정'},
        {id: 'fundingList', title: '펀딩목록'},
        {id: 'projectList', title: '프로젝트목록'},
        {id: 'addProject', title: '프로젝트등록'},
        {id: 'deleteUser', title: '회원탈퇴'}
    ]
    const admin = [
        {id: 'userList', title: '회원목록'},
        {id: 'adminGradeUp', title: '창작자승인'},
        {id: 'projectListAll', title: '프로젝트목록'},
    ]

    useEffect( ()=>{
        // Login User Grade Setting
        switch(session.authority){
            default:
                setMyInfoList([]);
                break;
            case(0):
                setMyInfoList(common);
                break;
            case(1):
                setMyInfoList(creator);
                break;
            case(2):
                setMyInfoList(admin);
                break;
        }
    },[session.state, session.authority]); // 2020-10-31 - session.authority 추가

    const handleClick = e=>{
        e.preventDefault();
        setShowMore(!showMore);
    }

    // Change GlobalState Main - DefaultMenu
    const changeDefaultMenuState = (e) => {
        e.preventDefault();
        setShowMore(!showMore);
        const newGlobalState = {
            main: e.currentTarget.id,
            sub: 'all',
            action: 1,
            num:0
        }
        globalStateDispatch( { type: 'GLOBAL', payload: newGlobalState });
        // 검색 & 페이지 초기화
        searchDispatch({type:'DEFAULT'});
        pageCntDispatch({ type: 'DEFAULT'});
    }

    // Change GlobalState Main - My Information
    const changeState = (e) => {
        e.preventDefault();
        setShowMore(!showMore);
        if(e.currentTarget.id==='adminGradeUp') globalStateDispatch({type:'GLOBAL', payload:Object.assign(globalState,{main:e.currentTarget.id})})
        if(e.currentTarget.id === 'fundingList' || e.currentTarget.id === 'projectList' || e.currentTarget.id === 'projectListAll'){
            const newGlobalState = {
                main: e.currentTarget.id,
                sub: 'continue',
                action: 1,
                num:0
            }
            globalStateDispatch( { type: 'GLOBAL', payload: newGlobalState });
        }else if(e.currentTarget.id === 'updateUser' || e.currentTarget.id === 'deleteUser'){
            const newGlobalState = {
                main: globalState.main,
                sub: globalState.sub,
                action: e.currentTarget.id,
                num: globalState.num
            }
            globalStateDispatch( { type: 'GLOBAL', payload: newGlobalState });
            const newModalState = {
                authority: true
            }
            modalStateDispatch({type:"CHANGE_MODALSTATE", payload: newModalState});
        }else{
            const newGlobalState = {
                main: e.currentTarget.id,
                sub: globalState.sub,
                action: 1,
                num:0
            }
            globalStateDispatch( { type: 'GLOBAL', payload: newGlobalState });
        }
        // 검색 & 페이지 초기화
        searchDispatch({type:'DEFAULT'});
        pageCntDispatch({ type: 'DEFAULT'});
    }

    return (
        <Container>
            <Header>
                <Logo> <a href='/'>C I C</a> </Logo>
                <Category>
                {!showMore?
                <A onClick={e=>handleClick(e)}>카테고리</A>
                :
                <>
                    <A onClick={e=>handleClick(e)}>카테고리</A>
                    <UlLeft>
                        {categoryList.map( (i)=><Li key={i.id} id={i.id} onClick={(e)=>changeDefaultMenuState(e)} ><A>{i.title}</A></Li> )}
                    </UlLeft>
                    {!session.state?'':
                    <UlCenter>
                        {myInfoList.map( (i)=><Li key={i.id} id={i.id} onClick={(e)=>changeState(e)}><A>{i.title}</A></Li> )}
                    </UlCenter>}
                    <UlRight margin={session.state?"240px":"128px"}>
                        {moreList.map( (i)=><Li key={i.id} id={i.id} onClick={(e)=>changeDefaultMenuState(e)}><A>{i.title}</A></Li> )}
                    </UlRight>
                </>
                }
                </Category>
                {!session.state?'':
                <MyInfoDiv>
                    <A onClick={e=>handleClick(e)}>내정보</A>
                </MyInfoDiv>
                }
                <MoreDiv>
                    <A onClick={e=>handleClick(e)}>더보기</A>
                </MoreDiv>

                <Search/>
                <Login/>
            </Header>
            <SubMenu/>
            <Postcode/>
            <UpdateUser/>
            <Authority/>
        </Container>
    );
}

export default Head;

const Container = styled.div`
    position: fixed;
    left: -0px; // 알수없는 CSS의 세계입니다. 이렇게 처리해줘야 FundingList 페이지와 Main 페이지의 헤더가 일치합니다.
    width: 100%;
    font-size: 26px;
    font-weight: bold;
`
const Header = styled.div`
    height: 46px;
    padding: 0 0 0 265px;
    background-color: #E6E6E6;
`
const Logo = styled.div`
    float: left;
    cursor: pointer;
    margin: 4px 80px 0 0;
`

const Category = styled.div`
  float: left;
  height: 46px;
  font-size: 16px;
  line-height: 46px;
`
const A = styled.a`
    cursor: pointer;
    color: #3A3A3A;
    margin: 0 0 0 10px;
`
const UlLeft = styled.ul`
font-size: 14px;
background-color: white;
list-style-type : none;
z-index: 999;
position: fixed;
margin-top: 0px;
margin-left: -414.5px;
padding: 10px 0 26px 415px;
text-align: left;
width: 100%;
box-shadow: 0px 5px 5px lightgrey;

animation-duration: 1s;
animation-name: moreSlide;
animation-fill-mode: forwards;

@keyframes moreSlide {
    0% {
        opacity: 0;
    }
    20% {
        height: 150px;
    }
    100% {
        height: 150px;
        opacity: 1;
    }
}
`
const UlCenter = styled.ul`
font-size: 14px;
margin: 0px 0 0 126px;
padding: 10px 0 26px 0;
list-style-type : none;
z-index: 999;
position: fixed;
text-align: left;

animation-duration: 1.5s;
animation-name: moreSlide;
animation-fill-mode: forwards;

@keyframes moreSlide {
    0% {
        opacity: 0;
    }
    20% {
        height: 150px;
    }
    100% {
        height: 150px;
        opacity: 1;
    }
}
`
const UlRight = styled.ul`
font-size: 14px;
margin: ${({margin}) => "0 0 0 "+margin};
padding: 10px 0 26px 0;
list-style-type : none;
z-index: 999;
position: fixed;
text-align: left;

animation-duration: 2s;
animation-name: moreSlide;
animation-fill-mode: forwards;

@keyframes moreSlide {
    0% {
        opacity: 0;
    }
    20% {
        height: 150px;
    }
    100% {
        height: 150px;
        opacity: 1;
    }
}
`
const Li = styled.li`
height: 32px;
`
const MyInfoDiv = styled.div`
  float: left;
  margin-left: 3.2%;
  height: 46px;
  font-size: 16px;
  line-height: 46px;
  color: #3A3A3A;
`
const MoreDiv = styled.div`
  float: left;
  margin-left: 3.3%;
  height: 46px;
  font-size: 16px;
  line-height: 46px;
  color: #3A3A3A;
`