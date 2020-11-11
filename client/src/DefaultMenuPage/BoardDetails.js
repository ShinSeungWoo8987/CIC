import React, { useContext, useEffect, useState } from 'react';
import Store from '../Store/Store';
import styled from "styled-components"
import parse from 'html-react-parser';
import axios from 'axios';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKeditor from '@ckeditor/ckeditor5-react';

function BoardDetails(props) {
    const { session, boardItemList, globalState, globalStateDispatch, boardItemListDispatch } = useContext(Store);
    const [doAnswer, setDoAnswer] = useState(false);
    const [selectedItem, setSelectedItem] = useState({
        title: '', name: '', date: '', image: '', description: '', solution: ''
    });
    const [solution, setSolution] = useState();
    const payload = {
        main: globalState.main,
        sub: 'all',
        action: globalState.action,
        num: globalState.num
    }
    const handleClick = (e) => {
        e.preventDefault();
        globalStateDispatch({ type: 'GLOBAL', payload })
    }

    let _main = 'Event';
    if (globalState.main === 'notice') _main = 'Notice'
    if (globalState.main === 'center') _main = 'Center'

    const updateBoard = (e) => {
        e.preventDefault();
        globalStateDispatch({
            type: 'GLOBAL', payload: {
                main: `add${_main}`,
                sub: 'all',
                action: 1,
                num: globalState.num
            }
        })
    }

    const deleteBoard = (e) => {
        e.preventDefault();
        let _main = 'event';
        if (globalState.main === 'notice') _main = 'notice';
        if (globalState.main === 'center') _main = 'service_center';
        axios.delete(`/${_main}/delete/${selectedItem.id}`).then(res=>{
            console.log(res);
            globalStateDispatch({
                type: 'GLOBAL', payload: {
                    main: globalState.main,
                    sub: 'all',
                    action: globalState.action,
                    num: globalState.num
                }
            });
        }).catch(err=>console.log(err));
    }

    const handleCKeditorState = (event, editor) => {
        const data = editor.getData();
        setSolution(data);
    }

    const handleSubmit= ()=>{
        // 수정 url
        axios.post(`/service_center_solution/update/${globalState.num}`,{solution})
            .then(({data})=>{
                const payload = boardItemList.map(i=>{
                    if(i.ser_NUMBER===globalState.num) return Object.assign(i, {ser_SOLUTION:solution});
                    else return i;
                });
                boardItemListDispatch({type:'CHANGE',payload});
                setDoAnswer(false);
                if(data!=='') alert(data);
            }).catch(err=>alert(err));
    }
    const handleDelete= ()=>{
        // 삭제 url
        axios.delete(`/service_center_solution/delete/${globalState.num}`).then(()=>{
            boardItemListDispatch({type:'CHANGE',payload:boardItemList.map(i=>{
                if(i.ser_NUMBER===globalState.num) return Object.assign(i, {ser_SOLUTION:i.ser_DESCRIPTION});
                else return i;
            }) });
            globalStateDispatch({ type: 'GLOBAL', payload });
            alert(`삭제되었습니다.`);
        }).catch(err=>alert(err));
    }

    useEffect(() => {
        console.log(boardItemList)
        let _main = '';
        if (globalState.main === 'event') _main = 'eve';
        if (globalState.main === 'notice') _main = 'not';
        if (globalState.main === 'center') _main = 'ser';
        const _boardItemList = boardItemList.filter(i => i[`${_main}_NUMBER`] === globalState.num);
        console.log(_boardItemList)
        setSelectedItem({
            id: _boardItemList[0][`${_main}_NUMBER`],
            title: _boardItemList[0][`${_main}_TITLE`],
            name: _boardItemList[0][`mem_ID`],
            date: _boardItemList[0][`${_main}_REGISTER`],
            image: _boardItemList[0][`${_main}_IMAGE`] || '',
            description: _boardItemList[0][`${_main}_DESCRIPTION`],
            solution: _boardItemList[0][`${_main}_SOLUTION`]?_boardItemList[0][`${_main}_SOLUTION`]:''
        });
    }, [globalState, boardItemList]);

    return (
        <Container>
            <Title>
                <TitleUp>
                    {selectedItem.title}
                </TitleUp>
                <TitleDown>
                    <LeftSide><Btn width='80px' height='25px' size='15px' bg='#74b9ff' onClick={e => handleClick(e)}>돌아가기</Btn></LeftSide>
                    <RightSide>
                        <Quarter>등록일</Quarter>
                        <Quarter>{selectedItem.date.substr(0, 10)}</Quarter>
                        <Quarter>등록자</Quarter>
                        <Quarter>{selectedItem.name}</Quarter>

                    </RightSide>
                </TitleDown>
            </Title>
            <Content>
                <Up>
                    {globalState.main==='center'?
                    <>
                        <Question>
                            <QuestionContent>
                                {selectedItem.image}
                                {parse(selectedItem.description)}
                            </QuestionContent>
                            {session.authority===2?
                            <Writer>
                                <Btn width='50px' height='25px' size='15px' bg='#fdcb6e' onClick={e => updateBoard(e)}>수정</Btn>
                                &nbsp;&nbsp;
                                <Btn width='50px' height='25px' size='15px' bg='#b2bec3' onClick={e => deleteBoard(e)}>삭제</Btn>
                            </Writer>:''}
                        </Question>
                        <Answer>
                            {doAnswer?
                                <CKeditor
                                    editor={ClassicEditor} onInit={() => { }}
                                    onChange={(event, editor) => {
                                        handleCKeditorState(event, editor); // console.log(editor.sourceElement.parentNode.id)
                                    }}
                                    data={selectedItem.solution===selectedItem.description?'':selectedItem.solution}
                                    config={{
                                        toolbar: [
                                            "heading", "|", "bold", "italic", "link", "bulletedList",
                                            "numberedList", "|", "indent", "outdent", "|", // "imageUpload"
                                            "blockQuote", "insertTable", "mediaEmbed", "undo", "redo"
                                        ],
                                        placeholder: "글을 작성해 주세요."
                                    }}
                                />
                            :
                                selectedItem.solution===selectedItem.description?'답변이 등록되어있지 않습니다.':parse(selectedItem.solution)
                            }

                            
                        </Answer>
                        <Admin>
                            {doAnswer?
                            <>
                            <Btn width='80px' height='25px' size='15px' bg='#b2bec3' onClick={()=>setDoAnswer(false)}>작성취소</Btn>&nbsp;&nbsp;
                            <Btn width='80px' height='25px' size='15px' bg='#87d37c' onClick={()=>handleSubmit()}>작성완료</Btn>
                            </>
                            :
                            session.authority===2?
                                selectedItem.solution===selectedItem.description?
                                <Btn width='80px' height='25px' size='15px' bg='#87d37c' onClick={()=>setDoAnswer(true)}>답변작성</Btn>
                                :
                                <>
                                    <Btn width='50px' height='25px' size='15px' bg='#fdcb6e' onClick={()=>setDoAnswer(true)}>수정</Btn>&nbsp;&nbsp;
                                    <Btn width='50px' height='25px' size='15px' bg='#b2bec3' onClick={()=>handleDelete()}>삭제</Btn>
                                </>
                            :''
                            }
                            
                        </Admin>
                    </>
                    :
                    <>
                        {selectedItem.image}
                        {parse(selectedItem.description)}
                    </>
                    }
                </Up>
                <Down>
                    {!(globalState.main==='center') && session.authority===2 ?
                    <Admin>
                        <Btn width='50px' height='25px' size='15px' bg='#fdcb6e' onClick={e => updateBoard(e)}>수정</Btn>
                        &nbsp;&nbsp;
                        <Btn width='50px' height='25px' size='15px' bg='#b2bec3' onClick={e => deleteBoard(e)}>삭제</Btn>
                    </Admin> : ''
                    }
                </Down>
            </Content>
            <Bottom> <Btn width='300px' height='50px' size='20px' bg='#74b9ff' onClick={e => handleClick(e)}>돌아가기</Btn> </Bottom>
        </Container>
    );
}

