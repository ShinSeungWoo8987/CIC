import React, {useContext} from 'react';
import Styled from 'styled-components'; // Styled-components 라이브러리를 사용하기 위해 선언
import All from '../Image/All.png';
import SelectAll from '../Image/SelectAll.png';
import Tech from '../Image/Tech.png';
import SelectTech from '../Image/SelectTech.png';
import Travel from '../Image/Travel.png';
import SelectTravel from '../Image/SelectTravel.png';
import Fashion from '../Image/Fashion.png';
import SelectFashion from '../Image/SelectFashion.png';
import Event from '../Image/Event.png';
import SelectEvent from '../Image/SelectEvent.png';
import Notice from '../Image/Notice.png';
import SelectNotice from '../Image/SelectNotice.png';
import Center from '../Image/Center.png';
import SelectCenter from '../Image/SelectCenter.png';
import Store from '../Store/Store.js';

function MenuBar() {
  const {globalState, globalStateDispatch} = useContext(Store);
  const {session, sessioneDispatch} = useContext(Store);
  // Menu List Setting
  const menuList = [
    {id: 'all', img: All, select: SelectAll, title: '전체'},
    {id: 'tech', img: Tech, select: SelectTech, title: '테크·가전'},
    {id: 'travel', img: Travel, select: SelectTravel, title: '여행·레저'},
    {id: 'fashion', img: Fashion, select: SelectFashion, title: '패션·잡화'},
    {id: 'event', img: Event, select: SelectEvent, title: '이벤트'},
    {id: 'notice', img: Notice, select: SelectNotice, title: '공지사항'},
    {id: 'center', img: Center, select: SelectCenter, title: '고객센터'}
  ]
  const menu = [];
  var i = 0;
  while(i <menuList.length){
    if(globalState.main === menuList[i].id){
      menu.push(
        <A id={menuList[i].id} onClick={(e)=>changeState(e)}>
          <SelectMenuContainer>
            <ImageContainer>
              <Image src={menuList[i].select}/>
            </ImageContainer>
            <TextContainer>
              <Text>{menuList[i].title}</Text>
            </TextContainer><br/>
          </SelectMenuContainer>
        </A>
      )
    }else{
      menu.push(
        <A id={menuList[i].id} onClick={(e)=>changeState(e)}>
          <MenuContainer >
            <ImageContainer>
              <Image src={menuList[i].img}/>
            </ImageContainer>
            <TextContainer>
              <Text>{menuList[i].title}</Text>
            </TextContainer><br/>
          </MenuContainer>
        </A>
      )
    }
    if(i === 3 || i === menuList.length-1){
      menu.push(
        <BottomLine/>
      )
    }
    i += 1;
  }
  // My Information Setting
  // Selected Menu Setting
  const changeState = (e) => {
    e.preventDefault();
    let newGlobalState = globalState;
    newGlobalState = {
      main: e.currentTarget.id
    }
    globalStateDispatch( { type: 'GLOBAL', payload: newGlobalState });
  }
    return (
      <Container>
        {menu}
      </Container>
    );
  }
export default MenuBar;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Left = Styled.div`
  float: left;
`
const Container = Styled.div`
  float: left;
  width: 12.5%;
  height: 908px;
  margin: 10px 0 0 0;
  background-color: #FAFAFA;
`
const MenuContainer = Styled(Left)`
  width: 220px;
  padding: 0 0 0 17.5px;
`
const SelectMenuContainer = Styled(MenuContainer)`
  background-color: #A3A3A3;
`
const BottomLine = Styled(Left)`
  width: 100%;
  border-bottom: 1px solid #E1E1E1;
`
const ImageContainer = Styled(Left)`
  width: 50px;
  line-height: 50px;
  margin: -2px 50px 0 0;
`
const Image = Styled.img`
  width: 30px;
  vertical-align: middle;
  
`
const TextContainer = Styled(Left)`
  height: 50px;
  line-height :50px;
`
const Text = Styled.div`
font-size: 20px;
`
const A = Styled.a`
  cursor: pointer;
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////