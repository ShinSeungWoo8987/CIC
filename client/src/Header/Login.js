import React, {useContext, useEffect, useRef, useState} from 'react';
import Styled from "styled-components"; // styled-components 라이브러리를 사용하기 위해 선언
import Modal from 'react-modal';
import Store from '../Store/Store';
import {executeJwtAuthenticationService, registerSuccessfulLoginForJwt, logout, setupAxiosInterceptors} from '../Jwt/AuthenticationService.js'
import Register from './Register';
import FindUser from './FindUser';
import { checkInputValueRestirctedCharacter } from '../Util/Util';

Modal.setAppElement('#root') // Modal 태그 내부에 onRequestClose 같은 속성을 사용하기 위해 선언

function Login() {
    const { globalStateDispatch, session, sessionDispatch, modalState, modalStateDispatch } = useContext(Store);
    const [idRef, pwRef] = [useRef(), useRef()];
    const [LoginMessage, setLoginMessage] = useState('');
    
    // 새로고침했을 때, globalState 값 유지시킬 것
    useEffect(()=>{
        const _session = {
            state: localStorage.getItem("token") !== null,
            authority: parseInt(localStorage.getItem("authority")),
            token: localStorage.getItem("token"),
            userId:localStorage.getItem("userId")
        };
        sessionDispatch({type:"SESSION", payload:_session});
        setupAxiosInterceptors();
    },[sessionDispatch])

    // Login Modal Setting
    const openLoginModal = (e) => {
        e.preventDefault();
        if(localStorage.getItem('token') === null){
            const newModalState = {
                login: true,
            }
            modalStateDispatch({type:"CHANGE_MODALSTATE", payload: newModalState});
        }else{
            logout();
            sessionDispatch({type:'DEFAULT'});
            const payload = {
                main: 'all',
                sub: 'all',
                action: '',
                num: 0
            }
            globalStateDispatch({type: 'GLOBAL', payload});
        }
    }
    const closeLoginModal = () => {
        setLoginMessage("");
        modalStateDispatch({type:"DEFAULT"});
    }

    // Input Value Valid Check
    const checkInutValue = (e) => {
        const inputValue = e.target.value;
        const inputId = e.target.id;
        const check = checkInputValueRestirctedCharacter(inputValue);
        if(check === -1){
            setLoginMessage('사용할 수 없는 문자입니다.');
            document.getElementById(inputId).focus();
        }
    }

    // Login Submit
    const onLoginSubmit = (e) => {
        e.preventDefault();
        const id = idRef.current.value;
        const pw = pwRef.current.value;
        executeJwtAuthenticationService(id, pw)
        .then(({data}) => {
            registerSuccessfulLoginForJwt(data.authority, data.token, data.userId);
            const newSession = {
                state: true,
                authority: data.authority,
                token: data.token,
                userId: data.userId
            }
            sessionDispatch({type:'SESSION', payload: newSession });
            closeLoginModal();
        }).catch( () =>{
            setLoginMessage("가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.")
            // console.log("executeJwtAuthenticationService Error");
        })
    }
    return(
        <Container margin={session.state?'1300px':'1315px'}>
            <LinkModal onClick={(e)=>openLoginModal(e)}>{session.state?'로그아웃':'로그인'}</LinkModal>
            <Modal 
                isOpen={modalState.login}
                style={LoginModalStyle}
                onRequestClose={(e) => closeLoginModal()}
                // shouldCloseOnOverlayClick={false} // 화면 밖 클릭 시 종료되는 기능 제거
            >
                <Form>
                <Input margin='0 0 20px 0' id='id' ref={idRef} type='text' placeholder="아이디" required autoFocus onBlur={(e)=>checkInutValue(e)}/><br/>
                <Input id='pw' ref={pwRef} type='password' placeholder="비밀번호" required onBlur={(e)=>checkInutValue(e)}/><br/>
                <SpanText>{LoginMessage}</SpanText><br/>
                <InputSubmit  onClick={(e)=>onLoginSubmit(e)}>로그인</InputSubmit>
                <Find>
                    <A><Register/></A>
                    <Blank>|</Blank>
                    <A><FindUser/></A>
                </Find>
                </Form>
            </Modal>
        </Container>
    );
}
export default Login;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Container = Styled.div`
    position: fixed;
    margin: ${({margin}) => "0 0 0 "+margin};
`
const LinkModal = Styled.a`
    font-size: 16px;
    color: #A3A3A3;
    cursor: pointer;

    &:hover {
        color: black;
        font-weight: bold;
    }
`
const Form = Styled.div`
    padding: 25px 0 0 0;
`
const Input = Styled.input`
    position: relative;
    left: 14%;
    height: 50px;
    width: 300px;
    margin: ${({margin})=>`${margin}`};
    font-size: 15px;
    text-indent: 15px;
    border-radius: 5px;
    border: 1px solid #E0E0E0;
`
const SpanText = Styled.span`
    position: relative;
    left: 18%;
    bottom: 4px;
    font-size: 5px;
    color: red;
`
const InputSubmit = Styled.button`
    position: relative;
    left: 14%;
    height: 50px;
    width: 306px;  
    margin: 20px 0 0 0;
    font-size: 20px;
    text-indent: 0px;
    text-shadow: 1px 1px 3px grey;
    box-shadow: 1px 1px 5px #BDBDBD;
    border: none;
    border-radius: 5px;
    color: white;
    background-color: #87d37c;

    &:hover {
        box-shadow: 2px 2px 5px #BDBDBD;
    }
`
const Find = Styled.div`
    font-size: 12.5px;
    margin: 10px 0 0 25%;
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
        zIndex: 5               
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