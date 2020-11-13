import React, { useContext } from 'react';
import styled from 'styled-components';
import Store from '../Store/Store';
import axios from 'axios';

function Member({idx,authority,userId,name,phone,birth,adress,changed,setChanged, fontWeight, bg}) {
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
          bg = {bg}
          padding={'3px 0'} width={globalState.main==='userList'?'91.2':'86.7'} cursor={globalState.main==='userList'?'default':'pointer'}
          onClick={()=>changeGlobalstate()}
          >
            <Auth fontWeight={fontWeight} >{_authority}</Auth>
            <Id fontWeight={fontWeight} >{userId}</Id>
            <Name fontWeight={fontWeight} >{name}</Name>
            <Phone fontWeight={fontWeight} >{phone}</Phone>
            <Birth fontWeight={fontWeight} >{birth.substring(0,10)}</Birth>
            <Address fontWeight={fontWeight} width={'420'}>{adress}</Address>
            {globalState.main==='userList'?
            <Del fontWeight={fontWeight} >
                {idx==='99'?'삭제':<DeleteButton href='/' onClick={e=>handleDelete(e)}>X</DeleteButton>}
            </Del>:''}
        </Container>
    );
}

export default Member;

const Container = styled.div`
position: relative;
left: 50%;
transform: translate(-50%);
width: ${({width})=>`${width}%`};
height: 30px;
line-height: 30px;
padding: ${({padding})=> `${padding}`};
border: ${({border})=>`${border}`};
font-size: 16px;
text-align: center;
cursor: ${({cursor})=> `${cursor}`};
background-color: ${({bg})=> `${bg}`};
`

const Auth = styled.div`
float: left;
width: 85px;
font-weight: ${({fontWeight})=>`${fontWeight}`};
`
const Id = styled.div`
float: left;
width: 263px;
font-weight: ${({fontWeight})=>`${fontWeight}`};
`
const Name = styled.div`
float: left;
width: 105px;
font-weight: ${({fontWeight})=>`${fontWeight}`};
`
const Phone = styled.div`
float: left;
width: 158px;
font-weight: ${({fontWeight})=>`${fontWeight}`};
`
const Birth = styled.div`
float: left;
width: 158px;
font-weight: ${({fontWeight})=>`${fontWeight}`};
`
const Address = styled.div`
float: left;
width: ${({width})=>`${width}px`};
font-weight: ${({fontWeight})=>`${fontWeight}`};
`
const Del = styled.div`
float: left;
width: 42px;
font-weight: ${({fontWeight})=>`${fontWeight}`};
`
const DeleteButton = styled.a`
`