import React, { useState } from 'react';
import styled from 'styled-components';

function ProjectNews(props) {
    let _news = {title: 'Title', name: 'Creator', date: '2020.09.18', content:'content'};
    const [news, setNews] = useState(_news);

    return (
        <Container>
            <Upside>
                {news.title}
                {news.name}
                {news.date}
                {news.content}
            </Upside>
            <Downside>목록으로 돌아가기
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
border: 1px solid black;
margin: 0 auto 0 auto;
width: 700px;
height: 700px;
`
const Downside = styled.div`
border: 1px solid black;
margin: 15px auto 0 auto;
width: 300px;
height: 50px;
cursor: pointer;
`