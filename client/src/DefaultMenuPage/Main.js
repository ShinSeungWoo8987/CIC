import React, {useContext, useEffect, useState} from 'react';
import Styled from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Store from '../Store/Store';
import Item from '../Components/Item';
import { post } from 'axios'

function Main() {
    const { globalState, searchProject, pageCnt, pageCntDispatch } = useContext(Store);
    const [ projectList, setProjectList ] = useState('');
    const [ maxPage, setMaxPage ] = useState('');
    const buttonImg = `https://crowdincreative.s3.ap-northeast-2.amazonaws.com/static/`;
    // Get Max Page - 무한 스크롤 구현 후 제거
    useEffect(() => {
        const url = '/main/maxPage';
        const data = {
            search: searchProject.value,
            main: globalState.main,
            sub: globalState.sub
        }
        post(url, data).then(res=>{
            setMaxPage(res.data)
        })
    }, [ globalState, searchProject ]);
    // Get Project List
    useEffect(() => {
        const newProjectList = [];
        const url = '/main/list';
        const data = {
            page: pageCnt.value+'',
            search: searchProject.value,
            main: globalState.main,
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
    }, [ globalState, searchProject, pageCnt.value ]);
    // Move Page - 무한 스크롤 구현 후 제거
    const moveMainPage = (e, direction) => {
        e.preventDefault();
        if(direction==='left' && pageCnt.value>1){
            const newMainPageCnt = {
                value: pageCnt.value-1
            }
            pageCntDispatch({ type: 'MOVE_PAGE', payload: newMainPageCnt});
        }
        if(direction==='right' && pageCnt.value<maxPage){
            const newMainPageCnt = {
                value: pageCnt.value+1
            }
            pageCntDispatch({ type: 'MOVE_PAGE', payload: newMainPageCnt});
        }
    }
    let _category = '전체';
    let _period = '전체기간';
    
    if(globalState.main==='all') _category='전체';
    if(globalState.main==='tech') _category='테크·가전';
    if(globalState.main==='travel') _category='여행·레저';
    if(globalState.main==='fasion') _category='패션·잡화';

    if(globalState.sub==='all') _period='전체';
    if(globalState.sub==='new') _period='신규';
    if(globalState.sub==='closeSoon') _period='마감임박';
    if(globalState.sub==='close') _period='마감';

    return(
        <Container>
            <Navigation>카테고리&nbsp;&gt;&nbsp;{_category}&nbsp;&gt;&nbsp;{_period}</Navigation>
            <SubContainer>
                <LeftSide>
                    <Image src={buttonImg+'LeftMainButton.png'} onClick={(e)=>moveMainPage(e, 'left')}></Image>
                </LeftSide>
                <ItemContainer>
                    {projectList}
                </ItemContainer>
                <RightSide>
                <Image src={buttonImg+'RightMainButton.png'} onClick={(e)=>moveMainPage(e, 'right')}></Image>
                </RightSide>
            </SubContainer>
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
    text-align: center;
`
const Navigation = Styled.div`
    font-size: 15px;
    color: #777777;
    margin-left: 150px;
    margin-bottom: 6px;
    text-align: left;
`
const SubContainer = Styled(Left)`
`
const Image = Styled.img`
    width: 60px;
    vertical-align: middle;
    cursor: pointer;
`
const LeftSide = Styled(Left)`
    width: 100px;
    height: 865px;
    line-height: 800px;
`
const RightSide = Styled(LeftSide)`
`
const ItemContainer = Styled(Left)`
    width: 1465px;
    height: 100px;
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////