import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import Store from '../Store/Store';
import ChargeList from './ChargeList';
import {get,put} from 'axios';
import { moneyFormat } from '../Util/Util'

Modal.setAppElement('#root') // Modal 태그 내부에 onRequestClose 같은 속성을 사용하기 위해 선언

function Charge() {
    const { modalState, modalStateDispatch } = useContext(Store);
    
    const [money, setMoney] = useState({
        totalMoney:0,
        availableMoney:0
    });

    const [chargeList,setChargeList] = useState([
        { mon_register: '    -  -     :  :  ', mon_title: '로딩중', mon_money: 0, mon_type: 0}
    ]);

    const closeChargeModal = (e) => {
        modalStateDispatch({ type: "DEFAULT" });
    }
    const handleMoneyChange = (data) => {
        let money = 0;
        data.filter(i => {
            if (i.mon_type === 0) money += i.mon_money
        });
        let availableMoney = money;
        let totalMoney = money;
        data.filter(i => {
            if (i.mon_type === 1 || i.mon_type === 2) availableMoney = availableMoney - i.mon_money
        });
        data.filter(i => {
            if (i.mon_type === 2) totalMoney = totalMoney - i.mon_money
        });
        setMoney({ availableMoney: moneyFormat(availableMoney), totalMoney: moneyFormat(totalMoney) });
    }
    useEffect(()=>{
        if(modalState.charge){
            get(`/money/details`)
                .then(({data})=>{
                    handleMoneyChange(data);
                    setChargeList(data);
                }).catch(err=>alert(err));
        }
    },[modalState.charge]);
    
    const handleMoneyCharge = ()=>{
        put(`/money/charge`,{
            money:50000
        }).then(({data})=>{
            handleMoneyChange(data);
            setChargeList(data);
        }).catch(()=>alert('충전에 실패하였습니다. 다시 시도해주세요.'));
    }
    return <Modal
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
                    <Btn onClick={()=>handleMoneyCharge()}>충전</Btn>
            </Text>
            <SubContainer>
                <TotalMoney>
                    <Text>보유 마일리지</Text>
                    <Value>{money.totalMoney}</Value>
                </TotalMoney>
                <AvailableMoney>
                    <Text>사용가능한 마일리지</Text>
                    <Value>{money.availableMoney}</Value>
                </AvailableMoney>
            </SubContainer>
            <ChargeList chargeList={chargeList}/>
        </Container>
    </Modal>
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
        left: '35%',
        top: '5%',
        width: '650px',
        height: '875px',
        padding: '0px',
        borderRadius: 10,
        boxShadow: '9px 9px 10px #4E4E4E'
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////