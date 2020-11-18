import React, { useContext } from 'react';
import Styled from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Modal from 'react-modal';
import Store from '../Store/Store';

Modal.setAppElement('#root') // Modal 태그 내부에 onRequestClose 같은 속성을 사용하기 위해 선언

function Message( ){
    const { modalState, modalStateDispatch, message, messageDispatch} = useContext(Store);
    const closeMessageModal = () => {
        modalStateDispatch({type:'DEFAULT'});
        messageDispatch({type:'DEFAULT'});
    }
    return(
        <Modal 
            isOpen={modalState.message}
            style={MessageModalStyle}
            onRequestClose={(e) => closeMessageModal(e)}
            // onRequestClose={true}
        >
            <Form onSubmit={(e)=>closeMessageModal(e)}>
                <Text>{message.value}</Text>
                <Input type='submit' value='확인'/>
            </Form> 
        </Modal>
    );
}
export default Message;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Form = Styled.form`
    padding: 20px 0 0 0;
    border: none;
    border-radius: 5px;
    text-align: center;
`
const Text = Styled.div`
    font-size: 15px;
    margin: 20px 0;
`
const Input = Styled.input`
    width: 200px;
    height: 25px;
    border: none;
    border-radius: 5px;
    background-color: #b2bec3;
    text-shadow: 1px 1px 3px grey;
    box-shadow: 1px 1px 5px #BDBDBD;
    color: white;
    cursor: pointer;

    &:hover {
        box-shadow: 2px 2px 5px #BDBDBD;
    }
`
const MessageModalStyle = {
    overlay: {
        backgroundColor: 'rgba(140,140,140,0.5)',
        zIndex: 5
    },
    content: {
        position: "absolute",
        left: '40%',
        top: '30%',
        width: '420px',
        height: '150px',
        padding: '0px',
        border: 'none',
        backgroundColor: '#F2F2F2'
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////