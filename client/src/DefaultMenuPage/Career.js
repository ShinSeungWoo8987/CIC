import React, { useContext } from 'react';
import styled from 'styled-components';
import Store from '../Store/Store';

function Career({id,period_start,period_finish, agency, activity,career,setCareer}) {
    const { globalState } = useContext(Store);
    
    const ChangeCareer = ()=>{
        setCareer(career.filter(i=>i.id!==id));
    }
    const handleChange=(e)=>{
        const selected= {id, period_start, period_finish, agency, activity}
        selected[`${e.target.id}`] = e.target.value
        let newCareer = career.map(i=>{
            if(i.id===id) return selected
            else return i
        });
        setCareer(newCareer);
    }
    return (
        <Container>
            {globalState.main==='adminGradeUp'?'':<>경력사항 &nbsp;<button onClick={()=>ChangeCareer()}>-</button> <br/></>}
            <Table>
                <Period>
                    <Left>근무기간</Left>
                    <Right>
                        {globalState.main==='adminGradeUp'?`${period_start.substr(0,10)}  ~  ${period_finish.substr(0,10)}`:
                        <>
                            <input type='date' id='period_start' onChange={e=>handleChange(e)}/>&nbsp;&nbsp;~&nbsp;&nbsp;
                            <input type='date' id='period_finish' onChange={e=>handleChange(e)}/>
                        </>
                    }
                    </Right>
                </Period>
                <Agency>
                    <Left>기관명</Left>
                    <Right>
                        {globalState.main==='adminGradeUp'?agency:
                        <input type='text' id='agency' onChange={e=>handleChange(e)} placeholder="기관/회사명 입력"/>
                        }
                    </Right>
                </Agency>
                <Activity>
                    <Left>활동내역</Left>
                    <Right>
                        {globalState.main==='adminGradeUp'?activity:
                        <input type='text' id='activity' onChange={e=>handleChange(e)} placeholder="활동내역 입력"/>
                        }
                    </Right>
                </Activity>
            </Table>
        </Container>
    );
}

export default Career;

const Container = styled.div`
font-size: 18px;
float: left;
width: 100%;
padding-bottom: 20px;
`
const Table = styled.div`
float: left;
margin-top: 5px;
border-top: 1px solid lightgrey;
border-bottom: 1px solid lightgrey;
width: 100%;
text-align: center;
`
const Period = styled.div`
float: left;
width:100%;
`
const Agency = styled.div`
border-top:1px solid white;
float: left;
width:100%;
`
const Activity = styled.div`
border-top:1px solid white;
float: left;
width:100%;
`
const Left = styled.div`
background-color: lightgrey;
float: left;
width: 30%;
height: 40px;
line-height: 40px;
`
const Right = styled.div`
float: left;
padding-left:2%;
width: 68%;
height: 40px;
line-height: 40px;
text-align: left;
`