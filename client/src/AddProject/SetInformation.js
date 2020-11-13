import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Store from '../Store/Store';
import Message from '../Components/Message';

function SetInformation({newInfo, setNewInfo}) {
    const { modalStateDispatch, info, infoDispatch, pageDispatch, messageDispatch } = useContext(Store);
    const [thumbnailChanged, setThumbnailChanged] = useState(false);
    const [logoChanged, setLogoChanged] = useState(false);
    useEffect(() => {
        setNewInfo(info);
    }, [info]);
    const onSubmit = (e) => {
        e.preventDefault();
        if(newInfo.sdate>newInfo.fdate) {
            let payload={value:'잘못된 프로젝트 기간입니다.'}
            messageDispatch({type:"MESSAGE", payload});
            payload={message:true}
            modalStateDispatch({type:"CHANGE_MODALSTATE", payload});
            document.getElementById('fdate').focus();
            return false;
        }
        infoDispatch({ type: 'CHANGE_INFO', payload: newInfo })
        pageDispatch({ type: 'CHANGE_PAGE', payload: 'writeContent' });
    }
    const onValueChange = (e) => {
        const { name, value } = e.target;
        let _newInfo = { ...newInfo };
        _newInfo[`${name}`] = value;
        setNewInfo(_newInfo);
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
    return (
        <>
            <Form onSubmit={(e) => onSubmit(e)}>
                <Title>
                    프로젝트 제목<br/>
                    <input type="text" name="project_name" value={newInfo.project_name} onChange={e => onValueChange(e)} />
                </Title>
                
                <Category>
                    카테고리 선택<br/>
                    <label><input type="radio" name="category" value="0" onChange={e => onValueChange(e)} checked={newInfo.category==='0'?true:false} />테크·가전</label>
                    <label><input type="radio" name="category" value="1" onChange={e => onValueChange(e)} checked={newInfo.category==='1'?true:false}/>패션·뷰티</label>
                    <label><input type="radio" name="category" value="2" onChange={e => onValueChange(e)} checked={newInfo.category==='2'?true:false}/>여행·레져</label>
                </Category>
                
                <ProjectPeriod>
                    프로젝트 기간설정<br/>
                    <input type="date" name="sdate" value={newInfo.sdate} onChange={e => onValueChange(e)} /> - <input type="date" id="fdate" name="fdate" value={newInfo.fdate} onChange={e => onValueChange(e)} />
                </ProjectPeriod>

                <TargetMoney>
                    목표금액<br/>
                    <input type="text" name="target_money" value={newInfo.target_money} onChange={e => onValueChange(e)} />
                </TargetMoney>
                
                <FundingPrice>
                    펀딩가격<br/>
                    <input type="text" name="funding_price" value={newInfo.funding_price} onChange={e => onValueChange(e)} />
                </FundingPrice>
                
                <Thumbnail>
                    썸네일 이미지<br/>
                    <input type="file" name="thumbnail" onChange={e => onFileChange(e)} /> <br />
                    {newInfo.thumbnail && !thumbnailChanged?<><img src={newInfo.thumbnail} width='300px'/><br/></>:''}
                </Thumbnail>
                
                <Logo>
                    로고 이미지<br/>
                    <input type="file" name="logo" onChange={e => onFileChange(e)} /> <br />
                    {newInfo.logo && !logoChanged?<><img src={newInfo.logo} width='100px'/><br/></>:''}
                </Logo>
                
                <Email>
                    이메일<br/>
                    <input type="text" name="email" value={newInfo.email} onChange={e => onValueChange(e)} />
                </Email>
                <Next>
                    <button type='submit'>다음</button>
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
const Left = styled.div`
float: left;
`
const Title = styled(Left)`
width:100%;
`

const Category = styled(Left)`
width:50%;
`

const ProjectPeriod = styled(Left)`
width:50%;
`

const TargetMoney = styled(Left)`
width:50%;
`

const FundingPrice = styled(Left)`
width:50%;
`

const Thumbnail = styled(Left)`
width:50%;
`

const Logo = styled(Left)`
width:50%;
`

const Email = styled(Left)`
width:100%;
`
const Next = styled(Left)`
width:100%;
text-align: center;
`