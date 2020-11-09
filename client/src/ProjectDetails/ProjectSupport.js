import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import SupportItem from './SupportItem';
import {get} from 'axios';
import Paging from '../Components/Paging';
import Store from '../Store/Store';

function ProjectSupport(props) {
    const { projectInformation, pageNumber } = useContext(Store);
    const [cnt, setCnt] = useState(1);
    const [ supportItem, setSupportItem ] = useState([{title: '로딩중...', name: '', date: ''},]);

    useEffect(()=>{
        get(`/project_support/${projectInformation.number}/${pageNumber.value}`)
            .then(({data})=>{
                const loadList = data.fundingSupportList.map(i=>{
                    return {
                        title: i.fun_description,
                        name: i.fun_name,
                        date: i.fun_register.substr(0,10)
                    }
                });
                setCnt(data.fundingSupportCnt);
                setSupportItem(loadList);
            })
            .catch(err=>alert(err));
    },[pageNumber]);

    const content = supportItem.map( ({title,name,date}, idx)=>{
        return <SupportItem key={idx} title={title} name={name} date={date} />;
    });
    return (
        <Container>
            <Upside> {content.length!==0?content:'아직 펀딩이 이루어지지 않았습니다.'} </Upside>
            <Downside>
                <Paging maxPage={cnt}/>
            </Downside>
        </Container>
    );
}

export default ProjectSupport;

const Container = styled.div`
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    width: 75%;
    height: 850px;
    text-align: center;
`
const Upside = styled.div`
margin: 0 auto 0 auto;
width: 700px;
height: 700px;
`
const Downside = styled.div`
margin: 0px auto 0 auto;
width: 550px;
height: 100px;
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
