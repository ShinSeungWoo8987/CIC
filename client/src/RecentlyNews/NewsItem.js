import React, { useContext } from 'react';
import styled from 'styled-components';
import Store from '../Store/Store';

function NewsItem({number, title, writer, date, description}) {
  const { recentlyNewsInformationDispatch, globalState, globalStateDispatch } = useContext(Store);
  const moveProjectNewsDetail = (e) =>{
    e.preventDefault();
    const newRecentlyNewsInformation = {
      number: number,
      title: title,
      writer: writer,
      date: date,
      description: description
    }
    console.log(newRecentlyNewsInformation);
    recentlyNewsInformationDispatch({type: 'NEWS', payload: newRecentlyNewsInformation})
    const newGlobalState = {
      main: globalState.main,
      sub: globalState.sub,
      action: 'read'
    }
    globalStateDispatch( { type: 'GLOBAL', payload: newGlobalState });
  }
    return (
        <Container onClick={(e)=>moveProjectNewsDetail(e)}>
            <Upside>{title}</Upside>
            <Downside><Left>{writer}</Left> <Right>{date}</Right> </Downside>
        </Container>
    );
}

export default NewsItem;
const Container = styled.div`
  text-align: left;
  height: 90px;
  border-bottom: 1px solid #E1E1E1;
  cursor: pointer;
`

const Upside = styled.div`
    padding-left: 10px;
    padding-top: 10px;
    font-weight: bold;
    font-size: 28px;
    height: 40px;
`
const Downside = styled.div`
    padding-left: 10px;
    font-size: 15px;
    height: 40px;
`
const Left = styled.div`
  float: left;
`
const Right = styled.div`
  margin-left: 30px;
  float: left;
`