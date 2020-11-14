import React, { useContext, useState } from 'react';
import Styled from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Store from '../Store/Store';
import { post } from 'axios';
import Modal from 'react-modal';
import { dateFormat, idFormat, checkInputValueRestirctedCharacter } from '../Util/Util';

Modal.setAppElement('#root') // Modal 태그 내부에 onRequestClose 같은 속성을 사용하기 위해 선언

function Find() {
    const { modalState, modalStateDispatch } = useContext(Store);
    const [passwordMessage, setPasswordMessage] = useState(''); // Password Valid Check Message
    const [nameMessage, setNameMessage] = useState(''); // Name Valid Check Message
    const [idMessage, setIdMessage] = useState(''); // Id Valid Check Message
    const [findIdMessage, setFindIdMessage] = useState(""); // Find Id Result Message
    const [findPwMessage, setFindPwMessage] = useState(''); // Find Pw Result Message
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState(''); // Password Equal Check Message
    const openFindModal = (e) => {
        e.preventDefault();
        const newModalState = {
            login: true,
            find: true
        }
        modalStateDispatch({type:"CHANGE_MODALSTATE", payload: newModalState});
    }
    const closeFindModal = () => {
        const newModalState = {
            login: true,
            find: false
        }
        modalStateDispatch({type:"CHANGE_MODALSTATE", payload: newModalState});
        setNameMessage("");
        setPasswordMessage("");
        setIdMessage("");
        setFindIdMessage("");
        setFindPwMessage("");
        setPasswordConfirmMessage("");            
    }
    // Input Value Valid Check
    const checkInutValue = (e) => {
        const inputId = e.target.id;
        const inputValue = e.target.value;
        const check = checkInputValueRestirctedCharacter(inputValue);
        if(check === -1){
            if(inputId === 'name'){
                setNameMessage("사용할 수 없는 문자입니다.");
                document.getElementById(inputId).focus();
            }else if(inputId === 'pw1'){
                setPasswordMessage('사용할 수 없는 비밀번호입니다.');
                document.getElementById(inputId).focus();
            }else if(inputId==='id'){
                setIdMessage("사용할 수 없는 문자입니다.");
                document.getElementById(inputId).focus();
            }
        }else{
            setNameMessage("");
            setPasswordMessage("");
            setIdMessage("");
        }
    }
    // Password Equal Check
    const checkPasswordConfirm = (e) => {
        e.preventDefault();
        var pw1 = document.getElementById('pw1').value;
        var pw2 = e.target.value;
        if(pw1 !== pw2){
            setPasswordConfirmMessage('비밀번호가 일치하지 않습니다.');
            document.getElementById('pw1').value = '';
            document.getElementById('pw2').value = '';
            document.getElementById('pw1').focus();
        }else{
            setPasswordConfirmMessage('');
        }
    }
    const findIdSubmit = (e) => {
        e.preventDefault();
        setFindPwMessage("");
        const url = '/authenticate/findId'
        const data = {
            name: e.target.name.value,
            phone: e.target.phone.value,
            birth: dateFormat(e.target.birth.value)
        }
        post(url, data).then(res=>{
            if(res.data==='Fail'){
                setFindIdMessage("존재하지 않는 정보입니다.");
            }
            else{
                const id = idFormat(res.data);
                setFindIdMessage(<>회원님의 아이디는 <b>{id}</b>입니다.</>);
            }
        })
    }
    const findPwSubmit = (e) => {
        e.preventDefault();
        setFindIdMessage("");
        const url = '/authenticate/findPw'
        const data = {
            id: e.target.id.value,
            pw: e.target.pw1.value
        }
        post(url, data).then(res=>{
            setFindPwMessage(res.data);
        })
    }
    return  <Container>
                <LinkModal onClick={(e)=>openFindModal(e)}>아이디 · 비밀번호 찾기</LinkModal>
                <Modal 
                    isOpen={modalState.find}
                    style={FindModalStyle}
                    onRequestClose={() => closeFindModal()}
                    // shouldCloseOnOverlayClick={false} // 화면 밖 클릭 시 종료되는 기능 제거
                >
                    <SubContainer key={1} bg='' borderRight='1px solid #E0E0E0' onSubmit={(e)=>findIdSubmit(e)}>
                        <Title>아이디 찾기</Title>
                        <Input indent='15px' id='name' type='text' placeholder='이름을 입력해주세요.' required onBlur={(e)=>checkInutValue(e)} />
                        <ErrorMessage>{nameMessage}</ErrorMessage>
                        <Input margin='0 0 20px 0' indent='15px' id='phone' type='tel' placeholder="'-' 빼고 입력해주세요." pattern="[0-9]{3}[0-9]{4}[0-9]{4}" required/>
                        <Input margin='0 0 30px 0' indent='7.5px' id='birth' type='date' min='1996-01-01' max='2099-12-31' required/><br/>
                        <InputSubmit type='submit' value='아이디 찾기'/>
                        <ResultMessage>{findIdMessage}</ResultMessage>
                    </SubContainer>
                    <SubContainer key={2} bg='' onSubmit={(e)=>findPwSubmit(e)}>
                        <Title>비밀번호 찾기</Title>
                        <Input indent='15px' id='id' type='text' placeholder='아이디를 입력해주세요.' required onBlur={(e)=>checkInutValue(e)}/>
                        <ErrorMessage>{idMessage}</ErrorMessage>
                        <Input indent='15px' id='pw1' type='password' placeholder='새 비밀번호를 입력해주세요.' required onBlur={(e)=>checkInutValue(e)}/><br/>
                        <ErrorMessage>{passwordMessage}</ErrorMessage>
                        <Input indent='15px' id='pw2' type='password' placeholder="새 비밀번호를 다시 입력해주세요." required onBlur={(e)=>checkPasswordConfirm(e)}/><br/>
                        <ErrorMessage margin='0 0 10px 0'>{passwordConfirmMessage}</ErrorMessage>
                        <InputSubmit type='submit' value='비밀번호 찾기'/>
                        <ResultMessage>{findPwMessage}</ResultMessage>
                    </SubContainer>
                </Modal>
            </Container>
}
export default Find;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Container = Styled.div`
    float: left;
`
const LinkModal = Styled.div`
    color: #A3A3A3;
    cursor: pointer;

    &:hover {
        color: black;
        font-weight: bold;
    }
`
const Title = Styled.div`
    margin: 0 0 25px 0;
    font-size: 17.5px;
    font-weight: bold;
    text-align: center;
    
`
const SubContainer = Styled.form`
    float: left;
    width: 399.5px;
    height: 350px;
    background-color: ${({bg})=>`${bg}`};
    border-right: ${({borderRight})=>`${borderRight}`};
`
const Input = Styled.input`
    position: relative;
    left: 50%;
    transform: translate(-50%);
    width: 300px;
    height: 40px;
    margin: ${({margin})=>`${margin}`};
    font-size: 15px;
    text-indent: ${({indent})=>`${indent}`};
    border: 1px solid #E0E0E0;
    border-radius: 5px;
    color: #717171;
`
const ErrorMessage = Styled.div`
    position: relative;
    left: 12.5%;
    width: 300px;
    height: 20px;
    line-height: 20px;
    margin: ${({margin})=>`${margin}`};
    font-size: 5px;
    color: red;
`
const InputSubmit = Styled(Input)`
    width: 300px;  
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
const ResultMessage = Styled.div`
    position: relative;
    top: 15px;
    left: 12.5%;
    width: 300px;
    height: 20px;
    line-height: 20px;
    font-size: 15px;
`
const FindModalStyle = {
    overlay: {
        backgroundColor: 'rgba(140,140,140,0.9)',
        zIndex: 5      
    },
    content: {
        position: "absolute",
        left: '29%',
        top: '25%',
        width: '800px',
        height: '350px',
        padding: '20px 0 0 0',
        borderRadius: 10,
        boxShadow: '9px 9px 10px #4E4E4E'
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////