import React, { useContext, useEffect, useState } from 'react';
import Styled from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Store from '../Store/Store';
import { getMaxBlock, getPageCnt } from '../Util/Util';

function Paging({maxPage, bottom}){
    const { pageNumber, pageNumberDispatch } = useContext(Store);
    const [ paging, setPaging ] = useState('');
    const [ blockNumber, setBlockNumber ] = useState(1);
    const blockPerCnt = 10;
    const maxBlock = getMaxBlock(maxPage, blockPerCnt);
    const pageCnt = getPageCnt(maxPage, maxBlock, blockPerCnt, blockNumber);
    const startNumber = ((blockNumber-1)*blockPerCnt);

    var idx = 1
    // Page Setting
    useEffect(() => {
        const newPaging = [];
        if(maxBlock > 1 && blockNumber > 1){
            newPaging.push(
                <MoveBlock key={idx+11} margin='0 7.5px 0 0' onClick={()=>moveBlock('down')}>[이전]</MoveBlock>
            );
        }
        for(idx=1; idx<=pageCnt; idx++){
            if(startNumber+idx===pageNumber.value){
                newPaging.push(
                    <SelectPage key={idx} margin='2.5px'>[{startNumber+idx}]</SelectPage>
                );
            }else{
                newPaging.push(
                    <Page key={idx} margin='2.5px' id={startNumber+idx} onClick={(e) => movePage(e)}>[{startNumber+idx}]</Page>
                );    
            }
        }
        if(maxBlock > 1 && blockNumber < maxBlock){
            newPaging.push(
                <MoveBlock key={idx+10} margin='0 0 0 7.5px' onClick={()=>moveBlock('up')}>[다음]</MoveBlock>
            );
        }
        setPaging(newPaging);
    }, [ maxPage, pageNumber.value, blockNumber ]);

    const movePage = (e) => {
        e.preventDefault();
        const newPageNumber = {
            value: Number(e.target.id)
        }
        pageNumberDispatch({type: 'MOVE_PAGE', payload: newPageNumber});
    }

    const moveBlock = (action) => {
        console.log('action : ',action);
        let newBlockNumber = blockNumber;
        if(action==='up')
            newBlockNumber = newBlockNumber + 1;
        else
            newBlockNumber = newBlockNumber - 1;
        const newPageNumber = {
            value: (newBlockNumber-1)*blockPerCnt+1
        }
        setBlockNumber(newBlockNumber);
        pageNumberDispatch({type: 'MOVE_PAGE', payload: newPageNumber});
    }
    return  <PageContainer bottom={bottom}>
                {paging}
            </PageContainer>
}
export default Paging;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const PageContainer = Styled.div`
    float: left;
    position: relative;
    bottom: ${({bottom})=>`${bottom}`};
    left: 50%;
    transform: translate(-50%);
`
const Page = Styled.div`
    float: left;
    color: #A3A3A3;
    font-weight: normal;
    cursor: pointer;
    margin: ${({margin})=>`0 ${margin}`};
    
    &:hover {
        color: black;
        font-weight: bold;
    }
`
const SelectPage = Styled(Page)`
    font-weight: bold;
    color: black;
    // text-shadow: 1px 1px 2px gray;
    cursor: default;   
`
const MoveBlock = Styled.div`
    float: left;
    cursor: pointer;
    color: #A3A3A3;
    margin: ${({margin})=>`${margin}`};
    
    &:hover{
        color: black;
        font-weight: bold;
    }
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////