import React, { useContext } from 'react';
import styled from 'styled-components';
import Store from '../Store/Store';
import ChargeItem from './ChargeItem';

function ChargeList({chargeList}) {
    const newChargeList = [ <ChargeItem 
        date='날짜' detail='세부내용' money='금액' state='분류' header='yes'/> ];
    for(var idx=0; idx<chargeList.length; idx++){
        newChargeList.push(
            <ChargeItem date={chargeList[idx].mon_register} detail={chargeList[idx].mon_title} money={chargeList[idx].mon_money} state={chargeList[idx].mon_type} header={chargeList[idx].header}/>
        );
    }
    return <Container>{newChargeList}</Container>;
}
export default ChargeList;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Container = styled.div`
    width: 577px;
    height: 560px;
    margin: 30px 0 0 0;
    overflow-y: scroll;
    background-color: white;
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////