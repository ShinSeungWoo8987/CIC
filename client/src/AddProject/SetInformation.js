import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Store from '../Store/Store';
import Message from '../Components/Message';

function SetInformation({newInfo, setNewInfo, toWriteContent}) {
    const { modalStateDispatch, info, infoDispatch, pageDispatch, messageDispatch } = useContext(Store);
    const [thumbnailChanged, setThumbnailChanged] = useState(false);
    const [logoChanged, setLogoChanged] = useState(false);
    useEffect(() => {
        setNewInfo(info);
    }, [info]);
    const onValueChange = (e) => {
        const { name, value } = e.target;
        let _newInfo = { ...newInfo };
        _newInfo[`${name}`] = value;
        setNewInfo(_newInfo);

        console.log( value.split('-')[0], value.split('-')[1], value.split('-')[2] )
        // 날짜처리
        const date = new Date('2020-10-31');
        date.setDate(date.getDate() + 1);
        console.log(date)
    }
    const onFileChange = (e) => {
        const { name, files } = e.target;
        
        if(name==='thumbnail') setThumbnailChanged(!thumbnailChanged)
        else if(name==='logo') setLogoChanged(!logoChanged)

        if(files.length===0) return;
        else{
            let _newInfo = { ...newInfo };
            _newInfo[`${name}`] = files[0];
            setNewInfo(_newInfo);
        }
    }

    const viewPath = (e) => {
        if(e.target.id==='thumbnail'){
            document.getElementById('thumbnailPath').value = e.target.value;
        }else{
            document.getElementById('logoPath').value = e.target.value;
        }
    }

    return (
        <>
            <Form onSubmit={(e) => toWriteContent(e)}>
                <Info>
                    <Title>
                        프로젝트 제목<br/>
                        <LongInput type="text" name="project_name" value={newInfo.project_name} onChange={e => onValueChange(e)} placeholder='프로젝트명을 입력해주세요.' required/>
                    </Title>
                    
                    <Category>
                        카테고리 선택<br/>
                        <RadioDiv><RadioInput type="radio" name="category" value="0" onChange={e => onValueChange(e)} checked={newInfo.category==='0'?true:false} />테크·가전</RadioDiv>
                        <RadioDiv><RadioInput type="radio" name="category" value="1" onChange={e => onValueChange(e)} checked={newInfo.category==='1'?true:false}/>패션·뷰티</RadioDiv>
                        <RadioDiv><RadioInput type="radio" name="category" value="2" onChange={e => onValueChange(e)} checked={newInfo.category==='2'?true:false}/>여행·레져</RadioDiv>
                    </Category>
                    
                    <ProjectPeriod>
                        프로젝트 기간설정<br/>
                        <DateInput type="date" name="sdate" value={newInfo.sdate} onChange={e => onValueChange(e)} required/>
                        &nbsp;-&nbsp;
                        <DateInput type="date" id="fdate" name="fdate" value={newInfo.fdate} onChange={e => onValueChange(e)} required/>
                    </ProjectPeriod>

                    <TargetMoney>
                        목표금액<br/>
                        <ShortInput type="number" name="target_money" value={newInfo.target_money} onChange={e => onValueChange(e)} placeholder='아이템/서비스의 목표금액을 입력해주세요.' required/>&nbsp;원
                    </TargetMoney>
                    
                    <FundingPrice>
                        펀딩가격<br/>
                        <ShortInput type="number" name="funding_price" value={newInfo.funding_price} onChange={e => onValueChange(e)} placeholder='아이템/서비스의 펀딩가격을 입력해주세요.' required/>&nbsp;원
                    </FundingPrice>
                    
                    <Thumbnail>
                        썸네일 이미지<br/>
                        <LabelContainer  onChange={(e)=>viewPath(e)}>
                            <Label for='thumbnail'>이미지 선택
                                <InputFile type="file" id="thumbnail" name="thumbnail" onChange={e => onFileChange(e)} />
                            </Label>
                        </LabelContainer>
                        <Path id='thumbnailPath' type='text' readOnly/>
                        {newInfo.thumbnail && !thumbnailChanged?<><img src={newInfo.thumbnail} width='300px'/><br/></>:''}
                    </Thumbnail>
                    
                    <Logo>
                        로고 이미지<br/>
                        <LabelContainer onChange={(e)=>viewPath(e)}>
                            <Label for='logo' >이미지 선택
                                <InputFile type="file" id="logo" name="logo" onChange={e => onFileChange(e)} /> <br />
                            </Label>
                        </LabelContainer>
                        <Path id='logoPath' type='text' readOnly/>
                        {newInfo.logo && !logoChanged?<><img src={newInfo.logo} width='100px'/><br/></>:''}
                    </Logo>
                    
                    <Email>
                        이메일<br/>
                        <LongInput type="text" name="email" value={newInfo.email} onChange={e => onValueChange(e)} placeholder='펀딩문의를 위한 이메일을 입력해주세요.' required/>
                    </Email>
                    
                </Info>
                <Next>
                    <NextBtn type='submit'>다음</NextBtn>
                </Next>
            </Form>
            <Message/>
        </>
    );
}

