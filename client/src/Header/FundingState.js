import React, { useContext, useEffect, useState } from 'react';
import Styled from 'styled-components';
import Store from '../Store/Store';
import PercentBar from '../Components/PercentBar'
import Company from './Company';

function FundingState() {
    const { project, session, globalState, globalStateDispatch, modalStateDispatch, projectInformation, infoDispatch, contentDispatch } = useContext(Store);
    const dDayText = projectInformation.dDay === '마감' ? '' : '일';
    const [fundingBtn, setfundingBtn] = useState('');
    // Get User Information & Setting
    useEffect(() => {
        if (projectInformation.creator === localStorage.getItem('userId')) setfundingBtn([
            <FundingBtn onClick={(e) => openModal(e, 'list')}>참여자 목록</FundingBtn>,
            <EditBtn onClick={(e) => openModal(e, 'edit')}>수정하기</EditBtn>,
            <DeleteBtn onClick={(e) => openModal(e, 'delete')}>삭제하기</DeleteBtn>
        ]);
        else setfundingBtn(
            projectInformation.dDay === '마감' ? <CloseFudningBtn >마감</CloseFudningBtn> : <FundingBtn onClick={(e) => openModal(e, 'funding')}>펀딩하기</FundingBtn>
        );
    }, [globalState, session.token]);
    // When Login & Non-Login, Modal Setting
    const openModal = (e, value) => {
        e.preventDefault();
        if (value === 'funding') {
            if (session.state) { //로그인상태
                const newModalState = {
                    funding: true
                }
                modalStateDispatch({ type: 'CHANGE_MODALSTATE', payload: newModalState });
            } else { //로그아웃상태
                const newModalState = {
                    login: true
                }
                modalStateDispatch({ type: "CHANGE_MODALSTATE", payload: newModalState });
            }
        } else if (value === 'list') {
            const newModalState = {
                fundingMemberList: true
            }
            modalStateDispatch({ type: 'CHANGE_MODALSTATE', payload: newModalState });
        } else if (value === 'delete') {
            const newGlobalState = {
                main: globalState.main,
                sub: globalState.sub,
                action: 'deleteProject',
                num: 0
            }
            globalStateDispatch({ type: 'GLOBAL', payload: newGlobalState });
            const newModalState = {
                authority: true
            }
            modalStateDispatch({ type: "CHANGE_MODALSTATE", payload: newModalState });
        } else if (value === 'edit') {
            const payload = {
                main: globalState.main,
                sub: 'editProject',
                action: globalState.action,
                num: globalState.num
            }


            console.log(projectInformation);
            infoDispatch({
                type: 'CHANGE_INFO', payload: {
                    category: "",
                    fdate: "",
                    funding_price: projectInformation.price,
                    logo: "",
                    project_name: projectInformation.title,
                    sdate: "",
                    target_money: projectInformation.target,
                    thumbnail: "",
                }
            });
            globalStateDispatch({ type: 'GLOBAL', payload });
        }
    }
    return  <Container>
                <CurrentStateContainer>
                    <Text>모인금액</Text><br />
                    <SubContainer key={1} margin='-10px 0 10px 0'>
                        <Value >{projectInformation.save}</Value><BottomText >원</BottomText><PercentText>{projectInformation.percent + '%'}</PercentText><br /><br />
                        <PercentBarContainer>
                            <PercentBar width='300px' height='10px' borderColor='white' percent={projectInformation.percent} />
                        </PercentBarContainer>
                    </SubContainer><br />
                    <Text >펀딩금액</Text><br />
                    <SubContainer key={2} margin='0 0 20px 0'>
                        <Value >{projectInformation.price}</Value><BottomText >원</BottomText>
                    </SubContainer><br />
                    <Text >참여인원</Text><br />
                    <SubContainer key={3} margin='0 0 20px 0'>
                        <Value >{projectInformation.fundingCnt}</Value><BottomText >명</BottomText>
                    </SubContainer><br />
                    <Text >남은기간</Text><br />
                    <SubContainer key={4} margin='0 0 20px 0'>
                        <Value >{projectInformation.dDay}</Value><BottomText >{dDayText}</BottomText>
                    </SubContainer>
                    {!fundingBtn ? <CloseFudningBtn>준비중</CloseFudningBtn> : fundingBtn}
                </CurrentStateContainer>
                <Company />
            </Container>
}
export default FundingState;

const Left = Styled.div`
    float: left;
`
const Container = Styled.div`
    position: relative;
    left: 1278.2px;
`
const CurrentStateContainer = Styled(Left)`
    position: fixed;
    width: 300px;
    margin: 63px 0 0 0;
`
const Text = Styled(Left)`
    font-size: 15px;
    margin: 0px;
    padding: 0px;
`
const SubContainer = Styled(Left)`
    width: 100%;
    margin: ${({ margin }) => `${margin}`};
`
const Value = Styled(Left)`
    font-size: 30px;
    font-weight: bold;
    color: #80C72D;
`
const PercentBarContainer = Styled(Left)`
    border: none;
    border-radius: 10px;
    background-color: #E1E1E1;
    margin: -25px 0 -60px 0;
`
const BottomText = Styled(Text)`
    position: relative;
    top: 20px;
`
const PercentText = Styled(BottomText)`
    float: right;
    font-weight: bold;
    color: #80C72D;
`
const FundingBtn = Styled.button`
    left: 14%;
    width: 300px;
    height: 50px;
    font-size: 20px;
    font-weight: bold;
    text-shadow: 1px 1px 7px #BDBDBD; 
    box-shadow: 1px 1px 7px #BDBDBD;
    border: none;
    border-radius: 10px;
    color: white;
    margin-top: 20px;
    background-color: #83E538;
    cursor: pointer;

    &:hover {
        box-shadow: 1px 1px 9px #8C8C8C; 
    }
`
const EditBtn = Styled.button`
    left: 14%;
    width: 140px;
    height: 50px;
    font-size: 20px;
    font-weight: bold;
    text-shadow: 1px 1px 7px #BDBDBD; 
    box-shadow: 1px 1px 7px #BDBDBD;
    border: none;
    border-radius: 10px;
    color: white;
    margin-top: 20px;
    background-color: #83E538;
    cursor: pointer;

    &:hover {
        box-shadow: 1px 1px 9px #8C8C8C; 
    }
`
const DeleteBtn = Styled.button`
    margin-left: 20px;
    left: 14%;
    width: 140px;
    height: 50px;
    font-size: 20px;
    font-weight: bold;
    text-shadow: 1px 1px 7px #BDBDBD; 
    box-shadow: 1px 1px 7px #BDBDBD;
    border: none;
    border-radius: 10px;
    color: white;
    margin-top: 20px;
    background-color: #83E538;
    cursor: pointer;

    &:hover {
        box-shadow: 1px 1px 9px #8C8C8C; 
    }
`
const CloseFudningBtn = Styled(FundingBtn)`
    cursor: default;
`