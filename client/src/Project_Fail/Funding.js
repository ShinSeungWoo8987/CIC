import React, {useContext, useState} from 'react';
import Styled from 'styled-components'; // Styled-components 라이브러리를 사용하기 위해 선언
import Modal from 'react-modal';
import Store from '../Store/Store';
import ProgressBar from 'react-bootstrap/ProgressBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import DefaultAddress from './DefaultAddress';
import NewAddress from './NewAddress';

Modal.setAppElement('#root') // Modal 태그 내부에 onRequestClose 같은 속성을 사용하기 위해 선언

function Funding() {
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
    let progress = <Progress animated min={0} max={targetMoney} now={saveMoney} label={percent+'%'}/>;
    // Login & Non-Login Setting
    const login =   <Modal 
                        isOpen={ fundingModalState }
                        style={ FundingModalStyle }
                        onRequestClose={(e) => closeFundingModal()}
                        // shouldCloseOnOverlayClick={false} // 화면 밖 클릭 시 종료되는 기능 제거
                    >
                    </Modal>
    const nonLogin = <Modal 
                        isOpen={ fundingModalState }
                        style={ MessageModalStyle }
                        onRequestClose={(e) => closeFundingModal()}
                        // shouldCloseOnOverlayClick={false} // 화면 밖 클릭 시 종료되는 기능 제거
                    >
                    </Modal>
    let modal = '';
    if(session.state === false){
        modal = login;
    }else{
        modal = nonLogin;
    }
    // Select Delivery Address
    const { selectAddressState } = useContext(Store);
    const [ deliveryAddressView, setDeliveryAddressView ] = useState( NewAddress );
    // if(selectAddressState.state === 'default'){
    //     setDeliveryAddressView( DefaultAddress );
    // }
    // else{
    //     setDeliveryAddressView( NewAddress );
    // }
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
                            {deliveryAddressView}
                        </DeliveryAddressContainer>
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
const Progress = Styled(ProgressBar)`
    position: relative;
    top: -6px;
    width: 245px;
    height: 12.5px;
`
const DeliveryAddressContainer = Styled(CurrentStateContainer)`
    text-align: left;
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
        width: '55%',
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////