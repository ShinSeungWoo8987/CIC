import React, { useContext, useEffect, useState } from 'react';
import Store from '../Store/Store';
import styled from "styled-components"
import parse from  'html-react-parser';

function BoardDetails(props) {
    const { boardItemList, globalState, globalStateDispatch } = useContext(Store);
    const [selectedItem, setSelectedItem] = useState({
        title:'', name:'', date:'', image:'', description:''
    });
    const payload = {
        main: globalState.main,
        sub: 'all',
        action: globalState.action,
        num: globalState.num
    }
    const handleClick = (e) =>{
        e.preventDefault();
        globalStateDispatch( {type: 'GLOBAL', payload} )
    }

    console.log(selectedItem);
    useEffect(()=>{
        let _main = '';
        if(globalState.main==='event') _main='eve';
        if(globalState.main==='notice') _main='not';
        if(globalState.main==='center') _main='ser';
        const _boardItemList = boardItemList.filter(i=>i[`${_main}_NUMBER`]===globalState.num);
        setSelectedItem({
            title:_boardItemList[0][`${_main}_TITLE`],
            name:_boardItemList[0][`mem_ID`],
            date:_boardItemList[0][`${_main}_REGISTER`],
            image:_boardItemList[0][`${_main}_IMAGE`] || '',
            description:_boardItemList[0][`${_main}_DESCRIPTION`]
        });
    },[]);
    return (
        <Container>
            <Title>
                <TitleUp>
                    {selectedItem.title}
                </TitleUp>
                <TitleDown>
                    <LeftSide><BackButton onClick={e=>handleClick(e)}>돌아가기</BackButton></LeftSide>
                    <RightSide>
                        <Quarter>등록일</Quarter>
                        <Quarter>{selectedItem.date.substr(0,10)}</Quarter>
                        <Quarter>등록자</Quarter>
                        <Quarter>{selectedItem.name}</Quarter>
                           
                    </RightSide>
                </TitleDown>
            </Title>
            <Content>
                {selectedItem.image}
                {parse(selectedItem.description)}
            </Content>
            <Bottom> <Button onClick={e=>handleClick(e)}>돌아가기</Button> </Bottom>
        </Container>
    );
}

export default BoardDetails;

const Container = styled.div`
    float: left;
    width: 100%;
    height: 1000px;
`
const Title = styled.div`
    border-bottom: 1px solid #E1E1E1;
    width: 100%;
    height: 80px;
    font-size: 28px;
`
const TitleUp = styled.div`
    margin: 0 10%;
    width: 80%;
    height: 50px;
    text-align: center;
    margin-top: 10px;
`
const TitleDown = styled.div`
    width: 100%;
    height: 21px;
    padding-bottom: 13px;
`
const LeftSide = styled.div`
    float: left;
    width: 60%;
    height: 21px;
    margin-top: -14px;
`
const BackButton = styled.button`
 font-size: 14px;
`
const RightSide = styled.div`
    float: left;
    font-size: 14px;
    width: 40%;
    height: 21px;
    text-align: center;
`
const Quarter = styled.div`
    float: left;
    width: 25%;
`
const Content = styled.div`
    border-bottom: 1px solid #E1E1E1;
    margin-top: 10px;
    padding: 10px 2%;
    width: 96%;
    min-height: 550px;
    font-size: 18px;
`
const Bottom = styled.div`
margin-top: 20px;
text-align: center;
`
const Button = styled.button`
`