import React, {useContext, useState}  from 'react';
import Styled from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Modal from 'react-modal';
import DaumPostcode from 'react-daum-postcode';
import Store from '../Store/Store.js';

Modal.setAppElement('#root') // Modal 태그 내부에 onRequestClose 같은 속성을 사용하기 위해 선언

function Register() {
    const register=true?'회원가입':'';
    // Register Modal Setting
    const [registerModalState, setRegisterModalState] = useState(false);
    const changeRegisterModalState = (e) => {
        console.log("changeRegisterModalState");
        e.preventDefault();
        setRegisterModalState(true);
    };
    // Postcode Modal Setting
    const [postcodeModalState, setPostcodeModalState] = useState(false);
    const changePostcodeModalState = (e) => {
        console.log("changePostcodeModalState");
        e.preventDefault();
        setPostcodeModalState(true);
    };
    // Postcode & Address Value Setting
    const [postcode, setPostcode] = useState('');
    const [address1, setAddress1] = useState('');
    const handleComplete = (data) => {
        console.log("handleComplete");
        setPostcode(data.zonecode);
        setAddress1(data.address);
        setPostcodeModalState(false);
    };
    // Register Information Setting
    const {user, userDispatch} = useContext(Store);
    const onSubmit = (e) => {
        e.preventDefault();
        const {id,pw,name,birth,phone,postcode,address1,address2} = e.target;
        let newUser = user;
        newUser = {
            id:id.value,
            pw:pw.value,
            name:name.value,
            birth:birth.value,
            phone:phone.value,
            postcode:postcode.value,
            address1:address1.value,
            address2:address2.value
        };
        userDispatch( {type: 'INFORMATION', payload: newUser} )
    };
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
                    <InputText id='id' type='text' placeholder="아이디"/><br/>
                    <InputText id='pw' type='password' placeholder="비밀번호" /><br/>
                    <InputText id='name' type='text' placeholder="이름" /><br/>
                    <InputDate id='birth' type='date' min='1996-01-01' max='2099-12-31' /><br/>
                    <InputText id='phone' type='tel' placeholder="010 - 0000 - 0000" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" /><br/>
                    <InputPostcode id='postcode' name="postcode" type="text" placeholder="우편번호" value={postcode} readOnly/>
                    <BtnPostcode type='submit' value='우편번호 검색' onClick={(e)=>changePostcodeModalState(e)}/><br/>
                    <InputText id="address1" type="text" placeholder="도로명 주소" value={address1} readOnly/><br/>
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
    padding: 37.5px 0 0 0;
`
const Input = Styled.input`
    position: relative;
    left: 14%;
    width: 355px;
    height: 50px;
    margin: 0 0 15px 0;
    font-size: 15px;
    text-indent: 15px;
    border: 1px solid #E0E0E0;
    border-radius: 10px;
    color: #717171;
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
const RegisterModalStyle = {
    overlay: {
        backgroundColor: 'rgba(140,140,140,0.9)',
        zIndex: 3               
    },
    content: {
        position: "absolute",
        left: '37.5%',
        top: '10%',
        width: '500px',
        height: '700px',
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