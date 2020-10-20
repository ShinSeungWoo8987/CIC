import React, {useContext, useEffect, useState} from 'react';
import Styled from "styled-components"; // styled-components 라이브러리를 사용하기 위해 선언
import Modal from 'react-modal';
import Store from '../Store/Store';
import {executeJwtAuthenticationService, registerSuccessfulLoginForJwt, logout} from '../Jwt/AuthenticationService.js'

Modal.setAppElement('#root') // Modal 태그 내부에 onRequestClose 같은 속성을 사용하기 위해 선언

function Login() {
    const { session, sessionDispatch, modalState, modalStateDispatch } = useContext(Store);
    const [LoginMessage, setLoginMessage] = useState('');

    useEffect(()=>{
        let _session = {
            state: session.state,
            username: localStorage.getItem("authenticatedUser") || '',
            password: '',
            token: localStorage.getItem("token") || '',
            authority: session.authority
        };
        sessionDispatch({type:"SESSION", payload:_session});
    },[])

    // Login Submit
    const onLoginSubmit = (e) => {
        e.preventDefault();
        const id = e.target.id.value;
        const pw = e.target.pw.value;
        // Restricted Character
        const restirctedCharacterList = [" ", "=", "'", "\""]
        var idx = 0;
        while(idx<restirctedCharacterList.length){
            // 아이디 또는 비밀번호 입력값에 제한된 문자 리스트의 목록이 없는 경우 -1 반환
            if(id.indexOf(restirctedCharacterList[idx]) !== -1 || pw.indexOf(restirctedCharacterList[idx]) !== -1){
                setLoginMessage("가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.");
                return false
            }
            idx++;
        }
        executeJwtAuthenticationService(id, pw)
        .then((response) => {
            console.log("response.data.authority : ",response.data.authority);
            session.token = response.data.token;
            session.authority = response.data.authority;
            console.log("session.authority : ",session.authority);
            registerSuccessfulLoginForJwt(id, session.authority, session.token);
            sessionDispatch({type:'SESSION', payload: Object.assign(session, {state:true} ) });
            closeLoginModal();
        }).catch( () =>{
            setLoginMessage("가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.")
            console.log("executeJwtAuthenticationService Error");
        })
    }
    // Login Modal Setting
    const openLoginModal = (e) => {
        e.preventDefault();
        if(localStorage.getItem('token') === null){
            const newModalState = {
                login: true,
                postcode: modalState.postcode
            }
            modalStateDispatch({type:"CHANGE_MODALSTATE", payload: newModalState});
        }else{
            logout();
            sessionDispatch({type:'SESSION', payload: {
                state: false,
                username: localStorage.getItem("authenticatedUser") || '',
                password: '',
                authority: '',
                token: localStorage.getItem("token") || ''
            } });
        }
    }
    const closeLoginModal = () => {
        setLoginMessage("");
        const newModalState = {
            login: false,
            postcode: modalState.postcode
        }
        modalStateDispatch({type:"CHANGE_MODALSTATE", payload: newModalState});
    }
    return(
        <Container>
            <LinkModal onClick={(e)=>openLoginModal(e)}>{session.state?'로그아웃':'로그인'}</LinkModal>
            <Modal 
                isOpen={modalState.login}
                style={LoginModalStyle}
                onRequestClose={(e) => closeLoginModal()}
                // shouldCloseOnOverlayClick={false} // 화면 밖 클릭 시 종료되는 기능 제거
            >
                <Form onSubmit={(e)=>onLoginSubmit(e)}>
                    <InputId id='id' type='text' placeholder="아이디" required/><br/>
                    <InputPw id='pw' type='password' placeholder="비밀번호" required/><br/>
                    <SpanText>{LoginMessage}</SpanText><br/>
                    <InputSubmit type="submit" value="로그인"/>
                    <Find>
                        <A>아이디 찾기</A>
                        <Blank>|</Blank>
                        <A>비밀번호 찾기</A><br/>
                    </Find>
                </Form>
            </Modal>
        </Container>
    );
}
export default Login;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Container = Styled.div`
    float: left; 
    width: 75px;
`
const LinkModal = Styled.a`
    color: #A3A3A3;
    cursor: pointer;

    &:hover {
        color: black;
        font-weight: bold;
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
    text-shadow: 1px 1px 7px #BDBDBD; 
    box-shadow: 1px 1px 7px #BDBDBD;
    border: none;
    color: white;
    margin: 20px 0 0 0;
    background-color: #83E538;

    &:hover {
        box-shadow: 1px 1px 9px #8C8C8C; 
    }
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
const LoginModalStyle = {
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