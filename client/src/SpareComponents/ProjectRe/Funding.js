import React, {useContext, useEffect, useState} from 'react';
import Styled from 'styled-components'; // Styled-components 라이브러리를 사용하기 위해 선언
import Modal from 'react-modal';
import Store from '../Store/Store';
import DaumPostcode from 'react-daum-postcode';
import ProgressBar from 'react-percent-bar'

Modal.setAppElement('#root') // Modal 태그 내부에 onRequestClose 같은 속성을 사용하기 위해 선언

function Funding() {
    useEffect( ()=>{
        console.log('componentDidMount')
    } );
    const { session } = useContext(Store);
    // Funding Modal Setting
    const [fundingModalState, setFundingModalState] = useState(true)
    const openFundingModal = (e) => {
        e.preventDefault();
        setFundingModalState(true);
    }
    const closeFundingModal = () => {
        setFundingModalState(false);
    }
    // Format - (###,###,###)
    const changeFormat = (source) => {
        const reverseSource = String(source).split("").reverse().join("");
        let result = '';
        var i=0;
        while(i<String(reverseSource).length){
            if(i%3 === 2 && i !== String(reverseSource).length-1){
                result += String(reverseSource)[i] + ',';
            }else{
                result += String(reverseSource)[i]
            }
            i++;
        }
        return String(result).split("").reverse().join("");
    }
    // Funding Information Setting
    const targetMoney = 1000000;
    const saveMoney = 500000;
    const saveMoneyStr = changeFormat(saveMoney);
    const percent = ((saveMoney/targetMoney)*100);
    const fundingCnt = changeFormat(1000);  // DB 연결하기 전, 임의의 펀딩인원(1000) 지정
    const dDay = 30;
    // ProgressBar Setting
    let progress = <ProgressBar width='250px' height='10px' fillColor='lime' percent={percent}/>;
    // Login & Non-Login Setting
    const login = '';
    const nonLogin = '';
    // Postcode Modal Setting
    const [postcodeModalState, setPostcodeModalState] = useState(false);
    const changePostcodeModalState = (e) => {
        e.preventDefault();
        setPostcodeModalState(true);
    };
    // Postcode & Address Value Setting
    const [postcode, setPostcode] = useState('');
    const [address1, setAddress1] = useState('');
    console.log(postcode);
    const handleComplete = (data) => {
        setPostcode(data.zonecode);
        setAddress1(data.address);
        setPostcodeModalState(false);
    };
    // Select Delivery Address
    const defaultAddress =  <span>
                                <LeftInputRadio type='radio' id='default' name='address' defaultChecked/>
                                <Label>기존 배송지</Label>
                                <RightInputRadio type='radio' id='new' name='address' onClick={(e)=>changeDeliveryAddress(e)}/>
                                <Label>신규 배송지</Label>
                            </span>;
    let newAddress =  <span>
                            <LeftInputRadio type='radio' id='default' name='address' onClick={(e)=>changeDeliveryAddress(e)}/>
                            <Label>기존 배송지</Label>
                            <RightInputRadio type='radio' id='new' name='address' />
                            <Label>신규 배송지</Label>
                            <InputText id='name' type='text' placeholder="이름" required/>
                            <InputText id='phone' type='tel' placeholder="010 - 0000 - 0000" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" /><br/>
                            <InputPostcode id='postcode' name="postcode" type="text" placeholder="우편번호" value={postcode} required readOnly/>
                            <BtnPostcode type='submit' value='우편번호 검색' onClick={(e)=>changePostcodeModalState(e)}/><br/>
                            <InputText id="address1" type="text" placeholder="도로명 주소" value={address1} required readOnly/><br/>
                            <InputText id="address2" type="text" placeholder="상세 주소" /><br/>
                        </span>;
    const [deliveryAddress, setDeliveryAddress] = useState('default');
    const changeDeliveryAddress = (e) => {
        const deliveryAddressState = e.target.id;
        setDeliveryAddress(deliveryAddressState)
    }
    return (
        <Container>
            <LinkModal  onClick={(e)=>openFundingModal(e)}>펀딩하기</LinkModal>
            <Modal 
                    isOpen= { fundingModalState }
                    style={ FundingModalStyle }
                    onRequestClose={(e) => closeFundingModal()}
                    // shouldCloseOnOverlayClick={false} // 화면 밖 클릭 시 종료되는 기능 제거
                >
                    <Form>
                        <Title>이 자리는 제목이 들어갈 자리입니다.</Title>
                        <CurrentStateContainer>
                            <Text>모인금액</Text><br/>
                            <SubContainer>
                                <Value>{saveMoneyStr}</Value><BottomText>원</BottomText><PercentText>{percent+'%'}</PercentText><br/><br/>
                                {progress}
                            </SubContainer><br/>
                            <Text>참여인원</Text><br/>
                            <SubContainer>
                                <Value>{fundingCnt}</Value><BottomText>명</BottomText>
                            </SubContainer><br/>
                            <Text>남은기간</Text><br/>
                            <SubContainer>
                                <Value>{dDay}</Value><BottomText>일</BottomText>
                            </SubContainer>
                        </CurrentStateContainer>
                        <DeliveryAddressContainer>
                            { deliveryAddress === 'default'?defaultAddress:newAddress }
                        </DeliveryAddressContainer>
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
const Form = Styled.div`
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
    font-weight: bold;
    margin: 0 0 0 87px;
    color: #80C72D;
`
const Value = Styled(Left)`
    font-size: 30px;
    font-weight: bold;
    color: #80C72D;
`
const DeliveryAddressContainer = Styled(CurrentStateContainer)`
    text-align: left;
`
const LeftInputRadio = Styled.input`
    margin-right: 3px;
    margin-bottom: 20px;
    margin-left: 80px;
`
const RightInputRadio = Styled(LeftInputRadio)`
    margin-left: 20px;
`
const Label = Styled.label`
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
    border: 1px solid #E0E0E0;
    border-radius: 5px;
    resize: none;
`
const InputSubmit = Styled(Input)`
    left: -40%;
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
        zIndex: 3               
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
const MessageModalStyle = {
    overlay: {
        backgroundColor: 'rgba(140,140,140,0.9)',
        zIndex: 3               
    },
    content: {
        position: "absolute",
        left: '40%',
        top: '27.5%',
        width: '17.5%',
        height: '290px',
        borderRadius: 10,
        boxShadow: '9px 9px 10px #4E4E4E'
    }
}
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