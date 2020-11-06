import React, {useContext, useEffect, useRef, useState} from 'react';
import Styled from "styled-components"; // styled-components 라이브러리를 사용하기 위해 선언
import Modal from 'react-modal';
import Store from '../Store/Store';
import {executeJwtAuthenticationService, registerSuccessfulLoginForJwt, logout, setupAxiosInterceptors} from '../Jwt/AuthenticationService.js'
import Register from './Register';
import FindUser from './FindUser';

Modal.setAppElement('#root') // Modal 태그 내부에 onRequestClose 같은 속성을 사용하기 위해 선언

function Login() {
    const { session, sessionDispatch, modalState, modalStateDispatch, globalStateDispatch } = useContext(Store);
    const [idRef, pwRef] = [useRef(), useRef()];
    const [LoginMessage, setLoginMessage] = useState('');

    // GlobalState 값도 나중에 새로고침했을 때 유지시켜야 됨
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

    // Login Submit
    const onLoginSubmit = (e) => {
        e.preventDefault();
        const id = idRef.current.value;
        const pw = pwRef.current.value;
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
            console.log("executeJwtAuthenticationService Error");
        })
    }
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
            globalStateDispatch({type: 'DEFAULT'});
        }
    }
    const closeLoginModal = () => {
        setLoginMessage("");
        modalStateDispatch({type:"DEFAULT"});
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
                <InputId ref={idRef} type='text' placeholder="아이디" required/><br/>
                <InputPw ref={pwRef} type='password' placeholder="비밀번호" required/><br/>
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
const InputSubmit = Styled.button`
    position: relative;
    left: 14%;
    height: 50px;
    border-radius: 10px;
    border: 1px solid #E0E0E0;
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