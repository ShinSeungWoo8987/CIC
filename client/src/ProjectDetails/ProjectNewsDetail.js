import React, { useContext, useEffect, useState } from 'react';
import Store from '../Store/Store';
import styled from "styled-components"
import { post } from 'axios';

function ProjectNewsDetail() {
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
    const deleteNews = (e) => {
        e.preventDefault();
        const url = '/recentlyNews/delete';
        const data = {
            number: recentlyNewsInformation.number+'',
            id: localStorage.getItem('userId')
        }
        console.log('data : ',data);
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
                        <BackButton onClick={e => moveBack(e)}>돌아가기</BackButton>
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
                <Description>{recentlyNewsInformation.description}</Description>
                <Down>
                    {localStorage.getItem('userId')===recentlyNewsInformation.writer?
                    <BtnContainer>
                        {/* <Btn onClick={e => updateBoard(e)}>수정</Btn> */}
                        <Btn>수정</Btn>
                        &nbsp;&nbsp;
                        <Btn onClick={e => deleteNews(e)}>삭제</Btn>
                    </BtnContainer>
                    :
                    ''
                    }
                </Down>
            </Content>
            <Bottom>
                <Btn onClick={e => moveBack(e)}>돌아가기</Btn>
            </Bottom>
        </Container>
    );
}

export default ProjectNewsDetail;

const Container = styled.div`
    float: left;
    width: 90.24%;
    margin-top: 10px;
    margin-right: 49.3px;
    margin-left: 49.3px;
`
const Title = styled.div`
    border-bottom: 1px solid #E1E1E1;
    width: 100%;
    min-height: 80px;
    font-size: 28px;
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
    font-size: 15px;
    border-radius: 5px;
    border: 1px solid #C8C8C8;
    cursor: pointer;
`
const BackButton = styled(Btn)`
    position: relative;
    bottom: 2.5px;
    float: left;
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
    min-height: 550px;
    margin-top: 10px;
    padding: 10px 2%;
    border-bottom: 1px solid #E1E1E1;
    font-size: 18px;
    text-align: left;
`
const Description = styled.div`
    min-height: 530px;
`
const Down = styled.div`
    width: 100%;
`
const BtnContainer = styled.div`
    float: right;
`
const Bottom = styled.div`
    margin-top: 20px;
    text-align: center;
`