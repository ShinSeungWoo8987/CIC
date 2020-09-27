import React from 'react';
import styled from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Item from './Item.js';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Left = styled.div`
    float: left;
`
const Main = styled(Left)`
    width: 100%;
    color: white;
`
const Container = styled.div`
    position: relative;
    left: 5%;
    width: 90%;
    margin-top: 60px;
    border-top: 2px solid #707070;
`
const SectionFirst = styled(Left)`
    width: 20%;
    height: 800px;
`
const SectionSecond = styled(SectionFirst)`
    width: 30%;
    line-height: 800px;
    font-size: 50px;
    text-align: center;
    background-color: #5C5454;
`
const SectionThird = styled(SectionFirst)`
    width: 50%;
`
const Search = styled(Left)`
    width: 100%;
    height: 75px;
`
const Title = styled(Left)`
    width: 100%;
    font-size: 60px;
    text-align: center;
    padding: 10px 0px 50px 30px;
`
const Category = styled(Left)`
    width: 22.5%;
    height: 400px;
    line-height: 75px;
    font-size: 50px;
    text-align: center;
`
const Menu = styled(Left)`
    width: 75%;
    font-size: 30px;
    padding: 50px 0px 150px 7.5px;
    border-left: 2px solid #707070;
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Main_SC() {
    return(
        <Main>
            <Container>
                <SectionFirst>
                    <Search>
                        검색창
                    </Search>
                    <Title>
                        테크·가전
                    </Title>
                    <div>
                        <Category>
                            <li>카</li>
                            <li>테</li>
                            <li>고</li>
                            <li>리</li>
                        </Category>
                        <Menu>
                            <li>전체</li>
                            <li>신규</li>
                            <li>마감임박</li>
                            <li>마감</li>
                        </Menu>
                    </div>
                </SectionFirst>
                <SectionSecond>
                    이미지
                </SectionSecond>
                <SectionThird>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                </SectionThird>
            </Container>
        </Main>
    );
}

export default Main_SC;