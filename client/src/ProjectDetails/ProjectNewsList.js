import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Store from '../Store/Store';
import { post } from 'axios';
import NewsItem from './NewsItem';
import Search from '../Components/Search';
import Paging from '../Components/Paging';

function ProjectNews() {
    const { projectInformation, search, pageNumber } = useContext(Store);
    const [ newsList, setNewList ] = useState('');
    const [ maxPage, setMaxPage ] = useState('');
    // Get Max Page
    useEffect(() => {
        const url = '/recentlyNewsList/maxPage';
        const data = {
            search: search.value,
            number: projectInformation.number+""
        }
        post(url, data).then(res=>{
            setMaxPage(res.data)
        })

    }, [ search ]);
    // Get Funding List
    useEffect(() => {
        const url = '/recentlyNewsList/list';
        const data = {
            search: search.value,
            page: pageNumber.value+'',
            number: projectInformation.number+""
        }
        const newNewsList = [];
        post(url, data).then(res=>{
            var idx = 0;
            console.log(res.data);
            while(idx < res.data.length){
                newNewsList.push(
                    <NewsItem key={idx} number={res.data[idx].new_number} title={res.data[idx].new_title} name={projectInformation.creator} date={res.data[idx].new_register} description={res.data[idx].new_description} />
                )
                idx++;
            }
            setNewList(newNewsList);
        })
    }, [ search, pageNumber, projectInformation.number ]);
    return (
        <Container>
            <Upside> {newsList} </Upside>
            <Write>{projectInformation.creator===localStorage.getItem('userId')?<button>글 작성</button>:''}</Write>
            <Downside>
                <Search bottom='5px'/>
                <Paging maxPage={maxPage} />
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
    position: relative;
    bottom: 7px;

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
