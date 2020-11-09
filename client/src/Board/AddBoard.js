import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Store from '../Store/Store';
import AddBoardForm from './AddBoardForm';

function AddBoard(props) {
    const {globalState, boardItemList} = useContext(Store);
    const [selectedItem, setSelectedItem] = useState({
        id:'', title: '', name: '', date: '', image: '', description: ''
    });
    const [title, setTitle] = useState('')
    useEffect(() => {
        let _main = '';
        if (globalState.main === 'addEvent'){
            _main = 'eve';
            setTitle('이벤트 글쓰기');
        }else if (globalState.main === 'addNotice'){
            _main = 'not';
            setTitle('공지사항 글쓰기');
        }
        if (globalState.main === 'addCenter'){
            _main = 'ser';
            setTitle('고객센터 글쓰기');
        }
        if(boardItemList){
            const _boardItemList = boardItemList.filter(i => i[`${_main}_NUMBER`] === globalState.num);
            if(_boardItemList.length!==0){
                setSelectedItem({
                    id: _boardItemList[0][`${_main}_NUMBER`],
                    title: _boardItemList[0][`${_main}_TITLE`],
                    name: _boardItemList[0][`mem_ID`],
                    date: _boardItemList[0][`${_main}_REGISTER`],
                    image: _boardItemList[0][`${_main}_IMAGE`] || '',
                    description: _boardItemList[0][`${_main}_DESCRIPTION`]
                });
            }
        }
    }, [boardItemList, globalState.main, globalState.num]); // 2020-10-31 boardItemList, globalState.main, globalState.num 추가
    return (
        <Container>
            <SubContainer>
                <Title>{title}</Title>
            </SubContainer>
            <AddBoardForm  id={selectedItem.id} title={selectedItem.title} description={selectedItem.description}/>
        </Container>
    );
}

export default AddBoard;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Container = styled.form`
    position: relative;
    right: 130px;  
    float: left;
    margin: 0 30%;
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////