import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Login from './Login';
import Search from './Search';
import Store from '../Store/Store';
import Postcode from '../Components/Postcode';
import UpdateUser from '../MenuBar/UpdateUser';
import DeleteUser from '../MenuBar/DeleteUser';

/*
    fixed 둘다 줘야 하는거 아닌가?
*/

function Head(props) {
    const { session, globalState, modalStateDispatch, globalStateDispatch, searchProjectDispatch, mainPageCntDispatch } = useContext(Store);
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
    let currentGrade=[];

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
    },[session.state]);

    const handleClick = e=>{
        e.preventDefault();
        setShowMore(!showMore);
    }

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
        // 왼쪽의 메인 메뉴 클릭 시 검색값 초기화 - 이 부분은 추후 결정할 것
        const newSearchProject = {
          value: ''
        }
        searchProjectDispatch({type:'SEARCH', payload:newSearchProject});
        const newMainPageCnt = {
          value: 1
        }
        mainPageCntDispatch({ type: 'MOVE_PAGE', payload: newMainPageCnt});
    }

    const changeState = (e) => {
        e.preventDefault();
        setShowMore(!showMore);
        if(e.currentTarget.id === 'fundingList'){
            const newGlobalState = {
                main: e.currentTarget.id,
                sub: 'continue',
                action: 1,
            num:0
            }
            globalStateDispatch( { type: 'GLOBAL', payload: newGlobalState });
        }else if(e.currentTarget.id === 'updateUser'){
            const newModalState = {
                updateUser: true
            }
            modalStateDispatch({type:"CHANGE_MODALSTATE", payload: newModalState});
        }else if(e.currentTarget.id === 'deleteUser'){
            const newModalState = {
                deleteUser: true
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
    }

    return (
        <Container>
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
                <UlRight margin={session.state?"208px":"113px"}>
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
            <Postcode/>
            <UpdateUser/>
            <DeleteUser/>
        </Container>
    );
}

export default Head;

const Container = styled.div`
    font-size: 26px;
    font-weight: bold;
`
const Logo = styled.div`
    float: left;
    cursor: pointer;
    margin: 4px 0 0 0;
`

const Category = styled.div`
  float: left;
  margin-left: 6%;
  height: 46px;
  font-size: 16px;
  line-height: 46px;
  color: #3A3A3A;
`
const A = styled.a`
    cursor: pointer;
    color: #3A3A3A;
`
const UlLeft = styled.ul`
font-size: 14px;
background-color: white;
padding: 0px;
list-style-type : none;
z-index: 2;
position: fixed;
margin-top: 0px;
margin-left: -378px;
padding: 10px 0 26px 378px;
text-align: left;
width: 100%;
height: 150px;
box-shadow: 0px 5px 5px lightgrey;
`
const UlCenter = styled.ul`
font-size: 14px;
// background-color: white; 굳이 ? 색깔을 넣어야 하는것인가?
margin: 0px 0 0 112px;
padding: 10px 0 26px 0;
list-style-type : none;
z-index: 4;
position: fixed;
text-align: left;
`
const UlRight = styled.ul`
font-size: 14px;
background-color: white;
margin: ${({margin}) => "0 0 0 "+margin};
padding: 10px 0 26px 0;
list-style-type : none;
z-index: 3;
position: fixed;
text-align: left;
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