export default SetInformation;

const Form = styled.form`
    padding-top: 130px;
    font-size: 18px;
`
const Info = styled.div`
    min-height: 590px;
`
const Left = styled.div`
float: left;
font-weight: bold;
`
const Title = styled(Left)`
margin-bottom: 40px;
margin-left: 3.7%;
`

const Category = styled(Left)`
margin-bottom: 40px;
margin-left: 3.7%;
width:46.3%;
`

const ProjectPeriod = styled(Left)`
margin-bottom: 40px;
margin-left: 43px;
width:46.3%-43px;
`

const TargetMoney = styled(Left)`
margin-left: 3.7%;
margin-bottom: 40px;
width:46.3%;
`

const FundingPrice = styled(Left)`
margin-bottom: 40px;
width:46.3%-43px;
margin-left: 43px;
`

const Thumbnail = styled(Left)`
margin-left: 3.7%;
margin-bottom: 40px;
width:46.3%;
`

const Logo = styled(Left)`
margin-bottom: 40px;

width:46.3%-43px;
margin-left: 43px;
`

const Email = styled(Left)`
margin-left: 3.7%;
margin-bottom: 40px;
width:100%;
`
const Next = styled(Left)`
width:100%;
text-align: center;
`

const NextBtn = styled.button`
    width: 300px;
    height: 50px;
    font-size: 20px;
    font-weight: bold;
    text-shadow: 1px 1px 3px grey;
    box-shadow: 1px 1px 5px #BDBDBD;
    border: none;
    border-radius: 5px;
    color: white;
    margin-top: 20px;
    background-color: #87d37c;
    cursor: pointer;

    &:hover {
        box-shadow: 2px 2px 5px #BDBDBD;
    }
`

const LongInput = styled.input`
    margin-top: 10px;
    width: 800px;
    height: 40px;
    font-size: 15px;
    border: 1px solid #E0E0E0;
    border-radius: 5px;
    color: #717171;
`
const ShortInput = styled.input`
    margin-top: 10px;
    width: 330px;
    height: 40px;
    font-size: 15px;
    border: 1px solid #E0E0E0;
    border-radius: 5px;
    color: #717171;
`
const RadioDiv = styled.div`
    float: left;
    width: 30%;
    font-weight: normal;
`
const RadioInput = styled.input`
    margin-top: 17px;
`
const DateInput = styled.input`
    margin-top: 10px;
    width: 165px;
    height: 25px;
`

const LabelContainer = styled.span`
    margin-top: 10px;
    float: left;
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    text-shadow: 1px 1px 3px grey;
    box-shadow: 1px 1px 5px #BDBDBD;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: white;
    background-color: #fdcb6e;
`

const Label = styled.label`
    cursor: pointer;
    font-size: 15px;
`

const InputFile = styled.input`
    margin-top: 10px;
    display: none;
    width: 1000px;
    height: 40px;
    margin: 10px 0;
    text-indent: 15px;
    border: 1px solid #E0E0E0;
    border-radius: 5px;
`
const Path = styled.input`
    width: 240px;
    margin: 10px 0 0 10px;
    font-weight: bold;
    float: left;
    height: 25px;
    line-heigt: 25px;
    border: none;
    border-radius: 5px;
`