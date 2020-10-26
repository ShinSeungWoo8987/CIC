import React, { useContext } from 'react';
import styled from 'styled-components';
import Store from '../Store/Store';

function BoardItem({ id, image, title, name, date }) {
  const { globalState, globalStateDispatch } = useContext(Store);
  const payload = {
    main: globalState.main,
    sub: 'selected', // all일때 list, selected일때 하나 선택된거.
    action: globalState.action, // sub가 all일때, 페이지로 사용됨.
    num: id //sub가 selected일때 선택된 아이디
  }
  let _date = date;
  if(date) _date=date.substr(0,10);
  return (
    <Container onClick={() => globalStateDispatch( {type: 'GLOBAL', payload} )}>
      <LeftSide>
        <Upside>{title}</Upside>
        <Downside><Left>{name}</Left> <Right>{_date}</Right> </Downside>
      </LeftSide>
      {globalState.main !== 'event' ? '' :
        <RightSide>
          <Img src={image}/>
        </RightSide>
      }
    </Container>
  );
}

export default BoardItem;
const Container = styled.div`
  cursor: pointer;
  text-align: left;
  height: 90px;
  border-bottom: 1px solid #E1E1E1;
`

const Upside = styled.div`
    padding-left: 20px;
    padding-top: 10px;
    font-size: 28px;
    height: 40px;
`
const Downside = styled.div`
    padding-left: 20px;
    font-size: 15px;
    height: 40px;
`
const LeftSide = styled.div`
  float: left;
  width: 85%
`
const RightSide = styled.div`
  float: left;
  padding: 3px 20px 0 0;
  width: 12.7%
`
const Img = styled.img`
  border: 1px solid lightgrey;
  width: 106.6px;
  height: 80px;
`
const Left = styled.div`
  float: left;
`
const Right = styled.div`
  margin-left: 30px;
  float: left;
`