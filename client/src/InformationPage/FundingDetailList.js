import React, {useContext, useEffect, useState} from 'react';
import Styled from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Store from '../Store/Store';
import Modal from 'react-modal';
import { post } from 'axios';
import Paging from '../Components/Paging';
import Search from '../Components/Search';
import FundingMember from '../ProjectDetails/FundingMember';

Modal.setAppElement('#root') // Modal 태그 내부에 onRequestClose 같은 속성을 사용하기 위해 선언

function FundingDetailList() {
    const { modalState, modalStateDispatch, search, searchDispatch, pageNumber, pageNumberDispatch, projectInformation } = useContext(Store);
    const [ fundingDetailList, setFundingDetailList ] = useState('');
    const [ maxPage, setMaxPage ] = useState('');
    const [ deleteCheck, setDeleteCheck ] = useState(1);
    const blockPerCnt = 10;
    console.log("delete : ",deleteCheck);
    // Get Max Page
    useEffect(() => {
        const url = '/fundingDetailList/maxPage';
        const data = {
            type: search.type,
            search: search.value
        }
        post(url, data).then(res=>{
            setMaxPage(res.data)
        })

    }, [ search, modalState.fundingDetailList, deleteCheck ]);
    // Get Funding List
    useEffect(() => {
        const url = '/fundingDetailList/list';
        const data = {
            type: search.type,
            search: search.value,
            page: pageNumber.value+''
        }
        const newFundingDetailList = [];
        post(url, data).then(res=>{
            var idx = 0;
            while(idx < res.data.length){
                newFundingDetailList.push(
                    <FundingMember key={idx} number={res.data[idx].number} title={res.data[idx].title} period={res.data[idx].period} name={res.data[idx].name} address={res.data[idx].address} act='삭제' top='none' bottom='none' color='white' foneWeight='bold' type='fundingDetailList' deleteCheck={deleteCheck} setDeleteCheck={setDeleteCheck}/>
                )
                idx++;
            }
            setFundingDetailList(newFundingDetailList);
        })
    }, [ search, modalState.fundingDetailList, pageNumber, projectInformation.number, deleteCheck ]);
    // Funding Modal Setting
    const closeModal = (e) => {
        modalStateDispatch({type: 'DEFAULT'});
        pageNumberDispatch({type: 'DEFAULT'});
        searchDispatch({type: 'DEFAULT'});
        setDeleteCheck(1)
    }
    return  <Modal 
                isOpen= { modalState.fundingDetailList }
                style={ FundingDetailListModalStyle }
                onRequestClose={(e) => closeModal(e)}
                // shouldCloseOnOverlayClick={false} // 화면 밖 클릭 시 종료되는 기능 제거
            >
                <Text>펀딩목록 세부정보</Text>
                <FundingMember title='프로젝트' period='기간' name='이름' address='배송지' act='삭제' top='none' bottom='none' bg='#b8e994' foneWeight='bold' zIndex='1' type='fundingDetailList' header='true'/>
                
                {!fundingDetailList?<Preparing>목록을 불러오는 중입니다 . . .</Preparing>:
                    fundingDetailList.length===0?
                        <>
                        <NoList>참여한 펀딩이 없습니다.</NoList>
                        <Search use='true'/>
                        <Paging maxPage={maxPage} blockPerCnt={blockPerCnt} bottom='-10px'/>
                        </>
                        :
                        <>
                            <>
                                <Container className='container'>
                                    <SubContainer height='480px'>
                                    {fundingDetailList}
                                    </SubContainer>
                                </Container>
                                <Search use='true'/>
                                <Paging className='paging' maxPage={maxPage} blockPerCnt={blockPerCnt} bottom='-10px'/>
                            </>
                        </>
                }
            </Modal>
}
export default FundingDetailList;
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
    height: 510px;
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

const FundingDetailListModalStyle = {
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