import React, { useContext } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import Store from '../Store/Store';
import ChargeList from './ChargeList';

Modal.setAppElement('#root') // Modal 태그 내부에 onRequestClose 같은 속성을 사용하기 위해 선언

function Charge() {
    const { modalState, modalStateDispatch } = useContext(Store);
    const closeChargeModal = (e) => {
        modalStateDispatch({type:"DEFAULT"});
    }
    let content = <ChargeList/>;
    const totalMoney = '500,000';
    const availableMoney = '200,000';
    return (
        <Modal 
            isOpen={modalState.charge}
            style={ChargeModalStyle}
            onRequestClose={(e) => closeChargeModal(e)}
            shouldCloseOnOverlayClick={true} // 화면 밖 클릭 시 종료되는 기능 
        >
            <Title>
                마일리지 충전 · 사용내역
                {/* <Btn>닫기</Btn> */}
            </Title>
            <Container>
                <Text>
                    내 마일리지
                    <Btn>충전</Btn>
                </Text>
                <SubContainer>
                    <TotalMoney>
                        <Text>보유 마일리지</Text>
                        <Value>{totalMoney}</Value>
                    </TotalMoney>
                    <AvailableMoney>
                        <Text>사용가능한 마일리지</Text>
                        <Value>{availableMoney}</Value>
                    </AvailableMoney>
                </SubContainer>
                {content}
            </Container>
        </Modal>
    )
}
export default Charge;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Title = styled.div`
    width: 560px;
    font-size: 17.5px;
    font-weight: bold;
    padding: 10px 45px;
    color: white;
    background-color: #6600CC;
`
const Container = styled.div`
    width: 560px;
    padding: 30px 45px 0 45px;
    height: 802px;
    background-color: #F2F2F2;
`
const Text = styled.div`
    font-size: 15px;
    font-weight: bold;
`
const Value = styled.div`
    font-size: 37.5px;
    font-weight: bold;
`
const Btn = styled.button`
    float: right;
    font-size: 15px;
    border-radius: 5px;
    border: 1px solid #C8C8C8;
    cursor: pointer;
`
const SubContainer = styled.div`
    width: 470px;
    height: 100px;
    margin: 10px 0 0 0;
    padding: 30px 45px 0 45px;
    background-color: white;
`
const TotalMoney = styled.div`
    float: left;
    width: 250px;
`
const AvailableMoney = styled.div`
    float: left;
`
const ChargeModalStyle = {
    overlay: {
        backgroundColor: 'rgba(140,140,140,0.9)',
        zIndex: 5      
    },
    content: {
        position: "absolute",
        left: '37.5%',
        top: '5%',
        width: '650px',
        height: '875px',
        padding: '0px',
        borderRadius: 10,
        boxShadow: '9px 9px 10px #4E4E4E'
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////