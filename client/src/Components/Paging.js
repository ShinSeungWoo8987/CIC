import React, { useContext, useEffect, useState } from 'react';
import Styled from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Store from '../Store/Store';

function Paging({maxPage}){
    const { pageCnt, pageCntDispatch } = useContext(Store);
    const [ paging, setPaging ] = useState('');
    // Page Setting
    useEffect(() => {
        var idx = 1;
        const newPaging = [];
        while(idx<=maxPage){
            if(idx===pageCnt.value){
                newPaging.push(
                    <SelectPage key={idx}>[{idx}]</SelectPage>
                );
            }else{
                newPaging.push(
                    <Page key={idx} id={idx} onClick={(e) => movePage(e)}>[{idx}]</Page>
                );
            }
            idx++;
        }
        setPaging(newPaging);
    }, [ maxPage, pageCnt.value ]);
    const movePage = (e) => {
        e.preventDefault();
        const newPageCnt = {
            value: Number(e.target.id)
        }
        pageCntDispatch({type: 'MOVE_PAGE', payload: newPageCnt});
    }
    return  <PageContainer>
                {paging}
            </PageContainer>
}
export default Paging;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const PageContainer = Styled.div`
    float: left;
    position: relative;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%);
`
const Page = Styled.div`
float: left;
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////