export default BoardDetails;

const Container = styled.div`
    float: left;
    width: 100%;
    height: 1000px;
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
    padding-bottom: 13px;
`
const LeftSide = styled.div`
    float: left;
    width: 60%;
    height: 21px;
    margin-top: -14px;
`
const RightSide = styled.div`
    float: left;
    font-size: 14px;
    width: 40%;
    height: 21px;
    text-align: center;
`
const Quarter = styled.div`
    float: left;
    width: 25%;
`
const Content = styled.div`
    border-bottom: 1px solid #E1E1E1;
    margin-top: 10px;
    padding: 10px 2%;
    width: 96%;
    min-height: 550px;
    font-size: 18px;
`
const Up = styled.div`
width: 100%;
min-height: 550px;
`
const Question = styled.div`
min-height: 250px;
border-bottom: 1px solid lightgrey;
`
const QuestionContent = styled.div`
min-height: 210px;
`
const Answer = styled.div`
margin-top: 20px;
min-height: 250px;
`
const Down = styled.div`
width: 100%;
`
const Writer = styled.div`
text-align: right;
width: 100%;
bottom:0;
`
const Admin = styled.div`
text-align: right;
width: 100%;
bottom:0;
`
const Bottom = styled.div`
margin-top: 20px;
text-align: center;
`
const Btn = styled.button`
width: ${({width})=>`${width}`};
height: ${({height})=>`${height}`};
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