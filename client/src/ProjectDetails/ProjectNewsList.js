import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Store from '../Store/Store';
import { post } from 'axios';
import ProjectNewsItem from './ProjectNewsItem';
import Search from '../Components/Search';
import Paging from '../Components/Paging';

function ProjectNewsList() {
    const { globalState, projectInformation, search, pageNumber } = useContext(Store);
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
                    <ProjectNewsItem key={idx} number={res.data[idx].new_number} title={res.data[idx].new_title} writer={projectInformation.creator} date={res.data[idx].new_register} description={res.data[idx].new_description} />
                )
                idx++;
            }
            setNewList(newNewsList);
        })
    }, [ search, pageNumber, projectInformation.number, globalState.action ]);
    return (
        <Container>
            <Upside> {newsList} </Upside>
            <Write>{projectInformation.creator===localStorage.getItem('userId')?<BtnAdd>글 작성</BtnAdd>:''}</Write>
            <Downside>
                <Search bottom='5px'/>
                <Paging maxPage={maxPage} />
            </Downside>
        </Container>
    );
}

export default ProjectNewsList;

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
`
