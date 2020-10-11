import React, {useContext, useState} from 'react';
import Styled from 'styled-components'; // Styled-components 라이브러리를 사용하기 위해 선언
import Modal from 'react-modal';
import DaumPostcode from 'react-daum-postcode';
import Store from '../Store/Store';

function NewAddress() {
    // Change Delivery Address
    const { selectAddressStateDispatch } = useContext(Store);
    const changeDeleveryAddress = (e) => {
        const deliveryAddress = e.target.id;
        const newSelectAddressState = {
            state: deliveryAddress
        }
        selectAddressStateDispatch( { type: 'CHANGE', payload: newSelectAddressState} );
    }
    // Postcode Modal Setting
    const [postcodeModalState, setPostcodeModalState] = useState(false);
    const changePostcodeModalState = (e) => {
        e.preventDefault();
        setPostcodeModalState(true);
    };
    // Postcode & Address Value Setting
    const [postcode, setPostcode] = useState('');
    const [address1, setAddress1] = useState('');
    const handleComplete = (data) => {
        setPostcode(data.zonecode);
        setAddress1(data.address);
        setPostcodeModalState(false);
    };
    return(
        <span>
            <LeftInputRadio type='radio' id='default' name='delivery' onClick={(e)=>changeDeleveryAddress(e)}/>
            <Label>기존 배송지</Label>
            <RightInputRadio type='radio' id='new' name='delivery' checked/>
            <Label>신규 배송지</Label><br/>
            <InputText id='name' type='text' placeholder="이름" required/>
            <InputText id='phone' type='tel' placeholder="010 - 0000 - 0000" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" /><br/>
            <InputPostcode id='postcode' name="postcode" type="text" placeholder="우편번호" value={postcode} required readOnly/>
            <BtnPostcode type='submit' value='우편번호 검색' onClick={(e)=>changePostcodeModalState(e)}/><br/>
            <InputText id="address1" type="text" placeholder="도로명 주소" value={address1} required readOnly/><br/>
            <InputText id="address2" type="text" placeholder="상세 주소" />
            <Modal 
                isOpen={postcodeModalState}
                style={PostcodeModalStyle}
                onRequestClose={(e) => setPostcodeModalState(false)}
                // shouldCloseOnOverlayClick={false} // 화면 밖 클릭 시 종료되는 기능 제거
            >
                <DaumPostcode
                    onComplete={handleComplete}
                />
            </Modal>
        </span>
    );
}
export default NewAddress;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const LeftInputRadio = Styled.input`
    margin: 0 3px 20px 100px;
`
const RightInputRadio = Styled(LeftInputRadio)`
    margin: 0 3px 20px 40px;
`
const Label = Styled.label`
`
const Input = Styled.input`
    position: relative;
    left: 14%;
    width: 300px;
    height: 35px;
    margin: 0 0 15px 40px;
    font-size: 15px;
    text-indent: 15px;
    border: 1px solid #E0E0E0;
    border-radius: 10px;
    color: #717171;
`
const InputPostcode = Styled(Input)`
    width: 140px;
    margin: 0 -5px 0 40px;
`
const BtnPostcode = Styled(Input)`
    width: 125px;
    height: 35px;
    font-weight: bold;
    text-indent: 0px;
    text-shadow: 1px 1px 7px #BDBDBD; 
    box-shadow: 1px 1px 7px #BDBDBD;
    border: none;
    border-radius: 10px;
    color: white;
    background-color: #A6A6A6;

    &:hover {
        box-shadow: 1px 1px 9px #8C8C8C; 
    }
`
const InputText = Styled(Input)`
`
const PostcodeModalStyle = {
    overlay: {
        backgroundColor: 'rgba(140,140,140,0.9)',
        zIndex: 3               
    },
    content: {
        position: "absolute",
        left: '37.5%',
        top: '22.5%',
        width: '500px',
        height: '450px',
        borderRadius: 10,
        boxShadow: '9px 9px 10px #4E4E4E'
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////