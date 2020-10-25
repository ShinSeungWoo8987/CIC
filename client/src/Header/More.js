import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Store from '../Store/Store';

function More(props) {
    const [showMore, setShowMore] = useState(false);
    const {globalStateDispatch, searchProjectDispatch, mainPageCntDispatch} = useContext(Store);
    const handleClick = e=>{
        e.preventDefault();
        setShowMore(!showMore);
    }
    const menuList = [
        {id: 'event', title: '이벤트'},
        {id: 'notice', title: '공지사항'},
        {id: 'center', title: '고객센터'}
    ]
    const changeDefaultMenuState = (e) => {
        e.preventDefault();
        setShowMore(!showMore);
        const newGlobalState = {
            main: e.currentTarget.id,
            sub: 'all'
        }
        globalStateDispatch( { type: 'GLOBAL', payload: newGlobalState });
        // 왼쪽의 메인 메뉴 클릭 시 검색값 초기화 - 이 부분은 추후 결정할 것
        const newSearchProject = {
          value: ''
        }
        searchProjectDispatch({type:'SEARCH', payload:newSearchProject});
        const newMainPageCnt = {
          value: 1
        }
        mainPageCntDispatch({ type: 'MOVE_PAGE', payload: newMainPageCnt});
    }
    return (
        <Container>
            {!showMore?
            <A onClick={e=>handleClick(e)}>더보기</A>
            :
            <>
                <A onClick={e=>handleClick(e)}>더보기</A>
                <Ul>
                    {menuList.map( (i)=><Li key={i.id} id={i.id} onClick={(e)=>changeDefaultMenuState(e)}><A>{i.title}</A></Li> )}
                </Ul>
            </>
            }
        </Container>
    );
}

export default More;

const Container = styled.div`
  float: left;
  margin-left: 2%;
  height: 46px;
  font-size: 16px;
  line-height: 46px;
  color: #3A3A3A;
`
const A = styled.a`
    cursor: pointer;
    color: #3A3A3A;
`
const Ul = styled.ul`
background-color: #F9F9F9;
margin: 0px;
padding: 0px;
list-style-type : none;
z-index: 2;
position: fixed;
text-align: center;
margin-left: -6px;
`
const Li = styled.li`
`