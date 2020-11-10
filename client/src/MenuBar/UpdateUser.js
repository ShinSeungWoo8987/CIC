import React, { useContext, useEffect, useState } from 'react';
import Styled from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Store from '../Store/Store';
import { get, post } from 'axios';
import Modal from 'react-modal';
import { checkInputValueRestirctedCharacter } from '../Util/Util';

function UpdateUser() {
    const { modalState, modalStateDispatch, addressValue, addressValueDispatch } = useContext(Store);
    const [ userInformation, setUserInformation] = useState('');
    const [ passwordMessage, setPasswordMessage] = useState('');
    const [ nameMessage, setNameMessage] = useState('');
    const [ phoneMessage, setPhoneMessage] = useState('');
    const [ address2Message, setAddress2Message] = useState('');
    // Get User Information & Setting
    useEffect(() => {
        const url = '/member'
        get(url).then(res=>{
            const newAddressValue = {
                postcode: res.data[3],
                address1: res.data[4]
            }
            addressValueDispatch({type: 'CHANGE_ADDRESS', payload: newAddressValue})
            setUserInformation({
                id: res.data[0],
                name: res.data[1],
                phone: res.data[2],
                address2: res.data[5]
            })
        })
    }, [ modalState.updateUser, addressValueDispatch ]);
     // updateUser Modal Setting
     const closeUpdateUserModal = () => {
        modalStateDispatch({type: "DEFAULT"});
        addressValueDispatch({type: 'DEFAULT'});
    }
    // Postcode Modal Setting
    const openPostcodeModal = (e) => {
        e.preventDefault();
        const newModalState = {
            login: modalState.login,
            postcode: true,
            updateUser: modalState.updateUser
        }
        modalStateDispatch({type:"CHANGE_MODALSTATE", payload: newModalState});
    };
    // Input Value Valid Check
    const checkInutValue = (e) => {
        const inputId = e.target.id;
        const inputValue = e.target.value;
        const check = checkInputValueRestirctedCharacter(inputValue);
        if(check === -1){
            if(inputId === 'pw'){
                setPasswordMessage('사용할 수 없는 비밀번호입니다.');
                document.getElementById(inputId).focus();
            }else if(inputId === 'name'){
                setNameMessage('사용할 수 없는 이름입니다.');
                document.getElementById(inputId).focus();
            }else if(inputId === 'phone'){
                setPhoneMessage('사용할 수 없는 번호입니다.');
                document.getElementById(inputId).focus();
            }else if(inputId === 'address2'){
                setAddress2Message('사용할 수 없는 주소입니다.');
                document.getElementById(inputId).focus();
            }
        }
        // 여기부터!
    }
    // updateUser Submit
    const onUpdateUserSubmit = (e) => {
        e.preventDefault();
        const url = '/member/update'
        const data = {
            id: e.target.id.value,
            pw: e.target.pw.value,
            name: e.target.name.value,
            phone: e.target.phone.value,
            postcode: addressValue.postcode,
            address1: addressValue.address1,
            address2: e.target.address2.value
        }
        post(url, data).then(res=>{
        })
        closeUpdateUserModal();
    }
    return(
        <Container>
            <Modal 
                isOpen={modalState.updateUser}
                style={UpdateUserModalStyle}
                onRequestClose={(e) => closeUpdateUserModal(e)}
            >
                <Form onSubmit={(e)=>onUpdateUserSubmit(e)}>
                    <Input margin='0 0 20px 0' id='id' type='text' placeholder="아이디" value={userInformation.id} readOnly /><br/>
                    <Input id='pw' type='password' placeholder="비밀번호" autoFocus pattern="[A-Za-z0-9!@%^*]{8,15}" onBlur={(e)=>checkInutValue(e)}/>
                    <ErrorMessage>{passwordMessage}</ErrorMessage>
                    <Input id='name' type='text' placeholder="이름" defaultValue={userInformation.name} required onBlur={(e)=>checkInutValue(e)}/>
                    <ErrorMessage>{nameMessage}</ErrorMessage>
                    <Input id='phone' type='tel' placeholder="01000000000" defaultValue={userInformation.phone} pattern="[0-9]{3}[0-9]{4}[0-9]{4}" required onBlur={(e)=>checkInutValue(e)}/>
                    <ErrorMessage>{phoneMessage}</ErrorMessage>
                    <InputPostcode margin='0 0 20px 0' id='postcode' name="postcode" type="text" placeholder="우편번호" value={addressValue.postcode} readOnly/>
                    <BtnPostcode margin='0 0 20px 0' type='button' value='우편번호 검색' onClick={(e)=>openPostcodeModal(e)}/><br/>
                    <Input margin='0 0 20px 0' id="address1" type="text" placeholder="도로명 주소" value={addressValue.address1} readOnly/><br/>
                    <Input id="address2" type="text" placeholder="상세 주소" defaultValue={userInformation.address2} onBlur={(e)=>checkInutValue(e)}/>
                    <ErrorMessage margin='0 0 10px 0'>{address2Message}</ErrorMessage>
                    <InputSubmit type="submit" value="정보수정"/>
                </Form>
            </Modal>
        </Container>
    );
}
export default UpdateUser;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Container = Styled.div`
    float: left;
    width: 75px;
`
const Form = Styled.form`
    padding: 40px 0 0 0;
`
const Input = Styled.input`
    position: relative;
    left: 14%;
    width: 355px;
    height: 50px;
    margin: ${({margin})=>`${margin}`};
    font-size: 15px;
    text-indent: 15px;
    border: 1px solid #E0E0E0;
    border-radius: 10px;
    color: #717171;
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
const UpdateUserModalStyle = {
    overlay: {
        backgroundColor: 'rgba(140,140,140,0.9)',
        zIndex: 5      
    },
    content: {
        position: "absolute",
        left: '37.5%',
        top: '12.5%',
        width: '500px',
        height: '675px',
        borderRadius: 10,
        boxShadow: '9px 9px 10px #4E4E4E'
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////