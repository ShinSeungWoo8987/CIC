import React, { useContext, useEffect, useState } from 'react';
import Styled from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Modal from 'react-modal';
import Store from '../Store/Store';
import { post } from 'axios';
import FundingMember from './FundingMember';
import Paging from '../Components/Paging';
import Search from '../Components/Search';

Modal.setAppElement('#root') // Modal 태그 내부에 onRequestClose 같은 속성을 사용하기 위해 선언

function FundingMemberList() {
    const { modalState, modalStateDispatch, search, searchDispatch, pageNumber, pageNumberDispatch, projectInformation } = useContext(Store);
    const [ fundingMemberList, setFundingMemberList ] = useState('');
    const [ maxPage, setMaxPage ] = useState('');
    // Get Max Page
    useEffect(() => {
        const url = '/fundingMemberList/maxPage';
        const data = {
            search: search.value,
            number: projectInformation.number+''
        }
        post(url, data).then(res=>{
            setMaxPage(res.data)
        })
    }, [ search, modalState.fundingMemberList, projectInformation.number ]);
    // Get Project List
    useEffect(() => {
        const url = '/fundingMemberList/list';
        const data = {
            search: search.value,
            number: projectInformation.number+'',
            page: pageNumber.value+''
        }
        const newFundingMemberList = [];
        post(url, data).then(res=>{
            var idx = 0;
            while(idx < res.data.length){
                newFundingMemberList.push(
                    <FundingMember key={idx} id={res.data[idx].id} name={res.data[idx].name} phone={res.data[idx].phone} address={res.data[idx].address} cnt={res.data[idx].fundingCnt+'회'} top='none' bottom='none' color='white' foneWeight='bold'/>
                )
                idx++;
            }
            setFundingMemberList(newFundingMemberList);
        })
    }, [ search, modalState.fundingMemberList, pageNumber, projectInformation.number ]);
    // Funding Modal Setting
    const closeModal = (e) => {
        modalStateDispatch({type: 'DEFAULT'});
        pageNumberDispatch({type: 'DEFAULT'});
        searchDispatch({type: 'DEFAULT'});
    }
    return <Modal 
                isOpen= { modalState.fundingMemberList }
                style={ FundingMemberListModalStyle }
                onRequestClose={(e) => closeModal(e)}
            >
                <Text>펀딩 참여자 명단</Text>
                <FundingMember id='아이디' name='이름' phone='번호' address='주소' cnt='참여횟수' top='none' bottom='none' color='#FAFAFA' foneWeight='bold' zIndex='1'/>
                
                {!fundingMemberList?<Preparing>목록을 불러오는 중입니다 . . .</Preparing>:
                    fundingMemberList.length===0?<NoList>펀딩에 참여한 인원이없습니다.</NoList>:
                        <>
                            <Container>
                                <SubContainer height='480px'>
                                {fundingMemberList}
                                </SubContainer>
                            </Container>
                            <Search />
                            <Paging maxPage={maxPage} bottom='-10px'/>
                        </>
                }
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
const NoList = Styled.div`
    line-height: 300px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
`
const Text = Styled.div`
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin: 0 0 10px 0;
`
const Container = Styled.div`
    margin: 0 0 30px 0;

    animation-duration: 2s;
    animation-name: showContainer;
    animation-fill-mode: forwards;

    @keyFrames showContainer {
        0% { opacity: 0 }
        100% { opacity: 1}
    }
`
const SubContainer = Styled.div`
    width: ${({width})=>`${width}`};
    height: ${({height})=>`${height}`};
    background-color: ${({bg})=>`${bg}`};
`

const FundingMemberListModalStyle = {
    overlay: {
        backgroundColor: 'rgba(140,140,140,0.9)',
        zIndex: 5      
    },
    content: {
        position: "absolute",
        left: '13%',
        top: '13%',
        padding: '50px 125px',
        width: '60%',
        height: '650px',
        borderRadius: 10,
        boxShadow: '9px 9px 10px #4E4E4E'
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////