import React, { useContext } from 'react';
import styled from 'styled-components';
import Store from '../Store/Store';
import ChargeItem from './ChargeItem';

function ChargeList() {
    const chargeList = [
        { number: '번호', date: '날짜', money: '금액', state: '상태', header: 'yes'},
        { number: 1, date: '2020-11-05 18:55:20', money: '50,000', state: '충전'},
        { number: 2, date: '2020-11-08 05:22:03', money: '-25,000', state: '사용'},
        { number: 3, date: '2020-11-05 18:55:20', money: '50,000', state: '충전'},
        { number: 4, date: '2020-11-08 05:22:03', money: '-25,000', state: '사용'},
        { number: 5, date: '2020-11-05 18:55:20', money: '50,000', state: '충전'},
        { number: 6, date: '2020-11-08 05:22:03', money: '-25,000', state: '사용'},
        { number: 7, date: '2020-11-05 18:55:20', money: '50,000', state: '충전'},
        { number: 8, date: '2020-11-08 05:22:03', money: '-25,000', state: '사용'},
        { number: 9, date: '2020-11-05 18:55:20', money: '50,000', state: '충전'},
        { number: 10, date: '2020-11-08 05:22:03', money: '-25,000', state: '사용'},
        { number: 11, date: '2020-11-05 18:55:20', money: '50,000', state: '충전'},
        { number: 12, date: '2020-11-08 05:22:03', money: '-25,000', state: '사용'},
        { number: 13, date: '2020-11-05 18:55:20', money: '50,000', state: '충전'},
        { number: 14, date: '2020-11-08 05:22:03', money: '-25,000', state: '사용'},
        { number: 15, date: '2020-11-05 18:55:20', money: '50,000', state: '충전'},
        { number: 16, date: '2020-11-08 05:22:03', money: '-25,000', state: '사용'},
        { number: 17, date: '2020-11-05 18:55:20', money: '50,000', state: '충전'},
        { number: 18, date: '2020-11-08 05:22:03', money: '-25,000', state: '사용'}
    ]
    const newChargeList = [];
    for(var idx=0; idx<chargeList.length; idx++){
        newChargeList.push(
            <ChargeItem number={chargeList[idx].number} date={chargeList[idx].date} money={chargeList[idx].money} state={chargeList[idx].state} header={chargeList[idx].header}/>
        );
    }
    return (
        <Container>
            {newChargeList}
        </Container>
    );
}
export default ChargeList;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Container = styled.div`
    width: 577px;
    height: 400px;
    margin: 30px 0 0 0;
    overflow-y: scroll;
    background-color: white;
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////