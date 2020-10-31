import React, { useContext } from 'react';
import styled from 'styled-components';
import Store from '../Store/Store';

function Member({authority,userId,name,phone,birth,adress,del}) {
    const {globalState} = useContext(Store);
    let _authority = '등급';
    if(authority===0) _authority = '일반회원';
    if(authority===1) _authority = '창작자';
    if(authority===2) _authority = '관리자';
    return (
        <Container padding={globalState.main==='memberList'?'2':'6'} width={globalState.main==='memberList'?'96':'88'}>
            <Auth>{_authority}</Auth>
            <Id>{userId}</Id>
            <Name>{name}</Name>
            <Phone>{phone}</Phone>
            <Birth>{birth.substring(0,9)}</Birth>
            <Address width={globalState.main==='memberList'?'42':'46'}>{adress}</Address>
            {globalState.main==='memberList'?<Del>{del}</Del>:''}
        </Container>
    );
}

export default Member;
const Container = styled.div`
padding: ${({padding})=> `0 ${padding}%`};
width: ${({width})=>`${width}%`};
height: 30px;
line-height: 30px;
font-size: 16px;
border: 1px solid black;
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