import React from 'react';
import styled from 'styled-components';

function SupportItem({title,name,date}) {
    return (
        <Container>
            <Upside><Left>{name}</Left> <Right>{date}</Right></Upside>
            <Downside>{title}</Downside>
            
            
        </Container>
    );
}

export default SupportItem;
const Container = styled.div`
  text-align: left;
  height: 90px;
  border-bottom: 1px solid #E1E1E1;
`

const Upside = styled.div`
    padding-top: 20px;
    padding-left: 10px;
    font-size: 15px;
    height: 20px;
`
const Downside = styled.div`
    padding-left: 10px;
    padding-bottom: 10px;
    font-size: 28px;
    height: 40px;
`
const Left = styled.div`
  float: left;
`
const Right = styled.div`
  margin-left: 30px;
  float: left;
`