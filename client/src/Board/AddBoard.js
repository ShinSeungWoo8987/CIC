import React, { useContext } from 'react';
import styled from 'styled-components';
import Store from '../Store/Store';
import AddBoardForm from './AddBoardForm';

function AddBoard(props) {
    const {globalState} = useContext(Store);
    return (
        <Container>
            {globalState.main} <br/>
            <AddBoardForm/>
        </Container>
    );
}

export default AddBoard;

const Container = styled.div`
margin-left: 12.5%
`