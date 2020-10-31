import React, {useContext, useEffect, useState} from 'react';
import Styled from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Store from '../Store/Store';
import Item from '../Components/Item';
import { post } from 'axios'

function Main() {
    const { globalState, searchProject, mainPageCnt, mainPageCntDispatch} = useContext(Store);
    const [ projectList, setProjectList ] = useState('');
    const [ maxPage, setMaxPage ] = useState('');
    // Get Max Page
    useEffect(() => {
        const url = `/${globalState.main}/maxPage`;
        const data = {
            sub: globalState.sub
        }
        post(url, data).then(res=>{
            setMaxPage(res.data)
        })
    }, [ globalState, searchProject ]);
    // Get Project List
    useEffect(() => {
        const newProjectList = [];
        const url = `/${globalState.main}/list`;
        const data = {
            page: mainPageCnt.value+'',
            sub: globalState.sub
        }
        post(url, data).then(res=>{
            var idx=0;
            while(idx<res.data.length){
                newProjectList.push(<Item key={idx} number={res.data[idx].pro_number} dDay={res.data[idx].dday} thumbnail={res.data[idx].pro_thumbnail} logo={res.data[idx].pro_logo} 
                    creator={res.data[idx].mem_id} title={res.data[idx].pro_title} targetMoney={res.data[idx].pro_target} saveMoney={res.data[idx].fundingCnt*res.data[idx].pro_price}
                    fundingCnt={res.data[idx].fundingCnt} price={res.data[idx].pro_price}/>)
                idx++;
            }
            setProjectList(newProjectList);
        })
    }, [ globalState, searchProject, mainPageCnt ]);
    // var idx=0;
    // Move Page
    // const moveMainPage = (e, direction) => {
    //     e.preventDefault();
    //     if(direction==='left' && mainPageCnt.value>1){
    //         const newMainPageCnt = {
    //             value: mainPageCnt.value-1
    //         }
    //         mainPageCntDispatch({ type: 'MOVE_PAGE', payload: newMainPageCnt});
    //     }
    //     if(direction==='right' && mainPageCnt.value<maxPage){
    //         const newMainPageCnt = {
    //             value: mainPageCnt.value+1
    //         }
    //         mainPageCntDispatch({ type: 'MOVE_PAGE', payload: newMainPageCnt});
    //     }
    // }
    let _category = '';
    let _period = '';
    
    if(globalState.main==='fundingList') _category='펀딩목록';
    if(globalState.main==='projectList') _category='프로젝트목록';
    if(globalState.main==='projectListAll') _category='프로젝트목록';


    if(globalState.sub==='continue') _period='진행중';
    if(globalState.sub==='close') _period='마감';

    return(
        <Container>
            <Navigation>내정보&nbsp;&gt;&nbsp;{_category}&nbsp;&gt;&nbsp;{_period}</Navigation>
            <ItemContainer>
                {projectList}
            </ItemContainer>
        </Container>
    );
}
export default Main;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Left = Styled.div`
    float: left;
`
const Container = Styled(Left)`
    width: 1665px;
    height: 3100px;
`
const Navigation = Styled.div`
    font-size: 15px;
    color: #777777;
    margin-left: 150px;
    margin-bottom: 6px;
    text-align: left;
`
const ItemContainer = Styled(Left)`
    width: 1465px;
    height: 100px;
    margin: 0 0 0 100px;
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////