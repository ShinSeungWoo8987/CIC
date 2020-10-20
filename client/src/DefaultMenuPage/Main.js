import React, {useContext, useState} from 'react';
import Styled from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Store from '../Store/Store';
import Item from '../Components/Item';
import { getRandom } from '../Util/Util';

function Main() {
    const buttonImg = `https://crowdincreative.s3.ap-northeast-2.amazonaws.com/static/`;
    const { globalState, globalStateDispatch } = useContext(Store);
    const mainPage = ['all', 'tech', 'travel', 'fashion']; // Main Page Menu List
    let menuList = [];
    var idx=0;
    const menu = [];
    const [pageNumber, setPageNumber] = useState(1);
    // Test
    const itemList = [
        {name: 'CIC', dDay: 30, title: '하루에 0.1씩 시력이 나빠지고 있어요ㅜㅜ', targetMoney: getRandom(100000000, 1000000), saveMoney: getRandom(150000000, 0), fundingCount: 1000},
        {name: 'Joker', dDay: 150, title: '하루에 0.1씩 시력이 나빠지고 있어요ㅜㅜ', targetMoney: getRandom(100000000, 1000000), saveMoney: 0, fundingCount: 0},
        {name: 'Hello', dDay: 20, title: '하루에 0.1씩 시력이 나빠지고 있어요ㅜㅜ', targetMoney: getRandom(100000000, 1000000), saveMoney: getRandom(300000000, 0), fundingCount: 3000},
        {name: 'CIC', dDay: 60, title: '하루에 0.1씩 시력이 나빠지고 있어요ㅜㅜ', targetMoney: getRandom(100000000, 1000000), saveMoney: getRandom(300000000, 0), fundingCount: 1500},
        {name: 'Hell', dDay: 10, title:'하루에 0.1씩 시력이 나빠지고 있어요ㅜㅜ', targetMoney: getRandom(100000000, 1000000), saveMoney: getRandom(300000000, 0), fundingCount: 2400},
        {name: 'CIC', dDay: 5, title: '하루에 0.1씩 시력이 나빠지고 있어요ㅜㅜ', targetMoney: getRandom(100000000, 1000000), saveMoney: getRandom(300000000, 0), fundingCount: 20},
        {name: 'SOS', dDay: 300, title: '하루에 0.1씩 시력이 나빠지고 있어요ㅜㅜ', targetMoney: getRandom(100000000, 1000000), saveMoney: getRandom(300000000, 0), fundingCount: 500},
        {name: 'CIC', dDay: 124, title: '하루에 0.1씩 시력이 나빠지고 있어요ㅜㅜ', targetMoney: getRandom(100000000, 1000000), saveMoney: getRandom(300000000, 0), fundingCount: 90}
    ];
    // Main Page Sub Menu Setting
    while(idx<mainPage.length){
        if(mainPage[idx]===globalState.main){
            menuList = [
                {id: 'all', title: '전체'},
                {id: 'new', title: '신규'},
                {id: 'closeSoon', title: '마감임박'},
                {id: 'close', title: '마감'}
            ];
        }
        idx++;
    }
    // Funding List Sub Menu Setting
    if(globalState.main==='fundingList'){
        menuList = [
            {id: 'continue', title: '진행중'},
            {id: 'close', title: '종료'}
        ]
    }
    // Item List Setting
    idx=0;
    let item = [];
    switch(pageNumber){
        case 1:
            while(idx<itemList.length) {
                item.push(<Item key={idx} name={itemList[idx].name} dDay={itemList[idx].dDay} title={itemList[idx].title} targetMoney={itemList[idx].targetMoney} saveMoney={itemList[idx].saveMoney} fundingCount={itemList[idx].fundingCount}/>);    
                idx++;
            }
            break;
        case 2:
            while(idx<6) {
                item.push(<Item key={idx} name={itemList[idx].name} dDay={itemList[idx].dDay} title={itemList[idx].title} targetMoney={itemList[idx].targetMoney} saveMoney={itemList[idx].saveMoney} fundingCount={itemList[idx].fundingCount}/>);    
                idx++;
            }
            break;
        default :
            break;
    }
    // Sub Menu List Setting
    idx=0;
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
    // Selected Sub Menu Setting
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
        item = [];
        let newPageNumber = pageNumber
        e.preventDefault();
        if(direction==='left'){
            setPageNumber(newPageNumber-1);
        }else{
            setPageNumber(newPageNumber+1);
        }
        console.log(direction);
        console.log(pageNumber);
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
                    {item}
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
    text-align: center;
`
const Menu = Styled.div`
    display: inline-block;
    margin:  10px 0;
`
const MenuContainer = Styled(Left)`
    padding: 0 25px;
    
    &:hover {
        font-weight: bold;
    }
`
const SelectMenuContainer = Styled(MenuContainer)`  
    font-weight: bold;
    text-shadow: 1px 1px 2px gray;
`
const TextContainer = Styled(Left)`
    height: 40px;
    line-height: 40px;
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