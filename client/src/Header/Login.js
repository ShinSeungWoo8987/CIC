import React, {useContext, useState} from 'react';
import Styled from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Modal from 'react-modal';
import Store from '../Store/Store.js';
import { post } from 'axios'

Modal.setAppElement('#root') // Modal 태그 내부에 onRequestClose 같은 속성을 사용하기 위해 선언

/*
    - DB 연결
    - 모달창 종료 시 메세지 초기화
*/
function Login() {
    // Login Information Setting
    const {session, sessionDispatch} = useContext(Store);
    const [Message, setMessage] = useState('');
    const onSubmit = (e) => {
        e.preventDefault();
        const id = e.target.id.value;
        const pw = e.target.pw.value;
        // Restricted Charater
        if(id.indexOf(" ") !== -1 || pw.indexOf(" ") !== -1 ||
           id.indexOf("=") !== -1 || pw.indexOf("=") !== -1){
            setMessage("가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.");
            return false;   
        }
        let newLogin = {
            id: id,
            pw: pw
        }
        const url = '/login';
        const data = newLogin;
        post(url,data).then(res=>{
            if(res.data.length===1){
                setMessage(res.data[0])
            }else{
                let newSession = session;
                newSession = {
                    state: res.data[0],
                    id: res.data[1],
                    grade: res.data[2]
                }
                closeLoginModal();
                sessionDispatch( { type: 'SESSION', payload: newSession} );
            }
        })
    }
    // Login State
    const login=session.state?'로그아웃':'로그인'
    // Login Modal Setting
    const [modalState, setModalState] = useState(false)
    const openLoginModal = (e) => {
        e.preventDefault();
        if(login === '로그인'){
            setModalState(true);
        }else{
            let newSession = session;
            newSession = {
                state: false,
                id: null,
                grade: null
            }
            sessionDispatch( { type: 'SESSION', payload: newSession} );
        }
    }
    const closeLoginModal = () => {
        setMessage("");
        setModalState(false);
    }
    return(
        <Container>
            <LinkModal href='login'  onClick={(e)=>openLoginModal(e)}>{login}</LinkModal>
            <Modal 
                isOpen={modalState}
                style={ModalStyle}
                onRequestClose={(e) => closeLoginModal()}
                // shouldCloseOnOverlayClick={false} // 화면 밖 클릭 시 종료되는 기능 제거
            >
                <Form onSubmit={(e)=>onSubmit(e)}>
                    <InputId id='id' type='text' placeholder="아이디" required/><br/>
                    <InputPw id='pw' type='password' placeholder="비밀번호" required/><br/>
                    <SpanText>{Message}</SpanText><br/>
                    <InputSubmit type="submit" value="로그인"/>
                    <Find>
                        <A href='#'>아이디 찾기</A>
                        <Blank>|</Blank>
                        <A href='#'>비밀번호 찾기</A><br/>
                    </Find>
                </Form>
            </Modal>
        </Container>
    );
}
export default Login;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Container = Styled.div`
    float: right;
    margin: 20px 0 0 50px;
`
const LinkModal = Styled.a`
    color: #A3A3A3;

    &:hover {
        color: black;
    }
`
const Form = Styled.form`
    padding: 25px 0 0 0;
`
const Input = Styled.input`
    position: relative;
    left: 14%;
    height: 50px;
    width: 300px;
    font-size: 15px;
    text-indent: 15px;
    border-radius: 10px;
    border: 1px solid #E0E0E0;
`
const InputId = Styled(Input)`
    margin: 0 0 20px 0;
`
const InputPw = Styled(Input)`
`
const SpanText = Styled.span`
    position: relative;
    left: 18%;
    bottom: 4px;
    font-size: 5px;
    color: red;
`
const InputSubmit = Styled(Input)`
    width: 306px;  
    font-size: 20px;
    font-weight: bold;
    text-indent: 0px;
    text-shadow: 0 3px 7px #D6D6D6;
    border: none;
    color: white;
    margin: 20px 0 0 0;
    background-color: #83E538;
`
const Find = Styled.div`
    position: relative;
    left: 27.5%;
    width: 75%;
    font-size: 12.5px;
    margin: 10px 0 0 0;
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
        width: '425px',
        height: '290px',
        borderRadius: 10,
        boxShadow: '9px 9px 10px #4E4E4E'
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////