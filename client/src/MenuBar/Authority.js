import React, { useContext, useRef, useState } from 'react';
import Styled from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Store from '../Store/Store';
import { post } from 'axios';
import Modal from 'react-modal';
import { logout } from '../Jwt/AuthenticationService';
import { checkInputValueRestirctedCharacter } from '../Util/Util';

function Authority() {
    const { modalState, modalStateDispatch, globalState, globalStateDispatch, sessionDispatch, projectInformation } = useContext(Store);
    let submit = '';
    let bg = globalState.action === 'updateUser'?'#fdcb6e':'#b2bec3';
    if (globalState.action === 'updateUser')submit = '정보수정';
    else if (globalState.action === 'deleteUser') submit = '회원탈퇴';
    else if (globalState.action === 'deleteProject') submit = '프로젝트 삭제';
    const [authorityMessage, setAuthorityMessage] = useState('');
    const [pwRef] = [useRef()];
    // Authority Submit
    const onAuthoritySubmit = (e) => {
        e.preventDefault();
        const pw = pwRef.current.value;
        const check = checkInputValueRestirctedCharacter(pw);
        if(check===-1){
            setAuthorityMessage('잘못된 비밀번호입니다.');
            return;
        }
        let number = '';
        if(globalState.action === 'deleteProject')
            number = projectInformation.number
        const url = '/authenticate/pw'
        const data = {
            pw: pw,
            number: number+''
        }
        post(url, data).then(res=>{
            if(res.data[0]==='Success'){
                if(globalState.action === 'updateUser'){
                    const newModalState = {
                        updateUser: true
                    }
                    modalStateDispatch({type:"CHANGE_MODALSTATE", payload: newModalState});
                    setAuthorityMessage("");
                }else if(globalState.action === 'deleteUser'){
                    if(Number(res.data[1])===1){
                        setAuthorityMessage("창작자 회원탈퇴는 관리자에게 문의해주세요.");
                        return false;
                    }
                    const url = '/member/delete'
                    post(url).then(res=>{
                        logout();
                        sessionDispatch({type: 'DEFAULT'});
                        globalStateDispatch({type: 'DEFAULT'})
                        modalStateDispatch({type: "DEFALT"});
                        setAuthorityMessage("");
                    })
                }else if(globalState.action === 'deleteProject'){
                    setAuthorityMessage("");
                    const url = '/project/delete'
                    const data = {
                        number: number+''
                    }
                    post(url, data).then(res=>{
                        globalStateDispatch({type: 'DEFAULT'});
                        modalStateDispatch({type: 'DEFAULT'});
                    })
                }
            }else if(res.data[0]==='Fail')
            setAuthorityMessage("잘못된 비밀번호입니다.");
            else if(res.data[0]==='Refuse')
                    setAuthorityMessage("관리자에게 문의해주세요.");
        })
    }
    // Authority Modal Setting
    const closeAuthorityModal = () => {
        setAuthorityMessage("");
        modalStateDispatch({type: "DEFAULT"});
    }
    return(
        <Container>
            <Modal 
                isOpen={modalState.authority}
                style={AuthorityModalStyle}
                onRequestClose={(e) => closeAuthorityModal(e)}
            >
                <Form onSubmit={(e)=>onAuthoritySubmit(e)}>
                    <Input id='pw' ref={pwRef} type='password' placeholder="비밀번호" required /><br/>
                    <ErrorMessage>{authorityMessage}</ErrorMessage><br/>
                    <InputSubmit bg={bg} type="submit" value={submit}/>
                </Form>
            </Modal>
        </Container>
    );
}
export default Authority;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Container = Styled.div`
    float: left;
    width: 75px;
`
const Form = Styled.form`
    padding: 35px 0 0 0;
`
const Input = Styled.input`
    position: relative;
    left: 14%;
    width: 355px;
    height: 50px;
    font-size: 15px;
    text-indent: 15px;
    border: 1px solid #E0E0E0;
    border-radius: 5px;
    color: #717171;
`
const InputSubmit = Styled(Input)`
    width: 361px;  
    margin: 10px 0 0 0;
    font-size: 20px;
    font-weight: normal;
    text-shadow: 1px 1px 3px grey;
    box-shadow: 1px 1px 5px #BDBDBD;
    text-indent: 0px;
    border: none;
    border-radius: 5px;
    color: white;
    background-color: ${({bg}) => `${bg}`};
    cursor: pointer;

    &:hover {
        box-shadow: 2px 2px 5px #BDBDBD;
    }
`
const ErrorMessage = Styled.span`
    position: relative;
    left: 15%;
    font-size: 5px;
    color: red;
`
const AuthorityModalStyle = {
    overlay: {
        backgroundColor: 'rgba(140,140,140,0.9)',
        zIndex: 5      
    },
    content: {
        position: "absolute",
        left: '37.5%',
        top: '27.5%',
        width: '500px',
        height: '200px',
        borderRadius: 10,
        boxShadow: '9px 9px 10px #4E4E4E'
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////