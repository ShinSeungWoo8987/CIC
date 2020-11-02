import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Store from '../Store/Store';
import NewsItem from './NewsItem';

function ProjectNews() {
    const { projectInformation } = useContext(Store);
    let _newsItem = [
        {title: 'Title', name: 'Creator', date: '2020.09.18'},
        {title: 'Title', name: '관리자', date: '2020.09.20'},
        {title: 'Title', name: '내가내다', date: '2020.10.20'},
        {title: 'Title', name: '신승우', date: '2020.11.20'}
    ];
    const [ newsItem ] = useState(_newsItem);

    const content = newsItem.map( ({title,name,date}, idx)=>{
        return <NewsItem key={idx} title={title} name={name} date={date} />;
    });

    return (
        <Container>
            <Upside> {content} </Upside>
            <Write>{projectInformation.creator===localStorage.getItem('userId')?<button>글 작성</button>:''}</Write>
            <Downside>
                <SearchDiv>
                    <SearchInput type="text" placeholder="검색어 입력"/>
                    <SearchButton>검색</SearchButton>
                </SearchDiv>
                <br/>
                [이전] [1] [2] [3] [4] [다음]
            </Downside>
        </Container>
    );
}

export default ProjectNews;

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
margin: 15px auto 0 auto;
width: 550px;
height: 100px;
`
const Write = styled.div`
width: 700px;
text-align: right;
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
