import React from 'react';
import styled from 'styled-components';

function NewsItem({title,name,date}) {
    return (
        <Container>
            <Upside>{title}</Upside>
            <Downside><Left>{name}</Left> <Right>{date}</Right> </Downside>
        </Container>
    );
}

export default NewsItem;
const Container = styled.div`
  text-align: left;
  height: 90px;
  border-bottom: 1px solid #E1E1E1;
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