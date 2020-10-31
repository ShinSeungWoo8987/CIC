import React, { useState } from 'react';
import styled from 'styled-components';
import Career from './Career';
import {put} from 'axios';
function RequestCreator(props) {
    const [cnt, setCnt]= useState(1);
    const [career, setCareer] = useState([
        {id:0, period_start:'', period_finish:'', agency:'', activity:''}
    ]);
    console.log(career);
    const _career = career.map(i=>{
        return <Career key={i.id} id={i.id} period_start={i.period_start} period_finish={i.period_finish} agency={i.agency} activity={i.activity} career={career} setCareer={setCareer}/>
    });
    const addCareer = ()=>{
        setCareer(career.concat([{id:cnt, period_start:'', period_finish:'', Agency:'', Activity:''}]))
        setCnt(cnt+1);
    }
    const onSubmit = (e)=>{
        console.log(career);
        //여기서 /creator/request로 career전달
        put(`/creator/request`,{career}).then(res=>console.log(res)).catch(err=>console.log(err));
    }
    return (
        <Container>
            <Center>
                <Nav>
                    <Title>창작자 신청</Title>
                    <Controller>
                        <button onClick={()=>addCareer()}>추가</button>
                    </Controller>
                </Nav>
                <List> {_career} </List>
                <Bottom><button onClick={e=>onSubmit(e)}>신청하기</button></Bottom>
            </Center>
        </Container>
    );
}

export default RequestCreator;

const Container = styled.div`
    float: left;
    margin-left: 110px;
    width: 100%;
    height: 880px;
`
const Center = styled.div`
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
const Title = styled.div`
width: 100%;
padding: 20px 0;
text-align: center;
font-size: 38px;
`
const Controller = styled.div`
text-align: right;
width: 94%;
padding : 0 3%;
`
const List = styled.div`
float: left;
margin-top: 30px;
min-height: 570px;
width: 100%;
padding-bottom: 20px;
border-bottom: 1px solid lightgrey;
`
const Bottom = styled.div`
margin-top: 20px;
float: left;
height: 100px;
width: 100%;
text-align: center;
`