import React, {useContext} from 'react';
import Styled from 'styled-components';
import Store from '../Store/Store';

function DetailMainHeader(props) {
    const { globalState, globalStateDispatch } = useContext(Store);
    const handleClick = (e)=>{
        const newGlobalState = {
            main: globalState.main,
            sub: e.target.id,
            action: 1,
            num: 0
        }
        globalStateDispatch({type:'GLOBAL', payload: newGlobalState});
    }
    let header = [];

    if(globalState.sub === 'introduction') header = [
            <SelectText key={1} >소개</SelectText>,
            <Text key={2} id='recentlyNews' onClick={(e)=>handleClick(e)}>최근 소식</Text>,
            <Text key={3} id='supportMessage' onClick={(e)=>handleClick(e)}>참여자 응원</Text>
        ]
    else if(globalState.sub === 'recentlyNews') header = [
            <Text key={1} id='introduction' onClick={(e)=>handleClick(e)}>소개</Text>,
            <SelectText key={2}>최근 소식</SelectText>,
            <Text key={3} id='supportMessage' onClick={(e)=>handleClick(e)}>참여자 응원</Text>
        ]
    else if(globalState.sub === 'supportMessage') header = [
            <Text key={1} id='introduction' onClick={(e)=>handleClick(e)}>소개</Text>,
            <Text key={2} id='recentlyNews' onClick={(e)=>handleClick(e)}>최근 소식</Text>,
            <SelectText id='supportMessage'key={3}>참여자 응원</SelectText>
        ]
        
    return (
        <Container>
            {header}
        </Container>
    );
}

export default DetailMainHeader;

const Container = Styled.div`  
    position: fixed;
    width: 1248px;
    padding: 10px 0;
    background-color: #F9F9F9;
    opacity: 0.8;
`
const Text = Styled.span`
    display:inline-block;
    margin: 0 50px;
    font-size: 17.5px;
    cursor:pointer;
    height: 40px;
    line-height: 40px;
    
    &:hover {
        font-weight: bold;
    }
`
const SelectText = Styled(Text)`  
    font-weight: bold;
    text-shadow: 1px 1px 2px gray;
`