import React from 'react';
import Styled from 'styled-components'; // Styled-components 라이브러리를 사용하기 위해 선언
import SearchImg from '../Image/Search.png';

/*
  검색창 테두리 유무
*/

function Search() {
    return (
      <Container>
        <SubContainer>
          <Input type='text' />
          <ImageContainer>
            <Image src={SearchImg}></Image>
          </ImageContainer>
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
  width: 12.5%;
  height: 50px;
`
const SubContainer = Styled.div`
  width: 390px;
  margin: 3px 0 0 5px;
`
const Input = Styled.input`
  float: left;
  width: 200px;
  height: 25px;
  text-indent: 10px;
  border: none;
  border-radius: 5px;
`
const ImageContainer = Styled(Left)`
  float: left;
  width: 30px;
  height: 27px;
  font-weight: bold;
  border: none;
  color: white;
  cursor: pointer;
`
const Image = Styled.img`
  width: 20px;
  margin: 2.5px 0 0 5px;
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////