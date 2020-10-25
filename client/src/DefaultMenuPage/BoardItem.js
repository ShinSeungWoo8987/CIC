import React, { useContext } from 'react';
import styled from 'styled-components';
import Store from '../Store/Store';

function BoardItem({title,name,date}) {
  const { globalState, globalStateDispatch } = useContext(Store);
    return (
        <Container>
            {globalState.main!=='event'?'':
            <LeftSide>
              <Img></Img>
            </LeftSide>
            }
            <RightSide>
              <Upside>{title}</Upside>
              <Downside><Left>{name}</Left> <Right>{date}</Right> </Downside>
            </RightSide>
        </Container>
    );
}

export default BoardItem;
const Container = styled.div`
  text-align: left;
  height: 90px;
  border-bottom: 1px solid #E1E1E1;
`

const Upside = styled.div`
    padding-left: 20px;
    padding-top: 10px;
    font-weight: bold;
    font-size: 28px;
    height: 40px;
`
const Downside = styled.div`
    padding-left: 20px;
    font-size: 15px;
    height: 40px;
`
const LeftSide = styled.div`
  margin-left: 20px;
  padding-top: 3px;
  float: left;
`
const Img = styled.div`
  border: 1px solid grey;
  width: 106.6px;
  height: 80px;
`
const RightSide = styled.div`
  float: left;
`
const Left = styled.div`
  float: left;
`
const Right = styled.div`
  margin-left: 30px;
  float: left;
`