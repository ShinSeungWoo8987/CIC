import React, { useContext } from 'react';
import Styled from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Store from '../Store/Store';

function Search() {
    const { searchDispatch } = useContext(Store);
    const onSearchSubmit = (e) => {
        e.preventDefault();
        const newSearch = {
            value: e.target.search.value
        }
        searchDispatch({type: 'SEARCH', payload: newSearch});
    }
    return  <Container onSubmit={(e)=>onSearchSubmit(e)}>
                <InputSearch id='search' type='search'/>
                <BtnSearch type='submit' value='검색'/>
            </Container>
}
export default Search;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Container = Styled.form`
    position: relative;
    left: 50%;
    transform: translate(-50%);
    width: 450px;
    height: 30px;
`
const InputSearch = Styled.input`
    float: left;
    width: 400px;
    height: 30px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-top: 1px solid #C8C8C8;
    border-right: none;
    border-bottom: 1px solid #C8C8C8;
    border-left: 1px solid #C8C8C8;
    
`
const BtnSearch = Styled.input`
    float: left;
    width: 50px;
    height: 30px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border: none;
    background-color: #C8C8C8;
    font-size: 15px;
    font-weight: bold;
    color: white;
    text-shadow: 1px 1px 3px gray;
    cursor: pointer;
`

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////