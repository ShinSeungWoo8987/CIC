import React, { useContext, useEffect, useState } from 'react';
import Styled from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Store from '../Store/Store';
import { getMaxBlock } from '../Util/Util';

function Paging({maxPage, bottom}){
    const { pageCnt, pageCntDispatch } = useContext(Store);
    const [ paging, setPaging ] = useState('');
    const [ blockCnt, setBlockCnt ] = useState(1);
    const blockPerCnt = 10;
    const maxBlock = getMaxBlock(maxPage, blockPerCnt);
    var idx = 1;
    // Page Setting
    useEffect(() => {
        const newPaging = [];
        if(maxBlock===1){
            for(idx=1; idx<=maxPage; idx++){
                if(idx===pageCnt.value){
                    newPaging.push(
                        <SelectPage key={idx}>[{idx}]</SelectPage>
                    );
                }else{
                    newPaging.push(
                        <Page key={idx} id={idx} onClick={(e) => movePage(e)}>[{idx}]</Page>
                    );    
                }
            }
        }else if(maxBlock>=2){
            if(blockCnt===1){
                for(idx=1; idx<=blockPerCnt; idx++){
                    if(idx===pageCnt.value){
                        newPaging.push(
                            <SelectPage key={idx}>[{idx}]</SelectPage>
                        );
                    }else{
                        newPaging.push(
                            <Page key={idx} id={idx} onClick={(e) => movePage(e)}>[{idx}]</Page>
                        );    
                    }
                }
                newPaging.push(
                    <MoveBlock onClick={()=>moveBlock('up')}>[다음]</MoveBlock>
                );
            }else if(blockCnt===maxBlock){
                newPaging.push(
                    <MoveBlock onClick={()=>moveBlock('down')}>[이전]</MoveBlock>
                );
                for(idx=1; idx<=maxPage%blockPerCnt; idx++){
                    if(idx===pageCnt.value){
                        newPaging.push(
                            <SelectPage key={idx}>[{(blockCnt-1)*blockPerCnt+idx}]</SelectPage>
                        );
                    }else{
                        newPaging.push(
                            <Page key={idx} id={idx} onClick={(e) => movePage(e)}>[{(blockCnt-1)*blockPerCnt+idx}]</Page>
                        );    
                    }
                }
            }else{
                newPaging.push(
                    <MoveBlock onClick={()=>moveBlock('down')}>[이전]</MoveBlock>
                );
                for(idx=1; idx<=maxPage%blockPerCnt; idx++){
                    if(idx===pageCnt.value){
                        newPaging.push(
                            <SelectPage key={idx}>[{(blockCnt-1)*blockPerCnt+idx}]</SelectPage>
                        );
                    }else{
                        newPaging.push(
                            <Page key={idx} id={idx} onClick={(e) => movePage(e)}>[{(blockCnt-1)*blockPerCnt+idx}]</Page>
                        );    
                    }
                }
                newPaging.push(
                    <MoveBlock onClick={()=>moveBlock('up')}>[다음]</MoveBlock>
                );
            }
        }
        setPaging(newPaging);
    }, [ maxPage, pageCnt.value, blockCnt ]);

    const movePage = (e) => {
        e.preventDefault();
        const newPageCnt = {
            value: Number(e.target.id)
        }
        pageCntDispatch({type: 'MOVE_PAGE', payload: newPageCnt});
    }

    const moveBlock = (action) => {
        console.log('action : ',action);
        let newBlockCnt = blockCnt;
        if(action==='up')
            setBlockCnt(newBlockCnt+1);
        else
            setBlockCnt(newBlockCnt-1);
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
    width: 22.5px;
    color: #A3A3A3;
    font-weight: normal;
    cursor: pointer;
    margin: 0 2.5px; 
    
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
const MoveBlock = Styled.div`
    float: left;
    width: 45px;
    margin: 0 2.5px;
    padding: 0 5px;
    cursor: pointer;
    color: #A3A3A3;
    
    &:hover{
        color: black;
        font-weight: bold;
    }
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////