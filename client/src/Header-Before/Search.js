import React from 'react';
import Styled from 'styled-components'; // Styled-components 라이브러리를 사용하기 위해 선언
import SearchImg from '../Image/Search.png';

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
  width: 330px;
  height: 25px;
  border-top: 1px solid #A6A6A6;
  border-right: none;
  border-bottom: 1px solid #A6A6A6;
  border-left: 1px solid #A6A6A6;
  border-radius: 5px 0 0 5px;
`
const ImageContainer = Styled(Left)`
  float: left;
  width: 50px;
  height: 27px;
  font-weight: bold;
  border-top: 1px solid #A6A6A6;
  border-right: 1px solid #A6A6A6;
  border-bottom: 1px solid #A6A6A6;
  border-left: none;
  
  
  border-radius: 0 5px 5px 0;
  color: white;
  cursor: pointer;
`
const Image = Styled.img`
  width: 20px;
  margin: 2.5px 0 0 15px;
  text-shadow: 0 3px 7px #D6D6D6;
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////