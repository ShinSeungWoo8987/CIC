import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Store from '../Store/Store';
import { post } from 'axios';
import TextEditor from '../Components/TextEditor';
import { replaceInputValueRestirctedCharacter } from '../Util/Util'

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
            title: replaceInputValueRestirctedCharacter(e.target.title.value),
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
    return (
        <Container onSubmit={(e)=>onRecentlyNewsSumbit(e)}>
            <SubContainer>
                <Title>최근소식 글쓰기</Title><Btn type='submit' value='등록'/>
            </SubContainer>
            <Input id='title' type='text' defaultValue={content.title} placeholder='제목을 입력해 주세요.'/>
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
    border-radius: 5px;
`
const Btn = styled.input`
    float: right;
    width: 50px;
    height: 25px;
    line-height: 25px;
    margin: 8px 0 0 0;
    font-size: 15px;
    text-shadow: 1px 1px 3px grey;
    box-shadow: 1px 1px 5px #BDBDBD;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: white;
    background-color: #87d37c;
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////