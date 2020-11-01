import React, {useContext, useEffect, useState} from 'react';
import Styled from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Store from '../Store/Store';
import Item from '../Components/Item';
import { post } from 'axios'
import Paging from '../Components/Paging';

function ProejctList() {
    const { globalState, pageCnt } = useContext(Store);
    const [ projectList, setProjectList ] = useState('');
    const [ maxPage, setMaxPage ] = useState('');
    // const [ paging, setPaging ] = useState('');
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
    }, [ globalState ]);
    // Get Project List
    useEffect(() => {
        const newProjectList = [];
        const url = `/${globalState.main}/list`;
        const data = {
            page: pageCnt.value+'',
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
    }, [ globalState, pageCnt.value ]);
    // Navigation Setting
    let _category = '';
    let _period = '';
    
    if(globalState.main==='fundingList') _category='펀딩목록';
    if(globalState.main==='projectList') _category='프로젝트목록';
    if(globalState.main==='projectListAll') _category='전체 프로젝트목록';


    if(globalState.sub==='continue') _period='진행중';
    if(globalState.sub==='close') _period='마감';

    return(
        <Container>
            <Navigation>내정보&nbsp;&gt;&nbsp;{_category}&nbsp;&gt;&nbsp;{_period}</Navigation>
            {!projectList || projectList.length === 0?<Preparing>준비중입니다</Preparing>:
            <>
            <ItemContainer>
                {projectList}
            </ItemContainer>
            <Paging maxPage={maxPage}/>
            </>
            }
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
    margin-left: 50px;
    margin-bottom: 6px;
    text-align: left;
`
const ItemContainer = Styled(Left)`
    width: 100%;
    height: 824px;
`
const PageContainer = Styled(Left)`
    position: relative;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%);
`
const Page = Styled(Left)`
    color: #A3A3A3;
    font-weight: normal;
    cursor: pointer;
    margin: 0 5px; 
    
    &:hover {
        color: black;
        font-weight: bold;
    }
`
const SelectPage = Styled(Page)`
    font-weight: bold;
    color: black;
    text-shadow: 1px 1px 2px gray;
    cursor: default;   
`
const Preparing = Styled(Navigation)`
    width: 100%;
    height: 824px;
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////