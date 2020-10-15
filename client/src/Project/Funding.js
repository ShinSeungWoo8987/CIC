import React, {useContext, useState} from 'react';
import Styled from 'styled-components'; // Styled-components 라이브러리를 사용하기 위해 선언
import Modal from 'react-modal';
import Store from '../Store/Store';
import DaumPostcode from 'react-daum-postcode';
import ProgressBar from 'react-percent-bar'
import Util from '../Util/Util.js';

Modal.setAppElement('#root') // Modal 태그 내부에 onRequestClose 같은 속성을 사용하기 위해 선언

function Funding() {
    const { session, setLoginModalDispatch } = useContext(Store);
    const [fundingModalState, setFundingModalState] = useState(false);
    const targetMoney = 1000000;
    const saveMoney = 500000;
    // 퍼센트 부분 나중에 메소드로 처리할 것 - 퍼센트가 100퍼센트를 넘어가는 경우 퍼센트바 또한 초과되어 해결해줄 필요가 있음
    const percent = ((saveMoney/targetMoney)*100);
    const dDay = 30;
    const progress = <ProgressBar width='250px' height='10px' fillColor='lime' percent={percent}/>;
    const [postcodeModalState, setPostcodeModalState] = useState(false);
    const [postcode, setPostcode] = useState(''); 
    const [address1, setAddress1] = useState('');
    const saveMoneyStr = Util.moneyFormat(saveMoney);
    const fundingCnt = Util.moneyFormat(1000);
    // When Login & Non-Login, Modal Setting
    const openModal = (e) => {
        e.preventDefault();
        if( session.state) { //로그인상태
            setFundingModalState(true);    
        }else{ //로그아웃상태
            setLoginModalDispatch({type: "CHANGE_MODALSTATE", payload:true})
        }
    }
    // Postcode Modal Setting
    const changePostcodeModalState = (e) => {
        e.preventDefault();
        setPostcodeModalState(true);
    };
    // Postcode & Address Value Setting
    const handleComplete = (data) => {
        setPostcode(data.zonecode);
        setAddress1(data.address);
        setPostcodeModalState(false);
    };
    // Funding Submit
    const onFundingSubmit = (e) => {
        e.preventDefault();
        console.log("펀딩 테스트");
        console.log(e.target.name.value);
    }      
    return (
        <Container>
            <LinkModal  onClick={(e)=>openModal(e)}>펀딩하기</LinkModal>
            <Modal 
                isOpen= { fundingModalState }
                style={ FundingModalStyle }
                onRequestClose={(e) => setFundingModalState(false)}
                // shouldCloseOnOverlayClick={false} // 화면 밖 클릭 시 종료되는 기능 제거
            >
                <Form onSubmit={(e)=>onFundingSubmit(e)}>
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
                        <SubTitle>배송지 정보</SubTitle><br/>
                        <InputText id='name' type='text' placeholder="이름" required/>
                        <InputText id='phone' type='tel' placeholder="010 - 0000 - 0000" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" /><br/>
                        <InputPostcode id='postcode' name="postcode" type="text" placeholder="우편번호" value={postcode} required readOnly/>
                        <BtnPostcode type='submit' value='우편번호 검색' onClick={(e)=>changePostcodeModalState(e)}/><br/>
                        <InputText id="address1" type="text" placeholder="도로명 주소" value={address1} required readOnly/><br/>
                        <InputText id="address2" type="text" placeholder="상세 주소" /><br/>
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