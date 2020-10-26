import React, { useContext } from 'react';
import Styled from 'styled-components'; // Styled-components 라이브러리를 사용하기 위해 선언
import Store from '../Store/Store';

function Search() {
  const { searchProjectDispatch, globalState, globalStateDispatch } = useContext(Store);
  const SearchImg = `https://crowdincreative.s3.ap-northeast-2.amazonaws.com/static/Search.png`;
  // Search Submit
  const onSubmit = (e) => {
    e.preventDefault();
    const searchValue = document.getElementById('inputSearch').value;
    if(searchValue === ''){
      return false;
    }
    const keyPressValue = e.key; // 검색창 기준, Enter Key
    const clickIdValue = e.target.id; // 버튼 기준, Click
    if(keyPressValue === 'Enter' || clickIdValue === 'btnSearch'){
      const newSearchProject = {
        value: searchValue
      }
      searchProjectDispatch({type:'SEARCH', payload:newSearchProject});
      const newGlobalState = {
        main: globalState.main,
        sub: 'all',
        action: 1,
        num: 0
      }
      globalStateDispatch({type: 'GLOBAL', payload: newGlobalState})
    }
  }
  return (
    <Container>
      <SubContainer>
        <Input id='inputSearch' type='text' placeholder='단어를 입력해주세요.' onKeyPress={(e) => onSubmit(e)}/>
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
  ime-mode: active;
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