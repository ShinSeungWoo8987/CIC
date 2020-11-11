import React, { useContext, useRef, useState } from 'react';
import Styled from 'styled-components'; // Styled-components 라이브러리를 사용하기 위해 선언
import Store from '../Store/Store';
import { replaceInputValueRestirctedCharacter } from '../Util/Util';

function Search() {
  const { searchDispatch, globalStateDispatch } = useContext(Store);
  const [displayInput, setDisplayInput] = useState(false);
  // globalState 값 변경 시 검색값 초기화 유무 결정 필요
  const searchRef = useRef();
  const SearchImg = `https://crowdincreative.s3.ap-northeast-2.amazonaws.com/static/Search.png`;

  // Search Submit
  const onSubmit = (e) => {
    e.preventDefault();
    if(searchRef.current === undefined || searchRef.current === null || searchRef.current.value === ''){
      setDisplayInput(!displayInput);
    }else{
      const searchValue = replaceInputValueRestirctedCharacter(searchRef.current.value);
      const newSearch = {
        value: searchValue
      }
      searchDispatch({type:'SEARCH', payload:newSearch});
      globalStateDispatch({type: 'DEFAULT'})
    }
  }
  return (
    <Container>
      <SubContainer>
          {displayInput? <Input id='inputSearch' type='search' placeholder='단어를 입력해주세요.' ref={searchRef}/>:<NullBox>&nbsp;</NullBox>}
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
  position: fixed;
  margin-left: 1060px;
  width: 235px;
  height: 46px;
`
const SubContainer = Styled.div`
  width: 390px;
  margin: 3px 0 0 5px;
`
const NullBox = Styled(Left)`
width: 204px;
`
const Input = Styled.input`
  float: left;
  width: 200px;
  height: 25px;
  text-indent: 10px;
  border: none;
  border-radius: 5px;
  margin: 7px 0 0 0;
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
  margin: 9px 0 0 5px;
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////