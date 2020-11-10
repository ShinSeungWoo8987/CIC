import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Store from '../Store/Store';
import { post } from 'axios';
import TextEditor from '../Components/TextEditor';
import { checkInputValueRestirctedCharacter } from '../Util/Util'

function AddNews({}) {
    const { projectInformation, recentlyNewsInformation, globalState, globalStateDispatch } = useContext(Store);
    const [ content, setContent ] = useState('');

    useEffect(() => {
        if(globalState.action==='update'){
            setContent({
                title: recentlyNewsInformation.title,
                description: recentlyNewsInformation.description
            })
        }
    }, [ globalState.action ]);
    const onRecentlyNewsSumbit = (e) => {
        const url = `/recentlyNews/${globalState.action}`;
        const data = {
            pro_number: projectInformation.number+'',
            title: e.target.title.value,
            content: content.description,
            id: localStorage.getItem('userId'),
            new_number: recentlyNewsInformation.number+''
        }
        post(url, data).then(res=>{
        })
        const newGlobalState = {
            main: globalState.main,
            sub: globalState.sub,
            action: null
        }
        globalStateDispatch({type: 'GLOBAL', payload: newGlobalState});
    }
    // Input Value Valid Check
    const checkInutValue = (e) => {
        const inputId = e.target.id;
        const inputValue = e.target.value;
        const check = checkInputValueRestirctedCharacter(inputValue);
        if(check === -1){
            document.getElementById(inputId).focus();
        }
    }
    return (
        <Container onSubmit={(e)=>onRecentlyNewsSumbit(e)}>
            <SubContainer>
                <Title>최근소식 글쓰기</Title><Btn type='submit' value='등록'/>
            </SubContainer>
            <Input id='title' type='text' defaultValue={content.title} placeholder='제목을 입력해 주세요.' onBlur={(e)=>checkInutValue(e)}/>
            <TextEditor content={content} setContent={setContent}/>
        </Container>
    )
}
export default AddNews;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Container = styled.form`
    float: left;
    width: 90.24%;
    margin: 10px 49.3px 0 49.3px;
`
const SubContainer = styled.div`
    float: left;
    width: 100%;
    padding: 0 0 10px 0;
    border-bottom: 1px solid #E1E1E1;
`
const Title = styled.div`
    float: left;
    font-size: 25px;
    font-weight: bold;
    text-align: left;
`
const Input = styled.input`
    width: 908px;
    height: 40px;
    margin: 10px 0;
    text-indent: 15px;
    border: 1px solid #E0E0E0;
    border-radius: 2.5px;
`
const Btn = styled.input`
    float: right;
    width: 50px;
    height: 30px;
    margin: 3px 0 0 0;
    font-size: 15px;
    border-radius: 5px;
    border: 1px solid #C8C8C8;
    cursor: pointer;
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////