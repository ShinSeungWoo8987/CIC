import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Store from '../Store/Store';

function SetInformation(props) {
    const { globalState, info, infoDispatch, pageDispatch } = useContext(Store);
    const [thumbnailChanged, setThumbnailChanged] = useState(false);
    const [logoChanged, setLogoChanged] = useState(false);
    const [newInfo, setNewInfo] = useState(info);
    useEffect(() => {
        setNewInfo(info);
    }, [info]);
    const onSubmit = (e) => {
        console.log(newInfo)
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
            <form onSubmit={(e) => onSubmit(e)}>
                프로젝트 제목: <input type="text" name="project_name" value={newInfo.project_name} onChange={e => onValueChange(e)} /> <br />
                
                카테고리 선택:
                <label><input type="radio" name="category" value="0" onChange={e => onValueChange(e)} checked={newInfo.category==='0'?true:false} />테크·가전</label>
                <label><input type="radio" name="category" value="1" onChange={e => onValueChange(e)} checked={newInfo.category==='1'?true:false}/>패션·뷰티</label>
                <label><input type="radio" name="category" value="2" onChange={e => onValueChange(e)} checked={newInfo.category==='2'?true:false}/>여행·레져</label>
                <br />
                목표금액: <input type="text" name="target_money" value={newInfo.target_money} onChange={e => onValueChange(e)} /> <br />
                
                펀딩가격: <input type="text" name="funding_price" value={newInfo.funding_price} onChange={e => onValueChange(e)} /> <br />
                
                프로젝트 기간설정: <input type="date" name="sdate" value={newInfo.sdate} onChange={e => onValueChange(e)} /> - <input type="date" name="fdate" value={newInfo.fdate} onChange={e => onValueChange(e)} /> <br />
                
                썸네일 이미지: <input type="file" name="thumbnail" onChange={e => onFileChange(e)} /> <br />
                {newInfo.thumbnail && !thumbnailChanged?<><img src={newInfo.thumbnail} width='300px'/><br/></>:''}

                로고 이미지: <input type="file" name="logo" onChange={e => onFileChange(e)} /> <br />
                {newInfo.logo && !logoChanged?<><img src={newInfo.logo} width='100px'/><br/></>:''}
                
                이메일: <input type="text" name="email" value={newInfo.email} onChange={e => onValueChange(e)} />
                <br /><br /><br />
                <br />
                <button type='submit'>다음</button>
            </form>
        </>
    );
}

export default SetInformation;
const P = styled.p`
color:red;
font-size: 8px;
`