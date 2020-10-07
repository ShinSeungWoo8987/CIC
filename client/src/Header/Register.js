import React, {useState} from 'react';
import Styled from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Modal from 'react-modal';

Modal.setAppElement('#root') // Modal 태그 내부에 onRequestClose 같은 속성을 사용하기 위해 선언

function Register() {
    const [modalState, setModalState] = useState(false)
    const changeModalState = (e) => {
        e.preventDefault()
        setModalState(true)
    }
    const register=true?'회원가입':''
    return(
        <Container>
            <LinkModal href='login'  onClick={(e)=>changeModalState(e)}>{register}</LinkModal>
            <Modal 
                isOpen={modalState}
                style={ModalStyle}
                onRequestClose={(e) => setModalState(false)}
                // shouldCloseOnOverlayClick={false} // 화면 밖 클릭 시 종료되는 기능 제거
            >
                <Form>
                    <InputText id='id' type='text' placeholder="아이디"></InputText><br/>
                    <InputText id='id' type='password' placeholder="비밀번호"></InputText><br/>
                    <Find>
                        <A href='#'>아이디 찾기</A>
                        <Blank>|</Blank>
                        <A href='#'>비밀번호 찾기</A><br/>
                    </Find>
                    <InputSubmit type="submit" value="로그인"></InputSubmit>
                </Form>
            </Modal>
        </Container>
    );
}

export default Register;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Container = Styled.div`
    float: right;
    margin: 20px 0 0 50px;
`
const LinkModal = Styled.a`
    color: #A3A3A3;
`
const Form = Styled.div`
    padding: 25px 0 0 0;
`
const Input = Styled.input`
    position: relative;
    left: 14%;
    height: 50px;
    border-radius: 10px;
`
const InputText = Styled(Input)`
    width: 285px;
    font-size: 15px;
    padding: 0 0 0 15px;
    margin: 0 0 15px 0;
    border: 1px solid #E0E0E0;
`
const InputSubmit = Styled(Input)`
    width: 300px;  
    font-size: 20px;
    font-weight: bold;
    border: none;
    color: white;
    background-color: #ABF200;
`
const Find = Styled.div`
    position: relative;
    left: 27.5%;
    width: 75%;
    font-size: 12.5px;
    margin: -5px 0 20px 0;
`
const A = Styled.a`
    float: left;
    color: #9A9A9A;

    &:hover {
        font-weight: bold;
        color: black;
    }
`
const Blank = Styled.div`
    float: left;
    margin: 0 20px;
`
const ModalStyle = {
    overlay: {
        backgroundColor: 'rgba(140,140,140,0.9)',
        zIndex: 3               
    },
    content: {
        position: "absolute",
        left: '40%',
        top: '27.5%',
        width: '500px',
        height: '700px',
        borderRadius: 10,
        boxShadow: '9px 9px 10px #4E4E4E'
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////