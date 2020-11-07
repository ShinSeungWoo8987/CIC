import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Store from '../Store/Store';
import { post } from 'axios';
import RecentlyNewsItem from './NewsItem';
import Search from '../Components/Search';
import Paging from '../Components/Paging';

function NewsList() {
    const { globalState, globalStateDispatch, projectInformation, search, pageNumber } = useContext(Store);
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

    }, [ search, globalState.action ]);
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
            while(idx < res.data.length){
                newNewsList.push(
                    <RecentlyNewsItem key={idx} number={res.data[idx].new_number} title={res.data[idx].new_title} writer={projectInformation.creator} date={res.data[idx].new_register} description={res.data[idx].new_description} />
                )
                idx++;
            }
            setNewList(newNewsList);
        })
    }, [ search, pageNumber, projectInformation.number, globalState.action ]);
    const moveAddRecentlyNews = (e) => {
        e.preventDefault();
        const newGlobalState = {
            main: globalState.main,
            sub: globalState.sub,
            action: 'add'
        }
        globalStateDispatch( { type: 'GLOBAL', payload: newGlobalState });
    }
    return (
        <Container>
            <Upside> {newsList} </Upside>
            <Write>{projectInformation.creator===localStorage.getItem('userId')?<BtnAdd onClick={(e)=>moveAddRecentlyNews(e)}>글 작성</BtnAdd>:''}</Write>
            <Downside>
                <Search bottom='5px'/>
                <Paging maxPage={maxPage} />
            </Downside>
        </Container>
    );
}

export default NewsList;

const Container = styled.div`
    width: 75%;
    margin: 10px auto 0 auto;
`
const Upside = styled.div`
    margin: 0 auto 0 auto;
    width: 700px;
    height: 645px;

`
const Downside = styled.div`
    position: relative;
    top: 16px;

`
const Write = styled.div`
    width: 700px;
    margin: 0 auto 0 auto;
    text-align: right;
`
const BtnAdd = styled.button`
    font-size: 15px;
    border-radius: 5px;
    border: 1px solid #C8C8C8;
    cursor: pointer;
`
