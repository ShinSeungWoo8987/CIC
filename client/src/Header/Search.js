import React from 'react';
import Styled from 'styled-components'; // Styled-components 라이브러리를 사용하기 위해 선언

function Search() {
    return (
      <Container>
        <SubContainer>
          <Input type='text' />
          <Btn type='button' value='검색'/>
        </SubContainer>
      </Container>
    );
  }
  export default Search;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Left = Styled.div`
  float: left;
`
const Container = Styled(Left)`
  width: 75%;
  height: 50px;
`
const SubContainer = Styled.div`
  width: 390px;
  margin: 0 auto;
  padding: 15px 0 0 0;
`
const Input = Styled.input`
  float: left;
  width: 335px;
  height: 25px;
  border-top: 1px solid #A6A6A6;
  border-right: none;
  border-bottom: 1px solid #A6A6A6;
  border-left: 1px solid #A6A6A6;
  border-radius: 5px 0 0 5px;
`
const Btn = Styled.input`
  float: left;
  width: 50px;
  height: 29px;
  font-weight: bold;
  text-shadow: 0 3px 7px #D6D6D6;
  border: none;
  border-radius: 0 5px 5px 0;
  background-color: #A6A6A6;
  color: white;
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////