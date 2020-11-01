import React, { useContext, useEffect, useState } from 'react';
import Styled, { keyframes } from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Modal from 'react-modal';
import Store from '../Store/Store';
import { post } from 'axios';
import FundingMember from './FundingMember';

Modal.setAppElement('#root') // Modal 태그 내부에 onRequestClose 같은 속성을 사용하기 위해 선언

function FundingMemberList() {
    const { modalState, modalStateDispatch, searchProject, pageCnt, projectInformation } = useContext(Store);
    const [ fundingMemberList, setFundingMemberList ] = useState('');
    const [ maxPage, setMaxPage ] = useState('');
    // Get Max Page - 무한 스크롤 구현 후 제거
    useEffect(() => {
        const url = '/fundingMemberList/maxPage';
        const data = {
            search: searchProject.value,
            number: projectInformation.number
        }
        post(url, data).then(res=>{
            setMaxPage(res.data)
        })
    }, [ searchProject, modalState.fundingMemberList ]);
    // Get Project List
    useEffect(() => {
        const url = '/fundingMemberList/list';
        const data = {
            search: searchProject.value,
            number: projectInformation.number
        }
        post(url, data).then(res=>{
            console.log(res.data);
        })
    }, [ searchProject, modalState.fundingMemberList, pageCnt ]);
    // Funding Modal Setting
    const closeModal = (e) => {
        const newModalState = {
            fundingMemberList: false
        }
        modalStateDispatch({type: 'CHANGE_MODALSTATE', payload: newModalState});
    }
    return <Modal 
                isOpen= { !modalState.fundingMemberList }
                style={ FundingMemberListModalStyle }
                onRequestClose={(e) => closeModal(e)}
                // shouldCloseOnOverlayClick={false} // 화면 밖 클릭 시 종료되는 기능 제거
            >
                <FundingMember id='아이디' name='이름' phone='번호' address='주소' cnt='참여횟수' border='none' top='none' bottom='none' color='#FAFAFA' foneWeight='bold'/>
                {!fundingMemberList?<Preparing>목록을 불러오는 중입니다 . . .</Preparing>:'없넹?'}
            </Modal>
}
export default FundingMemberList;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Preparing = Styled.div`
    float: left;
    width: 215px;
    height: 25px;
    line-height: 25px;
    margin: 5px 0 0 0;
    font-size: 17.5px;
    font-weight: bold;
    overflow: hidden;

    animation-duration: 3s;
    animation-name: preparing;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;

    @keyFrames preparing {
        15% { width: 225px; }
        30% { width: 235px; }
        45% { width: 245px; }
        60% { width: 235px; }
        75% { width: 225px; }
        90% { width: 215px; }
        100% { width: 215px; }
    }
`

const FundingMemberListModalStyle = {
    overlay: {
        backgroundColor: 'rgba(140,140,140,0.9)',
        zIndex: 1            
    },
    content: {
        position: "absolute",
        left: '13%',
        top: '14%',
        padding: '50px 125px',
        width: '60%',
        height: '625px',
        borderRadius: 10,
        boxShadow: '9px 9px 10px #4E4E4E'
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////