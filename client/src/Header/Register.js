import React, {useState} from 'react';
import styled from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Modal from 'react-modal';

Modal.setAppElement('#root') // Modal 태그 내부에 onRequestClose 같은 속성을 사용하기 위해 선언

function Login() {
    const [modalState, setModalState] = useState(false)
    const changeModalState = (e) => {
        e.preventDefault()
        setModalState(true)
    }
    return(
        <div>
            <LinkModal href='register'  onClick={(e)=>changeModalState(e)}>회원가입</LinkModal>
            <Modal 
                isOpen={modalState}
                style={ModalStyle}
                onRequestClose={(e) => setModalState(false)}
                // shouldCloseOnOverlayClick={false} // 화면 밖 클릭 시 종료되는 기능 제거
            >
                <Component>
                    <InputText id='id' type='text' placeholder="아이디"></InputText><br/>
                    <InputText id='id' type='password' placeholder="비밀번호"></InputText><br/>
                    <InputSubmit type="submit" value="회원가입"></InputSubmit>
                </Component>
            </Modal>
        </div>
    );
}
const LinkModal = styled.a`
    color: white;
`
const Component = styled.div`
    padding: 25px 0 0 0;
`
const Input = styled.input`
    position: relative;
    left: 13%;
    height: 50px;
    border-radius: 10px;
`
const InputText = styled(Input)`
    width: 350px;
    font-size: 15px;
    padding: 0 0 0 15px;
    margin: 0 0 15px 0;
    border: 1px solid #E0E0E0;
`
const InputSubmit = styled(Input)`
    width: 300px;  
    font-size: 20px;
    font-weight: bold;
    border: none;
    color: white;
    background-color: #ABF200;
`
const ModalStyle = {
    overlay: {
        backgroundColor: 'rgba(140,140,140,0.9)',
        zIndex: 3               
    },
    content: {
        position: "absolute",
        left: '37.5%',
        top: '10%',
        width: '500px',
        height: '750px',
        borderRadius: 10,
        boxShadow: '9px 9px 10px #4E4E4E'
    }
}
export default Login;