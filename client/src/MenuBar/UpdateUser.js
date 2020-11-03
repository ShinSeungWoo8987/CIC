import React, { useContext, useEffect, useState } from 'react';
import Styled from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Store from '../Store/Store';
import { get, post } from 'axios';
import Modal from 'react-modal';

function UpdateUser() {
    const { session, modalState, modalStateDispatch, addressValue, addressValueDispatch } = useContext(Store);
    const [ userInformation, setUserInformation] = useState('');
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
    }, [ modalState.updateUser, addressValueDispatch ]); // 2020-10-31 addressValueDispatch 추가
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
    return(
        <Container>
            <Modal 
                isOpen={modalState.updateUser}
                style={UpdateUserModalStyle}
                onRequestClose={(e) => closeUpdateUserModal(e)}
                // shouldCloseOnOverlayClick={false} // 화면 밖 클릭 시 종료되는 기능 제거
            >
                <Form onSubmit={(e)=>onUpdateUserSubmit(e)}>
                    <InputText id='id' type='text' placeholder="아이디" value={userInformation.id} readOnly/><br/>
                    <InputText id='pw' type='password' placeholder="비밀번호" /><br/>
                    <InputText id='name' type='text' placeholder="이름" defaultValue={userInformation.name} required/><br/>
                    <InputText id='phone' type='tel' placeholder="010 - 0000 - 0000" defaultValue={userInformation.phone} pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" required/><br/>
                    <InputPostcode id='postcode' name="postcode" type="text" placeholder="우편번호" value={addressValue.postcode} readOnly/>
                    <BtnPostcode type='button' value='우편번호 검색' onClick={(e)=>openPostcodeModal(e)}/><br/>
                    <InputText id="address1" type="text" placeholder="도로명 주소" value={addressValue.address1} readOnly/><br/>
                    <InputText id="address2" type="text" placeholder="상세 주소" defaultValue={userInformation.address2}/>
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
    margin: 0 0 20px 0;
    font-size: 15px;
    text-indent: 15px;
    border: 1px solid #E0E0E0;
    border-radius: 10px;
    color: #717171;
`
const InputText = Styled(Input)`
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