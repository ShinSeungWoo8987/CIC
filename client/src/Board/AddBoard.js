import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Store from '../Store/Store';
import AddBoardForm from './AddBoardForm';

function AddBoard(props) {
    const {globalState, boardItemList} = useContext(Store);
    const [selectedItem, setSelectedItem] = useState({
        id:'', title: '', name: '', date: '', image: '', description: ''
    });
    useEffect(() => {
        let _main = '';
        if (globalState.main === 'addEvent') _main = 'eve';
        if (globalState.main === 'addNotice') _main = 'not';
        if (globalState.main === 'addCenter') _main = 'ser';
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
            {globalState.main} <br/>
            <AddBoardForm  id={selectedItem.id} title={selectedItem.title} description={selectedItem.description}/>
        </Container>
    );
}

export default AddBoard;

const Container = styled.div`
margin-left: 12.5%
`