import React, {useContext} from 'react';
import Styled from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Store from '../Store/Store';
import Item from './Items';
import Funding from '../Project/Funding';

function Main() {
    const buttonImg = `https://crowdincreative.s3.ap-northeast-2.amazonaws.com/static/`;
    const {globalState, globalStateDispatch} = useContext(Store);
    const menuList = [
        {id: 'all', title: '전체'},
        {id: 'new', title: '신규'},
        {id: 'closeSoon', title: '마감임박'},
        {id: 'close', title: '마감'}
    ]
    const menu = [];
    // Menu List Setting
    var idx=0;
    while(idx<menuList.length){
        if(globalState.sub === menuList[idx].id){
            menu.push(
                <A key={idx} id={menuList[idx].id} onClick={(e)=>changMenuState(e)}>
                <SelectMenuContainer>
                    <TextContainer>
                    <Text>{menuList[idx].title}</Text>
                    </TextContainer><br/>
                </SelectMenuContainer>
                </A>
            )
        }else{
            menu.push(
                <A key={idx} id={menuList[idx].id} onClick={(e)=>changMenuState(e)}>
                <MenuContainer >
                    <TextContainer>
                    <Text>{menuList[idx].title}</Text>
                    </TextContainer><br/>
                </MenuContainer>
                </A>
            )
        }
        idx += 1;
    }
    // Selected Menu Setting
    const changMenuState = (e) => {
        e.preventDefault();
        const newGlobalState = {
            main: globalState.main,
            sub: e.currentTarget.id
        }
        globalStateDispatch( { type: 'GLOBAL', payload: newGlobalState });
    }
    // Next Page
    const moveMainPage = (e, direction) => {
        e.preventDefault();
        if(direction==='left'){
            console.log('왼쪽');
        }else{
            console.log("오른쪽");
        }
    }
    return(
        <Container>
            <Menu>
                {menu}   
            </Menu><br/>
            <SubContainer>
                <LeftSide>
                    <Image src={buttonImg+'LeftMainButton.png'} onClick={(e)=>moveMainPage(e, 'left')}></Image>
                </LeftSide>
                <ItemContainer>
                    <Item/>
                    <Funding/>
                </ItemContainer>
                <RightSide>
                <Image src={buttonImg+'RightMainButton.png'} onClick={(e)=>moveMainPage(e, 'right')}></Image>
                </RightSide>
            </SubContainer>
        </Container>
    );
}
export default Main;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Left = Styled.div`
    float: left;
`
const Container = Styled(Left)`
    width: 1665px;
    height: 869px;
    text-align: center;
`
const Menu = Styled.div`
    display: inline-block;
    margin: 0 auto 0 auto;
`
const MenuContainer = Styled(Left)`
  padding: 0 50px 0 0;

  &:hover {
    font-weight: bold;
  }
`
const SelectMenuContainer = Styled(MenuContainer)`  
  font-weight: bold;
  text-shadow: 1px 1px 2px gray;
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
const SubContainer = Styled(Left)`

`
const Image = Styled.img`
  width: 60px;
  vertical-align: middle;
  cursor: pointer;
`
const LeftSide = Styled(Left)`
  width: 100px;
  height: 865px;
  line-height: 800px;
`
const ItemContainer = Styled(Left)`
  width: 1465px;
  height: 100px;
`
const RightSide = Styled(LeftSide)`
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////