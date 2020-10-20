import React, {useContext, useState} from 'react';
import Styled from 'styled-components'; // Styled-components 라이브러리를 사용하기 위해 선언
import Modal from 'react-modal';
import Store from '../Store/Store';
import PercentBar from './PercentBar'
import { getRandom, moneyFormat, percentFormat } from '../Util/Util.js';

Modal.setAppElement('#root') // Modal 태그 내부에 onRequestClose 같은 속성을 사용하기 위해 선언

function Funding() {
    console.log("Funding Start");
    const { session, addressValue, addressValueDispatch, modalState, modalStateDispatch } = useContext(Store);
    const [fundingModalState, setFundingModalState] = useState(false);
    const targetMoney = getRandom(10000000, 1000000)
    const saveMoney = getRandom(12000000, 500000)
    const percent = percentFormat(saveMoney,targetMoney);
    const dDay = 30;
    const saveMoneyStr = moneyFormat(saveMoney);
    const fundingCount = 1000;
    // When Login & Non-Login, Modal Setting
    const openModal = (e) => {
        e.preventDefault();
        if( !session.state ) { //로그인상태
            setFundingModalState(true);    
        }else{ //로그아웃상태
            const newModalState = {
                login: true,
                postcode: modalState.postcode
            }
            modalStateDispatch({type:"CHANGE_MODALSTATE", payload: newModalState});
        }
    }
    // Funding Modal Setting
    const closeModal = (e) => {
        e.preventDefault();
        const newAddressValue = {
            postcode: '',
            address1: ''
        }
        addressValueDispatch({type: 'CHANGE_ADDRESS', payload: newAddressValue});
        setFundingModalState(false);
    }
    // Postcode Modal Setting
    const openPostcodeModal = (e) => {
        e.preventDefault();
        const newModalState = {
            login: modalState.login,
            postcode: true
        }
        modalStateDispatch({type:"CHANGE_MODALSTATE", payload: newModalState});
    };
    // Funding Submit
    const onFundingSubmit = (e) => {
        console.log("펀딩 테스트");
        console.log(e.target.name.value);
    }      
    return (
        <Container>
            <LinkModal onClick={(e)=>openModal(e)}>펀딩하기</LinkModal>
            <Modal 
                isOpen= { fundingModalState }
                style={ FundingModalStyle }
                onRequestClose={(e) => closeModal(e)}
                // shouldCloseOnOverlayClick={false} // 화면 밖 클릭 시 종료되는 기능 제거
            >
                <Form onSubmit={(e)=>onFundingSubmit(e)}>
                    <Title>이 자리는 제목이 들어갈 자리입니다.</Title>
                    <CurrentStateContainer>
                        <Text>모인금액</Text><br/>
                        <SubContainer>
                            <Value>{saveMoneyStr}</Value><BottomText>원</BottomText><PercentText>{percent+'%'}</PercentText><br/><br/>
                            <PercentContainer>
                                <PercentBar width='250px' height='15px' borderColor='white' percent={percent}/>
                            </PercentContainer>
                        </SubContainer><br/>
                        <Text>참여인원</Text><br/>
                        <SubContainer>
                            <Value>{fundingCount}</Value><BottomText>명</BottomText>
                        </SubContainer><br/>
                        <Text>남은기간</Text><br/>
                        <SubContainer>
                            <Value>{dDay}</Value><BottomText>일</BottomText>
                        </SubContainer>
                    </CurrentStateContainer>
                    <DeliveryAddressContainer>
                        <SubTitle>배송지 정보</SubTitle><br/>
                        <InputText id='name' type='text' placeholder="이름" required/>
                        <InputText id='phone' type='tel' placeholder="010 - 0000 - 0000" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" /><br/>
                        <InputPostcode id='postcode' name="postcode" type="text" placeholder="우편번호" value={addressValue.postcode} required readOnly/>
                        <BtnPostcode type='submit' value='우편번호 검색' onClick={(e)=>openPostcodeModal(e)}/><br/>
                        <InputText id="address1" type="text" placeholder="도로명 주소" value={addressValue.address1} required readOnly/><br/>
                        <InputText id="address2" type="text" placeholder="상세 주소" /><br/>
                    </DeliveryAddressContainer>
                    <Writing id='supportMessage' placeholder='응원글을 입력해주세요!'/><br/>
                    <InputSubmit type="submit" value="펀딩하기"/>
                </Form>
            </Modal>
        </Container>
    );
}
export default Funding;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Left = Styled.div`
    float: left;
`
const Container = Styled(Left)`
    width: 75px;
`
const LinkModal = Styled.a`
    color: #A3A3A3;
    cursor: pointer;

    &:hover {
        color: black;
        font-weight: bold;
    }
`
const Form = Styled.form`
    text-align: center;
`
const Title = Styled.div`
    font-size: 30px;
    font-weight: bold;
    margin: 0 0 40px 0;
`
const CurrentStateContainer = Styled(Left)`
    width: 50%;
`
const Text = Styled(Left)`
    font-size: 15px;
`
const SubContainer = Styled(Left)`
    width: 100%;
    margin: 0 0 20px 0;
`
const BottomText = Styled(Text)`
    position: relative;
    top: 20px;
`
const PercentText = Styled(BottomText)`
    float: right;
    font-weight: bold;
    margin: 0 135px 0 0;
    color: #80C72D;
`
const Value = Styled(Left)`
    font-size: 30px;
    font-weight: bold;
    color: #80C72D;
`
const PercentContainer = Styled(Left)`
    width: 250px;
    height: 15px;
    border: none;
    border-radius: 10px;
    background-color: #E1E1E1 ;
`
const DeliveryAddressContainer = Styled(CurrentStateContainer)`
    text-align: left;
`
const SubTitle = Styled(Text)`
    margin: 0 0 15px 80px;
`
const Input = Styled.input`
    position: relative;
    left: 14%;
    width: 300px;
    height: 35px;
    margin: 0 0 15px 25px;
    font-size: 15px;
    text-indent: 15px;
    border: 1px solid #E0E0E0;
    border-radius: 10px;
    color: #717171;
`
const InputPostcode = Styled(Input)`
    width: 140px;
    margin: 0 10px 0 25px;
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
const Writing = Styled.textarea`
    float: right;
    width: 765px;
    height: 75px;
    margin: 40px 0 0 0;
    text-indent: 5px;
    border: 1px solid #E0E0E0;
    border-radius: 5px;
    resize: none;
`
const InputSubmit = Styled(Input)`
    left: -10px;
    width: 306px;  
    height: 50px;
    font-size: 20px;
    font-weight: bold;
    text-indent: 0px;
    text-shadow: 1px 1px 7px #BDBDBD; 
    box-shadow: 1px 1px 7px #BDBDBD;
    border: none;
    color: white;
    margin: 40px 0 0 0;
    background-color: #83E538;
    

    &:hover {
        box-shadow: 1px 1px 9px #8C8C8C; 
    }
`
const FundingModalStyle = {
    overlay: {
        backgroundColor: 'rgba(140,140,140,0.9)',
        zIndex: 1            
    },
    content: {
        position: "absolute",
        left: '22%',
        top: '15%',
        padding: '50px 125px',
        width: '40%',
        height: '600px',
        borderRadius: 10,
        boxShadow: '9px 9px 10px #4E4E4E'
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////