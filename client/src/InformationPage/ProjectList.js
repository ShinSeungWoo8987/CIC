import React, {useContext, useEffect, useState} from 'react';
import Styled from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Store from '../Store/Store';
import Item from '../Components/Item';
import { post } from 'axios'
import Paging from '../Components/Paging';
import FundingDetailList from './FundingDetailList';

function ProejctList() {
    const { globalState, pageNumber, modalState, modalStateDispatch, pageNumberDispatch } = useContext(Store);
    const [ projectList, setProjectList ] = useState('');
    const [ maxPage, setMaxPage ] = useState('');
    // Get Max Page
    useEffect(() => {
        const url = `/${globalState.main}/maxPage`;
        const data = {
            sub: globalState.sub
        }
        post(url, data).then(res=>{
            if(res.data===0)
                setMaxPage(1);    
            else
                setMaxPage(res.data);
        })
    }, [ globalState, modalState.fundingDetailList ]);
    // Get Project List
    useEffect(() => {
        const newProjectList = [];
        const url = `/${globalState.main}/list`;
        const data = {
            page: pageNumber.value+'',
            sub: globalState.sub
        }
        post(url, data).then(res=>{
            var idx = 0;
            while(idx<res.data.length){
                newProjectList.push(<Item key={idx} number={res.data[idx].pro_number} dDay={res.data[idx].dday} thumbnail={res.data[idx].pro_thumbnail} logo={res.data[idx].pro_logo} 
                    creator={res.data[idx].mem_id} title={res.data[idx].pro_title} targetMoney={res.data[idx].pro_target} saveMoney={res.data[idx].fundingCnt*res.data[idx].pro_price}
                    fundingCnt={res.data[idx].fundingCnt} price={res.data[idx].pro_price}/>)
                idx++;
            }
            setProjectList(newProjectList);
        })
    }, [ globalState, pageNumber.value, modalState.fundingDetailList ]);
    // Navigation Setting
    let _category = '';
    let _period = '';
    
    if(globalState.main==='fundingList') _category='펀딩목록';
    if(globalState.main==='projectList') _category='프로젝트목록';
    if(globalState.main==='projectListAll') _category='전체 프로젝트목록';


    if(globalState.sub==='continue') _period='진행중';
    if(globalState.sub==='close') _period='마감';

    const openCancleModal = (e) => {
        const newModalState = {
            fundingDetailList: true
        }
        modalStateDispatch({type: 'CHANGE_MODALSTATE', payload: newModalState})
        pageNumberDispatch({type: 'DEFAULT'});
    }
    return(
        <Container>
            <Navigation>내정보&nbsp;&gt;&nbsp;{_category}&nbsp;&gt;&nbsp;{_period}</Navigation>
            {!projectList?<Box><Preparing>목록을 불러오는 중입니다 . . .</Preparing></Box>:
                projectList.length === 0?
                <>
                <NoList>참여한 펀딩이 없습니다.</NoList>
                <Paging maxPage={maxPage} bottom='20px'/>
                </>
                :
                <>
                {globalState.main==='fundingList'?<BtnCancle onClick={(e)=>openCancleModal(e)}>펀딩취소</BtnCancle>:''}
                <ItemContainer>
                    {projectList}
                </ItemContainer>
                <Paging maxPage={maxPage} bottom='20px'/>
                </>
            }
            <FundingDetailList/>
        </Container>
    );
}
export default ProejctList;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Left = Styled.div`
    float: left;
`
const Container = Styled(Left)`
    width: 1465px;
    margin: 0 0 0 100px;
`
const Navigation = Styled.div`
    font-size: 15px;
    color: #777777;
    margin: 0 60px 12.5px 0;
    text-align: right;
`
const ItemContainer = Styled(Left)`
    width: 100%;
    height: 824px;
`
const Box = Styled(Left)`
    width: 100%;
`
const Preparing = Styled(Navigation)`
    width: 215px;
    height: 25px;
    margin: 5px 0 0 50px;
    font-size: 17.5px;
    font-weight: bold;
    text-align: left;
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
    height: 824px;
    line-height: 300px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
`
const BtnCancle = Styled.button`
    position: absolute;
    left: 1567.5px;
    top: 925px;
    width: 72px;
    height: 30px;
    font-size: 15px;
    font-weight: bold;
    color: white;
    text-shadow: 1px 1px 3px gray;
    
    text-align: right;
    border: none;
    border-radius: 5px;
    background-color: #a29bfe;
    cursor: pointer;
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////