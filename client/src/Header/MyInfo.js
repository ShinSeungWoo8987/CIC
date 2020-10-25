import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Store from '../Store/Store';

function MyInfo(props) {
    const [showMore, setShowMore] = useState(false);
    const { session, modalState, modalStateDispatch, globalState, globalStateDispatch} = useContext(Store);
    const handleClick = e=>{
        e.preventDefault();
        setShowMore(!showMore);
    }
    const [menu, setMenu] = useState([{id: '', title: ''}]);
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
                setMenu([]);
                break;
            case(0):
                setMenu(common);
                break;
            case(1):
                setMenu(creator);
                break;
            case(2):
                setMenu(admin);
                break;
        }
    },[session]);
    const changeState = (e) => {
        e.preventDefault();
        setShowMore(!showMore);
        if(e.currentTarget.id === 'fundingList'){
            const newGlobalState = {
                main: e.currentTarget.id,
                sub: 'continue'
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
                sub: globalState.sub
            }
            globalStateDispatch( { type: 'GLOBAL', payload: newGlobalState });
        }
    }
    

    return (
        <Container>
            {!showMore?
            <A onClick={e=>handleClick(e)}>내정보</A>
            :
            <>
                <A onClick={e=>handleClick(e)}>내정보</A>
                <Ul>
                    {menu.map( (i)=><Li key={i.id} id={i.id} onClick={(e)=>changeState(e)}><A>{i.title}</A></Li> )}
                </Ul>
            </>
            }
        </Container>
    );
}

export default MyInfo;

const Container = styled.div`
  float: left;
  margin-left: 2%;
  height: 46px;
  font-size: 16px;
  line-height: 46px;
  color: #3A3A3A;
`
const A = styled.a`
    cursor: pointer;
    color: #3A3A3A;
`
const Ul = styled.ul`
background-color: #F9F9F9;
margin: 0px;
padding: 0px;
list-style-type : none;
z-index: 2;
position: fixed;
text-align: center;
margin-left: -14px;
`
const Li = styled.li`
`