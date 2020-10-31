import React, { useContext, useEffect, useState } from 'react';
import Styled from 'styled-components'; // Styled-components 라이브러리를 사용하기 위해 선언
import Modal from 'react-modal';
import Store from '../Store/Store';
import { get, put } from 'axios';
import PercentBar from '../Components/PercentBar'

Modal.setAppElement('#root') // Modal 태그 내부에 onRequestClose 같은 속성을 사용하기 위해 선언

function Funding() {
    const { session, addressValue, addressValueDispatch, modalState, modalStateDispatch, projectInformation } = useContext(Store);
    const [ userInformation, setUserInformation] = useState('');
    const dDayText = projectInformation.dDay==='마감'?'':'일';
    // Get User Information & Setting
    useEffect(() => {
        const url = '/member'
        get(url).then(res=>{
            const newAddressValue = {
                postcode: res.data[3],
                address1: res.data[4]
            }
            addressValueDispatch({type: 'CHANGE_ADDRESS', payload: newAddressValue})
            setUserInformation({
                id: res.data[0],
                name: res.data[1],
                phone: res.data[2],
                address2: res.data[5]
            })
        })
    }, [ session.token, modalState.funding, addressValueDispatch ]); // 2020-10-31 - addressValueDispatch 추가
    // Funding Modal Setting
    const closeModal = (e) => {
        const newAddressValue = {
            postcode: '',
            address1: ''
        }
        addressValueDispatch({type: 'CHANGE_ADDRESS', payload: newAddressValue});
        setUserInformation({
            id: '',
            name: '',
            phone: '',
            address2: ''
        })
        const newModalState = {
            funding: false
        }
        modalStateDispatch({type: 'CHANGE_MODALSTATE', payload: newModalState});
    }
    // Postcode Modal Setting
    const openPostcodeModal = (e) => {
        e.preventDefault();
        const newModalState = {
            login: modalState.login,
            postcode: true,
            updateUser: modalState.updateUser,
            deleteUser: modalState.deleteUser,
            funding: modalState.funding
        }
        modalStateDispatch({type:"CHANGE_MODALSTATE", payload: newModalState});
    };
    // Funding Submit
    const onFundingSubmit = (e) => {
        e.preventDefault();
        const url = '/funding'
        const data = {
            id: userInformation.id,
            name: e.target.name.value,
            phone: e.target.phone.value,
            postcode: `${addressValue.postcode}`,
            address1: addressValue.address1,
            address2: e.target.address2.value,
            description: e.target.supportMessage.value,
            number: `${projectInformation.number}`
        }
        put(url, data).then(res=>{
        })
        closeModal();
    }      
    return (
        <Container>
            <Modal 
                isOpen= { modalState.funding }
                style={ FundingModalStyle }
                onRequestClose={(e) => closeModal(e)}
                // shouldCloseOnOverlayClick={false} // 화면 밖 클릭 시 종료되는 기능 제거
            >
                <Form onSubmit={(e)=>onFundingSubmit(e)}>
                    <Title>{projectInformation.title}</Title>
                    <CurrentStateContainer>
                        <Text>모인금액</Text><br/>
                        <SubContainer>
                            <Value>{projectInformation.save}</Value><BottomText>원</BottomText><PercentText>{projectInformation.percent+'%'}</PercentText><br/><br/>
                            <PercentContainer>
                                <PercentBar width='250px' height='10px' borderColor='white' percent={projectInformation.percent}/>
                            </PercentContainer>
                        </SubContainer><br/>
                        <Text>펀딩금액</Text><br/>
                        <SubContainer>
                            <Value>{projectInformation.price}</Value><BottomText>원</BottomText>
                        </SubContainer>
                        <Text>참여인원</Text><br/>
                        <SubContainer>
                            <Value>{projectInformation.fundingCnt}</Value><BottomText>명</BottomText>
                        </SubContainer><br/>
                        <Text>남은기간</Text><br/>
                        <SubContainer>
                            <Value>{projectInformation.dDay}</Value><BottomText>{dDayText}</BottomText>
                        </SubContainer>
                    </CurrentStateContainer>
                    <DeliveryAddressContainer>
                        <SubTitle>배송지 정보</SubTitle><br/>
                        <InputText id='name' type='text' placeholder="이름" defaultValue={userInformation.name} required/>
                        <InputText id='phone' type='tel' placeholder="010 - 0000 - 0000" defaultValue={userInformation.phone} pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"/><br/>
                        <InputPostcode id='postcode' name="postcode" type="text" placeholder="우편번호" value={addressValue.postcode} required readOnly/>
                        <BtnPostcode type='submit' value='우편번호 검색' onClick={(e)=>openPostcodeModal(e)}/><br/>
                        <InputText id="address1" type="text" placeholder="도로명 주소" value={addressValue.address1} required readOnly/><br/>
                        <InputText id="address2" type="text" placeholder="상세 주소" defaultValue={userInformation.address2}/><br/>
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
    margin: 0 130px 0 0;
    color: #80C72D;
`
const Value = Styled(Left)`
    font-size: 30px;
    font-weight: bold;
    color: #80C72D;
`
const PercentContainer = Styled(Left)`
    width: 250px;
    height: 10px;
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
    margin: 10px -5px 0 0;
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
    margin: 30px 0 0 0;
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
        top: '14%',
        padding: '50px 125px',
        width: '40%',
        height: '625px',
        borderRadius: 10,
        boxShadow: '9px 9px 10px #4E4E4E'
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////