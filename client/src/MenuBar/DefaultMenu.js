import React, {useContext} from 'react';
import Styled from 'styled-components'; // Styled-components 라이브러리를 사용하기 위해 선언
import Store from '../Store/Store';
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

function DefaultMenu() {
    var idx;
    const {globalState, globalStateDispatch} = useContext(Store);
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
    // Menu List Setting
    idx=0;
    while(idx<menuList.length){
        if(globalState.main === menuList[idx].id){
            menu.push(
                <A key={idx+7} id={menuList[idx].id} onClick={(e)=>changeDefaultMenuState(e)}>
                  <SelectMenuContainer>
                    <ImageContainer>
                      <Image src={menuList[idx].select}/>
                    </ImageContainer>
                    <TextContainer>
                      <Text>{menuList[idx].title}</Text>
                    </TextContainer><br/>
                  </SelectMenuContainer>
                </A>
            )
        }else{
            menu.push(
                <A key={idx+7} id={menuList[idx].id} onClick={(e)=>changeDefaultMenuState(e)}>
                  <MenuContainer >
                      <ImageContainer>
                        <Image src={menuList[idx].img}/>
                      </ImageContainer>
                      <TextContainer>
                        <Text>{menuList[idx].title}</Text>
                      </TextContainer><br/>
                  </MenuContainer>
                </A>
            )
        }
        if(idx === 3 || idx === menuList.length-1){
            menu.push(
                <BottomLine key={idx}/>
            )
        }
        idx += 1;
    }
    // Selected DefaultMenu Setting
    const changeDefaultMenuState = (e) => {
        e.preventDefault();
        const newGlobalState = {
            main: e.currentTarget.id,
            sub: globalState.sub
        }
        globalStateDispatch( { type: 'GLOBAL', payload: newGlobalState });
    }
    return menu;
}
export default DefaultMenu;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Left = Styled.div`
  float: left;
`
const MenuContainer = Styled(Left)`
  width: 220px;
  padding: 0 0 0 17.5px;

  &:hover {
    font-weight: bold;
  }
`
const SelectMenuContainer = Styled(MenuContainer)`  
  font-weight: bold;
  text-shadow: 1px 1px 2px gray;
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
font-size: 17.5px;
`
const A = Styled.a`
  cursor: pointer;
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////