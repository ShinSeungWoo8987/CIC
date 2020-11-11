import React, { useContext } from 'react';
import styled from 'styled-components';
import Store from '../Store/Store';
import axios from 'axios';

function Member({idx,authority,userId,name,phone,birth,adress,changed,setChanged}) {
    const {globalState, globalStateDispatch} = useContext(Store);
    let _authority = '등급';
    if(authority===0) _authority = '일반회원';
    if(authority===1) _authority = '창작자';
    if(authority===2) _authority = '관리자';
    const handleDelete = e=>{
        e.preventDefault();
        axios.delete(`/member/delete/${userId}`)
            .then(()=>setChanged(!changed))
            .catch(err=>console.log(err));
    }
    const changeGlobalstate = e=>{
        if(globalState.main==='userList') return false
        const payload = {
            main: globalState.main,
            sub: 'selected',
            action: globalState.action,
            num: userId
        }
        globalStateDispatch({type:'GLOBAL', payload})
    }

    return (
        <Container
          padding={globalState.main==='userList'?'2':'6'} width={globalState.main==='userList'?'96':'88'} cursor={globalState.main==='userList'?'default':'pointer'}
          onClick={()=>changeGlobalstate()}
          >
            <Auth>{_authority}</Auth>
            <Id>{userId}</Id>
            <Name>{name}</Name>
            <Phone>{phone}</Phone>
            <Birth>{birth.substring(0,10)}</Birth>
            <Address width={globalState.main==='userList'?'42':'46'}>{adress}</Address>
            {globalState.main==='userList'?
            <Del>
                {idx==='99'?'삭제':<DeleteButton href='/' onClick={e=>handleDelete(e)}>X</DeleteButton>}
            </Del>:''}
        </Container>
    );
}

export default Member;

const Container = styled.div`
cursor: ${({cursor})=> `${cursor}`};
padding: ${({padding})=> `0 ${padding}%`};
width: ${({width})=>`${width}%`};
height: 30px;
line-height: 30px;
font-size: 16px;
border: none;
text-align: center;
`

const Auth = styled.div`
float: left;
width: 8%
`
const Id = styled.div`
float: left;
width: 10%
`
const Name = styled.div`
float: left;
width: 10%
`
const Phone = styled.div`
float: left;
width: 14%
`
const Birth = styled.div`
float: left;
width: 12%
`
const Address = styled.div`
float: left;
width: ${({width})=>`${width}%`}
`
const Del = styled.div`
float: left;
width: 4%
`
const DeleteButton = styled.a`

`