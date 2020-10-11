import React, {useContext} from 'react';
import Styled from 'styled-components'; // Styled-components 라이브러리를 사용하기 위해 선언
import Store from '../Store/Store';

function DefaultAddress() {
    // Change Delivery Address
    const { selectAddressStateDispatch } = useContext(Store);
    const changeDeleveryAddress = (e) => {
        const deliveryAddress = e.target.id;
        const newSelectAddressState = {
            state: deliveryAddress
        }
        selectAddressStateDispatch( { type: 'CHANGE', payload: newSelectAddressState} );
    }
    return(
        <span>
            <LeftInputRadio type='radio' id='default' name='delivery' checked/>
            <Label>기존 배송지</Label>
            <RightInputRadio type='radio' id='new' name='delivery' onClick={(e)=>changeDeleveryAddress(e)}/>
            <Label>신규 배송지</Label><br/>
            <InfoText>김준</InfoText>
            <InfoText>010-4315-5876</InfoText>
            <InfoText>05542</InfoText>
            <InfoText>서울특별시 마포구 통일로11길 14-3</InfoText>
        </span>
    );
}
export default DefaultAddress;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const LeftInputRadio = Styled.input`
    margin: 0 3px 20px 100px;
`
const RightInputRadio = Styled(LeftInputRadio)`
    margin: 0 3px 20px 40px;
`
const Label = Styled.label`
`
const InfoText = Styled.div`
    width: 100%;
    font-size: 15px;
    margin: 0 0 10px 100px;
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////