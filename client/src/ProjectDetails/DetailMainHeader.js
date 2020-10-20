import React, {useContext} from 'react';
import Styled from 'styled-components';
import Store from '../Store/Store';

function DetailMainHeader(props) {
    const {detailMainHeader, detailMainHeaderDispatch} = useContext(Store);
    const handleClick = (i)=>{
        detailMainHeaderDispatch({type:'CHANGE', payload:i});
    }
    let header = [];

    if(detailMainHeader === 1) header = [
            <SelectText key={1}>소개</SelectText>,
            <Text key={2} onClick={()=>handleClick(2)}>최근 소식</Text>,
            <Text key={3} onClick={()=>handleClick(3)}>참여자 응원</Text>
        ]
    else if(detailMainHeader === 2) header = [
            <Text key={1} onClick={()=>handleClick(1)}>소개</Text>,
            <SelectText key={2}>최근 소식</SelectText>,
            <Text key={3} onClick={()=>handleClick(3)}>참여자 응원</Text>
        ]
    else if(detailMainHeader === 3) header = [
            <Text key={1} onClick={()=>handleClick(1)}>소개</Text>,
            <Text key={2} onClick={()=>handleClick(2)}>최근 소식</Text>,
            <SelectText key={3}>참여자 응원</SelectText>
        ]
        
    return (
        <Container>
            {header}
        </Container>
    );
}

export default DetailMainHeader;

const Container = Styled.div`
    float: center;
    height: 50px;
`
const Text = Styled.span`
    display:inline-block;
    margin: 12.5px 50px;
    font-size: 17.5px;
    cursor:pointer;
    &:hover {
        font-weight: bold;
    }
`
const SelectText = Styled(Text)`  
  font-weight: bold;
  text-shadow: 1px 1px 2px gray;
`