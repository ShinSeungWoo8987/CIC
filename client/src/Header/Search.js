import React, { useContext, useEffect, useRef, useState } from 'react';
import Styled from 'styled-components'; // Styled-components 라이브러리를 사용하기 위해 선언
import Store from '../Store/Store';
import { replaceInputValueRestirctedCharacter } from '../Util/Util';

function Search() {
  const { globalState, searchDispatch, globalStateDispatch } = useContext(Store);
  useEffect(()=>{
    document.getElementById('inputSearch').value = null;
  },[globalState]);
  const searchRef = useRef();
  const SearchImg = `https://crowdincreative.s3.ap-northeast-2.amazonaws.com/static/Search.png`;

  // Search Submit
  const onSubmit = (e) => {
    e.preventDefault();
    const searchValue = replaceInputValueRestirctedCharacter(searchRef.current.value);
    const newSearch = {
      value: searchValue
    }
    searchDispatch({type:'SEARCH', payload:newSearch});
    globalStateDispatch({type: 'DEFAULT'})
  }

  return (
    <Container>
          <ImageContainer>
            <Image id='btnSearch' src={SearchImg} onClick={(e) => onSubmit(e)}></Image>
          </ImageContainer>
          <Input id='inputSearch' type='search' placeholder='단어를 입력해주세요.' ref={searchRef}/>
    </Container>
  );
  }
  export default Search;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Container = Styled.div`
  position: fixed;
  width: 600px;
  margin: 0 0 0 690px;
`
const Input = Styled.input`
  position: relative;
  left: 0;
  float: right;
  width: 295px;
  height: 30px;
  margin: 7px 0 0 0;
  text-indent: 10px;
  border: none;
  border-radius: 5px;
  outline: none;
  background-color: white;

  transition: all .5s ease-in-out;

  &:focus {
    width: 400px;
    right: 100%;
  }
`
const ImageContainer = Styled.div`
  float: right;
  border: none;
  cursor: pointer;
`
const Image = Styled.img`
  width: 22.5px;
  margin: 11px 0 0 5px;
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////