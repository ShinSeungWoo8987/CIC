import React, {useContext, useState}  from 'react';
import Styled from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Modal from 'react-modal';
import Store from '../Store/Store';
import { post } from 'axios'
import {executeRegisterService} from '../Jwt/AuthenticationService';
import { checkInputValueRestirctedCharacter } from '../Util/Util';

Modal.setAppElement('#root') // Modal 태그 내부에 onRequestClose 같은 속성을 사용하기 위해 선언

function Register() {
    const { addressValue, addressValueDispatch, modalState, modalStateDispatch } = useContext(Store);
    const [registerModalState, setRegisterModalState] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState(''); // Password Valid Check Message
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState(''); // Password Equal Check Message
    const [idMessage, setIdMessage] = useState(''); // Id Valid Check Message
    // Register Modal Setting
    const openRegisterModal = (e) => {
        e.preventDefault();
        setRegisterModalState(true);
    };
    const closeRegisterModal = () => {
        setIdMessage("");
        setPasswordMessage("");
        setPasswordConfirmMessage("");
        addressValueDispatch({type: 'DEFAULT'});
        setRegisterModalState(false);
    }
    // Postcode Modal Setting
    const openPostcodeModal = (e) => {
        e.preventDefault();
        const newModalState = {
            login:modalState.login,
            postcode: true
        }
        modalStateDispatch({type:"CHANGE_MODALSTATE", payload: newModalState});
    };
    // Id Valid Check
    const checkId = (e) => {
        e.preventDefault();
        const id = e.target.value;
        setIdMessage('');
        const check = checkInputValueRestirctedCharacter(id);
        if(check === -1){
            setIdMessage("사용할 수 없는 아이디입니다.");
            document.getElementById(e.target.id).focus();
            return false;
        }
        const url = '/member/idList';
        const data = {
            id: id
        }
        post(url,data).then(res=>{
            setIdMessage(res.data);
        });
    }
    // Input Value Valid Check
    const checkInutValue = (e) => {
        const inputId = e.target.id;
        const inputValue = e.target.value;
        const check = checkInputValueRestirctedCharacter(inputValue);
        if(check === -1){
            if(inputId === 'pw1'){
                setPasswordMessage('사용할 수 없는 비밀번호입니다.');
                document.getElementById('pw1').focus();
            }else{
                document.getElementById(inputId).value = '';
                document.getElementById(inputId).focus();
            }
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
    // Register Submit
    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        const {id,pw1,name,birth,phone,postcode,address1,address2} = e.target;
        executeRegisterService(
            id.value,
            pw1.value,
            name.value,
            birth.value,
            phone.value,
            postcode.value,
            address1.value,
            address2.value
        ).then(res=>{});
        closeRegisterModal();
    };
    return(
        <Container>
            <LinkModal href='login' onClick={(e)=>openRegisterModal(e)}>회원가입</LinkModal>
            <Modal 
                isOpen={registerModalState}
                style={RegisterModalStyle}
                onRequestClose={(e) => closeRegisterModal(e)}
            >
                <Form onSubmit={(e)=>handleRegisterSubmit(e)}>
                    <InputId id='id' type='text' placeholder="아이디" pattern="[A-Za-z0-9!@%^*]{8,15}" required autoFocus onBlur={(e)=>checkId(e)}/><br/>
                    <SpanText>{idMessage}</SpanText><br/>
                    <InputPw id='pw1' type='password' placeholder="비밀번호" pattern="[A-Za-z0-9!@%^*]{8,15}" required onBlur={(e)=>checkInutValue(e)}/><br/>
                    <SpanText>{passwordMessage}</SpanText><br/>
                    <InputPw id='pw2' type='password' placeholder="비밀번호 확인" pattern="[A-Za-z0-9!@%^*]{8,15}" required onChange={(e)=>checkPasswordConfirm(e)}/><br/>
                    <SpanText>{passwordConfirmMessage}</SpanText><br/>
                    <InputText id='name' type='text' placeholder="이름" required onBlur={(e)=>checkInutValue(e)}/><br/>
                    <InputDate id='birth' type='date' min='1970-01-01' max='2099-12-31' required/><br/>
                    <InputText id='phone' type='tel' placeholder="01000000000" pattern="[0-9]{3}[0-9]{4}[0-9]{4}" onBlur={(e)=>checkInutValue(e)}/><br/>
                    <InputPostcode id='postcode' name="postcode" type="text" placeholder="우편번호" value={addressValue.postcode} required readOnly/>
                    <BtnPostcode type='button' value='우편번호 검색' onClick={(e)=>openPostcodeModal(e)}/><br/>
                    <InputText id="address1" type="text" placeholder="도로명 주소" value={addressValue.address1} required readOnly/><br/>
                    <InputText id="address2" type="text" placeholder="상세 주소" onBlur={(e)=>checkInutValue(e)}/>
                    <InputSubmit type="submit" value="회원가입"/>
                </Form>
            </Modal>
        </Container>
    );
}

export default Register;
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
const Form = Styled.form`
    padding: 25px 0 0 0;
`
const Input = Styled.input`
    position: relative;
    left: 14%;
    width: 355px;
    height: 50px;
    margin: 0 0 20px 0;
    font-size: 15px;
    text-indent: 15px;
    border: 1px solid #E0E0E0;
    border-radius: 10px;
    color: #717171;
`
const InputId = Styled(Input)`
    margin: 0 0;
`
const InputPw = Styled(InputId)`
`
const SpanText = Styled.span`
    position: relative;
    left: 18%;
    bottom: 4px;
    font-size: 5px;
    color: red;
`
const InputText = Styled(Input)`
`
const InputDate = Styled(Input)`
    text-indent: 7.5px;
`
const InputPostcode = Styled(Input)`
    width: 175px;
    margin: 0 28.5px 15px 0;
`
const BtnPostcode = Styled(Input)`
    width: 150px;
    height: 54px;
    font-weight: bold;
    text-indent: 0px;
    text-shadow: 1px 1px 7px #BDBDBD; 
    box-shadow: 1px 1px 7px #BDBDBD;
    border: none;
    border-radius: 10px;
    color: white;
    background-color: #A6A6A6;

    &:hover {
        box-shadow: 1px 1px 9px #8C8C8C; 
    }
`
const InputSubmit = Styled(Input)`
    width: 361px;  
    font-size: 20px;
    font-weight: bold;
    text-shadow: 1px 1px 7px #BDBDBD; 
    box-shadow: 1px 1px 7px #BDBDBD;
    margin: 30px 0 0 0;
    border: none;
    color: white;
    background-color: #83E538;

    &:hover {
        box-shadow: 1px 1px 9px #8C8C8C; 
    }
`
const RegisterModalStyle = {
    overlay: {
        backgroundColor: 'rgba(140,140,140,0.0)',
        zIndex: 98            
    },
    content: {
        position: "absolute",
        left: '37.5%',
        top: '7.5%',
        width: '500px',
        height: '800px',
        borderRadius: 10,
        boxShadow: '9px 9px 10px #4E4E4E'
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////