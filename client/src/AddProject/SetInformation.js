import React, { useContext, useState } from 'react';
import Store from '../Store/Store';

function SetInformation(props) {
    const { info, infoDispatch, pageDispatch } = useContext(Store);
    const [newInfo , setNewInfo] = useState(info);

    const onSubmit = (e) => {
        infoDispatch({ type: 'CHANGE_INFO', payload: newInfo })
        pageDispatch({ type: 'CHANGE_PAGE', payload: 'writeContent' });
    }
    const onValueChange = (e) => {
        const {name, value} = e.target
        let _newInfo = {...newInfo}
        _newInfo[`${name}`] = value;
        setNewInfo(_newInfo) 
    }
    const onFileChange = (e) => {
        
        const {name, files} = e.target
        let _newInfo = {...newInfo}
        _newInfo[`${name}`] = files[0];
        setNewInfo(_newInfo) 
    }

    return (
        <>
            <form onSubmit={(e) => onSubmit(e)}>
                프로젝트 제목: <input type="text" name="project_name" value={newInfo.project_name} onChange={e => onValueChange(e)} /> <br />
                카테고리 선택:
                <label><input type="radio" name="category" value="0" onChange={e => onValueChange(e)}/>테크·가전</label>
                <label><input type="radio" name="category" value="1" onChange={e => onValueChange(e)}/>패션·뷰티</label>
                <label><input type="radio" name="category" value="2" onChange={e => onValueChange(e)}/>여행·레져</label>
                <br/>
                목표금액: <input type="text" name="target_money" value={newInfo.target_money} onChange={e => onValueChange(e)} /> <br />
                프로젝트 기간설정: <input type="date" name="sdate" value={newInfo.sdate} onChange={e => onValueChange(e)} /> - <input type="date" name="fdate" value={newInfo.fdate} onChange={e => onValueChange(e)} /> <br />
                썸네일 이미지: <input type="file" name="thumbnail" onChange={e => onFileChange(e)} /> <br />
                로고 이미지: <input type="file" name="logo" onChange={e => onFileChange(e)} /> <br />
                프로젝트 요약 : <br/> <textarea name="subDescription" value={newInfo.subDescription} onChange={e => onValueChange(e)} />
                <br /><br /><br />
                <br />
                <button type='submit'>다음</button>
            </form>
        </>
    );
}

export default SetInformation;