import React, { useContext } from 'react';
import Styled from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Store from '../Store/Store';
import Modal from 'react-modal';

function DeleteUser() {
    const { modalState, modalStateDispatch } = useContext(Store);
    // deleteUser Submit
    const onDeleteUserSubmit = (e) => {
        console.log("Delete User");
    }
    // DeleteUser Modal Setting
    const closeDeleteUserModal = () => {
        const newModalState = {
            login: modalState.login,
            postcode: modalState.postcode,
            updateUser: modalState.updateUser,
            deleteUser: false,
        }
        modalStateDispatch({type:"CHANGE_MODALSTATE", payload: newModalState});
    }
    return(
        <Container>
            <Modal 
                isOpen={modalState.deleteUser}
                style={DeleteUserModalStyle}
                onRequestClose={(e) => closeDeleteUserModal(e)}
                // shouldCloseOnOverlayClick={false} // 화면 밖 클릭 시 종료되는 기능 제거
            >
                <Form onSubmit={(e)=>onDeleteUserSubmit(e)}>
                    <Input id='pw' type='password' placeholder="비밀번호" required pattern="[A-Za-z0-9]{3,12}"/><br/>
                    <InputSubmit type="submit" value="회원탈퇴"/>
                </Form>
            </Modal>
        </Container>
    );
}
export default DeleteUser;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Container = Styled.div`
    float: left;
    width: 75px;
`
const Form = Styled.form`
    padding: 35px 0 0 0;
`
const Input = Styled.input`
    position: relative;
    left: 14%;
    width: 355px;
    height: 50px;
    margin: 0 0 30px 0;
    font-size: 15px;
    text-indent: 15px;
    border: 1px solid #E0E0E0;
    border-radius: 10px;
    color: #717171;
`
const InputSubmit = Styled(Input)`
    width: 361px;  
    font-size: 20px;
    font-weight: bold;
    text-shadow: 1px 1px 7px #BDBDBD; 
    box-shadow: 1px 1px 7px #BDBDBD;
    text-indent: 0px;
    border: none;
    color: white;
    background-color: #83E538;

    &:hover {
        box-shadow: 1px 1px 9px #8C8C8C; 
    }
`
const DeleteUserModalStyle = {
    overlay: {
        backgroundColor: 'rgba(140,140,140,0.9)',
        zIndex: 1      
    },
    content: {
        position: "absolute",
        left: '37.5%',
        top: '27.5%',
        width: '500px',
        height: '200px',
        borderRadius: 10,
        boxShadow: '9px 9px 10px #4E4E4E'
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////