import React from 'react';
import Styled from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언

function Test(){
    return(
        <Container>
            <Input type='submit' value='수정'/>
            <br/><br/>
            <DelBtn bg='#b2bec3' type='submit' value='삭제'/>
            <p/>
            <DelBtn bg='#87d37c' type='submit' value='펀딩하기'/>
            <p/>
        </Container>
    )
}
export default Test;

const Container = Styled.div`
    width: 100%;
    height: 3000px;
    margin: 100px 0 0 0;
`
const Input = Styled.input`
    width: 300px;
    height: 50px;

    font-size: 20px;

    text-shadow: 1px 1px 3px black;
    box-shadow: 2px 2px 5px grey;

    border: none;
    border-radius: 5px;

    color: white;
    background-color: #fdcb6e;
`

const DelBtn = Styled.input`
    width: 300px;
    height: 50px;

    font-size: 20px;

    text-shadow: 1px 1px 3px black;
    box-shadow: 2px 2px 5px grey;

    border: none;
    border-radius: 5px;

    color: white;
    background-color: ${({bg})=> `${bg}`};
`