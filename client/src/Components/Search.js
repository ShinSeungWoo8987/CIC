import React, { useContext } from 'react';
import Styled from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Store from '../Store/Store';
import { checkSearchValueRestirctedCharacter } from '../Util/Util';

function Search({use, bottom}) {
    const { searchDispatch, pageNumberDispatch } = useContext(Store);
    const onSearchSubmit = (e) => {
        e.preventDefault();
        let newSearch = '';
        if (use==='true') {
            newSearch = {
                type: e.target.title.value,
                value: checkSearchValueRestirctedCharacter(e.target.search.value)
            }
        }else{
            newSearch = {
                value: checkSearchValueRestirctedCharacter(e.target.search.value)
            }
        }
        searchDispatch({type: 'SEARCH', payload: newSearch});
        pageNumberDispatch({type: 'DEFUALT'});
    }
    return  <Container width={use==='true'?'539px':'450px'} bottom={bottom} onSubmit={(e)=>onSearchSubmit(e)}>
                {use==='true'?
                    <Select id='title'>
                        <option value='title'>제목</option>
                        <option value='name'>이름</option>
                        <option value='address'>배송지</option>
                    </Select>
                    :
                    ''}
                <InputSearch id='search' type='search'/>
                <BtnSearch type='submit' value='검색'/>
            </Container>
}
export default Search;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Container = Styled.form`
    position: relative;
    left: 50%;
    bottom: ${({bottom})=>`${bottom}`};
    transform: translate(-50%);
    width: ${({width})=>`${width}`};
    height: 30px;
`
const Select = Styled.select`
    float: left;
    width: 80px;
    height: 30px;
    margin: 0 5px 0 0;
    border: 1px solid #C8C8C8;
    border-radius: 5px;
    text-indent: 10px;
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