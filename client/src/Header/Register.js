import React, {useContext, useState}  from 'react';
import Styled from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Modal from 'react-modal';
import DaumPostcode from 'react-daum-postcode';
import Store from '../Store/Store.js';
import { put } from 'axios'

Modal.setAppElement('#root') // Modal 태그 내부에 onRequestClose 같은 속성을 사용하기 위해 선언

/*
    - 실시간 아이디 중복체크
    - 실시간 비밀번호 동일 유무 체크
    - 실시간 아이디 및 비밀번호 제한된 문자 체크
    - 우편번호
    - DB 연결
*/

function Register() {
    // Login State
    const {session, sessionDispatch} = useContext(Store);
    const register=session.state?'':'회원가입';
    // Register Modal Setting
    const [registerModalState, setRegisterModalState] = useState(false);
    const changeRegisterModalState = (e) => {
        e.preventDefault();
        if(register === '회원가입'){
            setRegisterModalState(true);
        }
    };
    // Postcode Modal Setting
    const [postcodeModalState, setPostcodeModalState] = useState(false);
    const changePostcodeModalState = (e) => {
        e.preventDefault();
        setPostcodeModalState(true);
    };
    // Postcode & Address Value Setting
    const [postcode, setPostcode] = useState('');
    const [address1, setAddress1] = useState('');
    const handleComplete = (data) => {
        setPostcode(data.zonecode);
        setAddress1(data.address);
        setPostcodeModalState(false);
    };
    // Register Information Setting
    const {user, userDispatch} = useContext(Store);
    const onSubmit = (e) => {
        e.preventDefault();
        const {id,pw1,pw2,name,birth,phone,postcode,address1,address2} = e.target;
        if(pw1.value !== pw2.value){
            document.getElementById('pw2').focus();
            return false;
        }
        let newUser = user;
        newUser = {
            id:id.value,
            pw:pw1.value,
            name:name.value,
            birth:birth.value,
            phone:phone.value,
            postcode:postcode.value,
            address1:address1.value,
            address2:address2.value
        };
        const url = '/register';
        const data = newUser;
        put(url,data).then(res=>{
        });
        setRegisterModalState(false);
    };
    // Password Valid Check
    const [passwordError, setPasswordError] = useState('');
    const checkPassword = (e) => {
        e.preventDefault();
        const pw = e.target.value;
        // Restricted Charater
        if(pw.indexOf(" ") !== -1 || pw.indexOf("=") !== -1){
            setPasswordError("사용할 수 없는 비밀번호입니다.");
        }else{
            setPasswordError('');
        }
    }
    // Password Equal Check
    const [passwordConfirmError, setPasswordConfirmError] = useState('');
    const checkPasswordConfirm = (e) => {
        e.preventDefault();
        var pw1 = document.getElementById('pw1').value
        var pw2 = e.target.value;
        if(pw1 !== pw2){
            setPasswordConfirmError('비밀번호가 일치하지 않습니다.');
        }else{
            setPasswordConfirmError('');
        }
    }
    // Id Valid Check
    const [idError, setIdError] = useState('');
    const checkId = (e) => {
        e.preventDefault();
        const id = e.target.value;
        // Restricted Charater
        if(id.indexOf(" ") !== -1 || id.indexOf("=") !== -1){
            setIdError("사용할 수 없는 아이디입니다.");
            return false;   
        }
        const url = '/memberList';
        const data = {
            id: id
        }
        put(url,data).then(res=>{
            setIdError(res.data);
        });
    }
    return(
        <Container>
            <LinkModal href='login' onClick={(e)=>changeRegisterModalState(e)}>{register}</LinkModal>
            <Modal 
                isOpen={registerModalState}
                style={RegisterModalStyle}
                onRequestClose={(e) => setRegisterModalState(false)}
                // shouldCloseOnOverlayClick={false} // 화면 밖 클릭 시 종료되는 기능 제거
            >
                <Form onSubmit={(e)=>onSubmit(e)}>
                    <InputId id='id' type='text' placeholder="아이디" required pattern="[A-Za-z0-9]{3,12}" onChange={(e)=>checkId(e)}/><br/>
                    <SpanText id='error' value="테스트">{idError}</SpanText><br/>
                    <InputPw id='pw1' type='password' placeholder="비밀번호" required onChange={(e)=>checkPassword(e)}/><br/>
                    <SpanText id='error' value="테스트">{passwordError}</SpanText><br/>
                    <InputPw id='pw2' type='password' placeholder="비밀번호 확인" required onChange={(e)=>checkPasswordConfirm(e)}/><br/>
                    <SpanText id='error' value="테스트">{passwordConfirmError}</SpanText><br/>
                    <InputText id='name' type='text' placeholder="이름" required/><br/>
                    <InputDate id='birth' type='date' min='1996-01-01' max='2099-12-31' required/><br/>
                    <InputText id='phone' type='tel' placeholder="010 - 0000 - 0000" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" /><br/>
                    <InputPostcode id='postcode' name="postcode" type="text" placeholder="우편번호" value={postcode} required readOnly/>
                    <BtnPostcode type='submit' value='우편번호 검색' onClick={(e)=>changePostcodeModalState(e)}/><br/>
                    <InputText id="address1" type="text" placeholder="도로명 주소" value={address1} required readOnly/><br/>
                    <InputText id="address2" type="text" placeholder="상세 주소" />
                    <Modal 
                        isOpen={postcodeModalState}
                        style={PostcodeModalStyle}
                        onRequestClose={(e) => setPostcodeModalState(false)}
                        // shouldCloseOnOverlayClick={false} // 화면 밖 클릭 시 종료되는 기능 제거
                    >
                        <DaumPostcode
                            onComplete={handleComplete}
                        />
                    </Modal><br/>
                    <InputSubmit type="submit" value="회원가입"/>
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
    text-shadow: 0 3px 7px #D6D6D6;
    border: none;
    border-radius: 10px;
    color: white;
    background-color: #A6A6A6;
`
const InputSubmit = Styled(Input)`
    width: 361px;  
    font-size: 20px;
    font-weight: bold;
    text-shadow: 0 3px 7px #D6D6D6;
    margin: 30px 0 0 0;
    border: none;
    color: white;
    background-color: #83E538;
`
const SpanText = Styled.span`
    position: relative;
    left: 18%;
    bottom: 4px;
    font-size: 5px;
    color: red;
`
const RegisterModalStyle = {
    overlay: {
        backgroundColor: 'rgba(140,140,140,0.9)',
        zIndex: 3               
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
const PostcodeModalStyle = {
    overlay: {
        backgroundColor: 'rgba(140,140,140,0.9)',
        zIndex: 3               
    },
    content: {
        position: "absolute",
        left: '37.5%',
        top: '22.5%',
        width: '500px',
        height: '450px',
        borderRadius: 10,
        boxShadow: '9px 9px 10px #4E4E4E'
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////