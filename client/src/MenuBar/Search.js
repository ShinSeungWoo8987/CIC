import React from 'react';
import Styled from 'styled-components'; // Styled-components 라이브러리를 사용하기 위해 선언
import SearchImg from '../Image/Search.png';

/*
  - 검색창 테두리 유무
  - DB 연결
*/

function Search() {
  // Search
  const onSubmit = (e) => {
    e.preventDefault();
    if(document.getElementById('inputSearch').value === ''){
      return false;
    }
    const searchValue = document.getElementById('inputSearch').value;
    const keyPressValue = e.key; // 검색창 기준, Enter Key
    const clickIdValue = e.target.id; // 버튼 기준, Click
    if(keyPressValue === 'Enter' || clickIdValue === 'btnSearch'){
      console.log(searchValue);
    }
  }
  return (
    <Container>
      <SubContainer>
        <Input id='inputSearch' type='text' onKeyPress={(e) => onSubmit(e)} placeholder='단어를 입력해주세요.'/>
        <ImageContainer>
          <Image id='btnSearch' src={SearchImg}  onClick={(e) => onSubmit(e)}></Image>
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