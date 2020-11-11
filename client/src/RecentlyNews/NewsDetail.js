import React, { useContext, useEffect, useState } from 'react';
import Store from '../Store/Store';
import styled from "styled-components"
import { post } from 'axios';
import parse from 'html-react-parser';

function NewsDetail() {
    const { globalState, globalStateDispatch, recentlyNewsInformation } = useContext(Store);
    const moveBack = (e) => {
        e.preventDefault();
        const newGlobalState = {
            main: globalState.main,
            sub: globalState.sub,
            action: null,
            num: 0
        }
        globalStateDispatch( { type: 'GLOBAL', payload: newGlobalState });
    }
    const updateNews = (e) => {
        e.preventDefault();
        const newGlobalState = {
            main: globalState.main,
            sub: globalState.sub,
            action: 'update'
        }
        globalStateDispatch( { type: 'GLOBAL', payload: newGlobalState });
    }
    const deleteNews = (e) => {
        e.preventDefault();
        const url = '/recentlyNews/delete';
        const data = {
            number: recentlyNewsInformation.number+'',
            id: localStorage.getItem('userId')
        }
        post(url, data).then(res=>{
            const newGlobalState = {
                main: globalState.main,
                sub: globalState.sub,
                action: null
            }
            globalStateDispatch( { type: 'GLOBAL', payload: newGlobalState });
        })
    }
    return (
        <Container>
            <Title>
                <TitleUp>
                    {recentlyNewsInformation.title}
                </TitleUp>
                <TitleDown>
                    <LeftSide>
                        {localStorage.getItem('userId')===recentlyNewsInformation.writer?
                        <>
                            <Btn float='left' margin='0 15px 0 0' width='50px' height='25px' size='15px' bg='#fdcb6e' onClick={e => updateNews(e)}>수정</Btn>
                            &nbsp;&nbsp;
                            <Btn float='left' width='50px' height='25px' size='15px' bg='#b2bec3' onClick={e => deleteNews(e)}>삭제</Btn>
                        </>
                        :
                        ''
                        }
                    </LeftSide>
                    <RightSide>
                        <Writer>등록일</Writer>
                        <Writer>{recentlyNewsInformation.date}</Writer>
                        <Writer>등록자</Writer>
                        <Writer>{recentlyNewsInformation.writer}</Writer>
                    </RightSide>
                </TitleDown>
            </Title>
            <Content>
                <Description>{parse(recentlyNewsInformation.description)}</Description>
            </Content>
            <Bottom>
                <Btn width='300px' height='50px' size='20px' bg='#74b9ff' onClick={e => moveBack(e)}>목록으로 돌아가기</Btn>
            </Bottom>
        </Container>
    );
}

export default NewsDetail;

const Container = styled.div`
    float: left;
    width: 90.24%;
    margin: 10px 49.3px 0 49.3px;
`
const Title = styled.div`
    border-bottom: 1px solid #E1E1E1;
    width: 100%;
    height: 80px;
    font-size: 25px;
    font-weight: bold;
`
const TitleUp = styled.div`
    margin: 0 10%;
    width: 80%;
    min-height: 50px;
    text-align: center;
    margin-top: 10px;
`
const TitleDown = styled.div`
    width: 100%;
    height: 21px;
`
const LeftSide = styled.div`
    float: left;
    width: 60%;
`
const Btn = styled.button`
    float: ${({float})=>`${float}`};
    width: ${({width})=>`${width}`};
    height: ${({height})=>`${height}`};
    margin: ${({margin})=>`${margin}`};
    font-size: ${({size})=>`${size}`};
    font-weight: bold;
    border: none;
    border-radius: 5px;
    text-shadow: 1px 1px 3px grey;
    box-shadow: 1px 1px 5px #BDBDBD;
    color: white;
    background-color: ${({bg})=>`${bg}`};
    cursor: pointer;

    &:hover {
        box-shadow: 2px 2px 5px #BDBDBD;
    }
`
const RightSide = styled.div`
    float: left;
    font-size: 14px;
    width: 40%;
    height: 21px;
    text-align: center;
`
const Writer = styled.div`
    float: left;
    width: 25%;
`
const Content = styled.div`
    width: 96%;
    height: 550px;
    margin-top: 10px;
    padding: 10px 2%;
    font-size: 18px;
    text-align: left;
    border-bottom: 1px solid #E1E1E1;
`
const Description = styled.div`
`
const Bottom = styled.div`
    margin-top: 20px;
    text-align: center;
`