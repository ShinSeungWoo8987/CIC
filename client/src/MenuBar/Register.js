import React, {useContext, useState}  from 'react';
import Styled from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Modal from 'react-modal';
import DaumPostcode from 'react-daum-postcode';
import Store from '../Store/Store';
import { put, post } from 'axios'

Modal.setAppElement('#root') // Modal 태그 내부에 onRequestClose 같은 속성을 사용하기 위해 선언

function Register() {
    const { session } = useContext(Store);
    const register=session.state?'':'회원가입';
    const [registerModalState, setRegisterModalState] = useState(false);
    const [postcodeModalState, setPostcodeModalState] = useState(false);
    const [postcode, setPostcode] = useState('');
    const [address1, setAddress1] = useState('');
    const [passwordMessage, setPasswordMessage] = useState(''); // Password Valid Check Message
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState(''); // Password Equal Check Message
    const [idMessage, setIdMessage] = useState(''); // Id Valid Check Message
    // Register Modal Setting
    const openRegisterModal = (e) => {
        e.preventDefault();
        if(register === '회원가입'){
            setRegisterModalState(true);
        }
    };
    const closeRegisterModal = () => {
        setIdMessage("");
        setPasswordMessage("");
        setPasswordConfirmMessage("");
        setPostcode("");
        setAddress1("");
        setRegisterModalState(false);
    }
    // Postcode Modal Setting
    const changePostcodeModalState = (e) => {
        e.preventDefault();
        setPostcodeModalState(true);
    };
    // Postcode & Address Value Setting
    const handleComplete = (data) => {
        setPostcode(data.zonecode);
        setAddress1(data.address);
        setPostcodeModalState(false);
    };
    // Register Member
    const onSubmit = (e) => {
        e.preventDefault();
        const {id,pw1,pw2,name,birth,phone,postcode,address1,address2} = e.target;
        if(pw1.value !== pw2.value){
            document.getElementById('pw2').focus();
            return false;
        }
        let newUser = {
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
            if(res.data === 'Fail'){
                return false;
            }
        });
        closeRegisterModal();
    };
    // Password Valid Check
    const checkPassword = (e) => {
        e.preventDefault();
        const pw = e.target.value;
        // Restricted Charater
        if(pw.indexOf(" ") !== -1 || pw.indexOf("=") !== -1 || pw.indexOf("'") !== -1 ){
            setPasswordMessage("사용할 수 없는 비밀번호입니다.");
        }else{
            setPasswordMessage('');
        }
    }
    // Password Equal Check
    const checkPasswordConfirm = (e) => {
        e.preventDefault();
        var pw1 = document.getElementById('pw1').value
        var pw2 = e.target.value;
        if(pw1 !== pw2){
            setPasswordConfirmMessage('비밀번호가 일치하지 않습니다.');
        }else{
            setPasswordConfirmMessage('');
        }
    }
    // Id Valid Check
    const checkId = (e) => {
        e.preventDefault();
        const id = e.target.value;
        // Restricted Charater
        if(id.indexOf(" ") !== -1 || id.indexOf("=") !== -1 || id.indexOf("'") !== -1){
            setIdMessage("사용할 수 없는 아이디입니다.");
            return false;   
        }
        const url = '/memberList';
        const data = {
            id: id
        }
        post(url,data).then(res=>{
            setIdMessage(res.data);
        });
    }
    return(
        <Container>
            <LinkModal href='login' onClick={(e)=>openRegisterModal(e)}>{register}</LinkModal>
            <Modal 
                isOpen={registerModalState}
                style={RegisterModalStyle}
                onRequestClose={(e) => closeRegisterModal()}
                // shouldCloseOnOverlayClick={false} // 화면 밖 클릭 시 종료되는 기능 제거
            >
                <Form onSubmit={(e)=>onSubmit(e)}>
                    {/* RealTime Id Valid Check */}
                    {/* <InputId id='id' type='text' placeholder="아이디" required pattern="[A-Za-z0-9]{3,12}" onChange={(e)=>checkId(e)}/><br/> */}
                    {/* Lost Focus, Id Valid Check */}
                    <InputId id='id' type='text' placeholder="아이디" required pattern="[A-Za-z0-9]{3,12}" onBlur={(e)=>checkId(e)}/><br/>
                    <SpanText>{idMessage}</SpanText><br/>
                    <InputPw id='pw1' type='password' placeholder="비밀번호" required onChange={(e)=>checkPassword(e)}/><br/>
                    <SpanText>{passwordMessage}</SpanText><br/>
                    <InputPw id='pw2' type='password' placeholder="비밀번호 확인" required onChange={(e)=>checkPasswordConfirm(e)}/><br/>
                    <SpanText>{passwordConfirmMessage}</SpanText><br/>
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
                    </Modal>
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
    width: 75px;
`
const LinkModal = Styled.a`
    color: #A3A3A3;

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