import React, { useContext, useRef, useState } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKeditor from '@ckeditor/ckeditor5-react';
import Store from '../Store/Store';
import {put, post} from 'axios';
import parse from  'html-react-parser';
import styled from 'styled-components';
import { replaceInputValueRestirctedCharacter } from '../Util/Util';

function AddBoardForm({id,title,description}) {
    const {globalState, globalStateDispatch} = useContext(Store);
    const [data, setData] = useState();
    const [titleRef, thumbnailRef, imageRef] = [useRef(),useRef(),useRef(),useRef()];
    const handleCKeditorState = (event, editor) => {
        const _data = editor.getData();
        setData(_data);
    }
    let setMain = '';
    let payload = {...globalState}

    const onSubmit = (e) => {
        e.preventDefault();
        if(globalState.main==='addEvent'){
            setMain = 'event';
            payload.main=setMain;
            const formData = new FormData();
            const config = { headers: { 'content-type': 'multipart/form-data' } }
            
            formData.append('thumbnail', thumbnailRef.current.files[0]);
            formData.append('image', imageRef.current.files[0]);

            return put('/event/uploadfile', formData, config).then(res => {

                const folderName = 'https://crowdincreative.s3.ap-northeast-2.amazonaws.com/' + res.data.folderName;
                const image = `${folderName}/${res.data.image}`
                const thumbnail = `${folderName}/${res.data.thumbnail}`

                //DB에 저장할 data형태로 만들기.
                const sendContent = {
                    image,
                    thumbnail,
                    title: replaceInputValueRestirctedCharacter(titleRef.current.value),
                    description: replaceInputValueRestirctedCharacter(data)
                }
                
                if(id){ // 기존 글 수정
                    post(`/event/update/${id}`, sendContent)
                    .then((res) => {
                        globalStateDispatch({type:'GLOBAL', payload})
                    }).catch((err) => console.log(err));
                }else{ // 신규 글 작성
                    put('/event/add', sendContent)
                    .then((res) => {
                        globalStateDispatch({type:'GLOBAL', payload})
                    }).catch((err) => console.log(err));
                }
                
            });
        } else {
            let url = '';
            if(globalState.main==='addNotice') {
                setMain = 'notice';
                url='/notice/add'
            }
            if(globalState.main==='addCenter') {
                setMain = 'center';
                url='/service_center/add'
            }
            payload.main=setMain;

            const sendContent = {
                title: titleRef.current.value,
                description: data
            }
            if(id){ // 기존 글 수정
                if(globalState.main==='addNotice') url=`/notice/update/${id}`
                if(globalState.main==='addCenter') url=`/service_center/update/${id}`
                
                return post(url, sendContent)
                    .then((res) => {
                        globalStateDispatch({type:'GLOBAL', payload})
                    }).catch((err) => console.log(err));
            }else{ // 신규 글 작성
                return put(url, sendContent)
                    .then((res) => {
                        globalStateDispatch({type:'GLOBAL', payload})
                    }).catch((err) => console.log(err));
            }
        }
    }
    const viewPath = (e) => {
        if(e.target.id==='thumbnail')
            document.getElementById('thumbnailPath').value = e.target.value;
        else
            document.getElementById('contentImagePath').value = e.target.value;
    }
    return (
        <Container onSubmit={e => onSubmit(e)}>
            <Input type="text" ref={titleRef} defaultValue={title} placeholder='제목을 입력해 주세요.'/>
            <Btn type="submit" value="등록" />
            {globalState.main!=='addEvent'?''
            :<>
                <LabelContainer onChange={(e)=>viewPath(e)}>
                    <Label for='thumbnail' >썸네일 추가
                        <InputFile id='thumbnail' type="file" ref={thumbnailRef} />
                    </Label>
                </LabelContainer>
                <Path margin='0 50px 10px 5px' id='thumbnailPath' type='text' defaultValue={id?'! 수정시 이미지를 새로 넣어야합니다.':''} readOnly/>
                <LabelContainer onChange={(e)=>viewPath(e)}>
                    <Label for='contentImage' >이미지 추가</Label>
                    <InputFile id='contentImage' type="file" ref={imageRef}/>
                </LabelContainer>
                <Path margin='0 0 10px 5px' id='contentImagePath' type='text' defaultValue={id?'! 수정시 이미지를 새로 넣어야합니다.':''} readOnly/>
            </>}
            <SubContainer margin = {globalState.main==='addEvent'?'':'-30px 0 0 0'}>
                <CKeditor
                    editor={ClassicEditor} onInit={() => { }}
                    onChange={(event, editor) => {
                        handleCKeditorState(event, editor); // console.log(editor.sourceElement.parentNode.id)
                    }}
                    data={description}
                    config={{
                        toolbar: [
                            "heading", "|", "bold", "italic", "link", "bulletedList",
                            "numberedList", "|", "indent", "outdent", "|", // "imageUpload"
                            "blockQuote", "insertTable", "mediaEmbed", "undo", "redo"
                        ],
                        placeholder: "글을 작성해 주세요."
                    }}
                />
            </SubContainer>
        </Container>
    );
}

export default AddBoardForm;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Container = styled.form`
`
const Input = styled.input`
    width: 1000px;
    height: 40px;
    margin: 10px 0;
    text-indent: 15px;
    border: 1px solid #E0E0E0;
    border-radius: 5px;
`
const InputFile = styled(Input)`
    display: none;
`
const Btn = styled.input`
    position: relative;
    bottom: 105px;
    float: right;
    width: 50px;
    height: 30px;
    line-height: 30px;
    font-size: 15px;
    text-shadow: 1px 1px 3px grey;
    box-shadow: 1px 1px 5px #BDBDBD;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: white;
    background-color: #87d37c;
`
const LabelContainer = styled.span`
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
    background-color: #87d37c;
`
const Label = styled.label`
    font-size: 15px;
`
const Path = styled.input`
    color: red;
    font-weight: bold;
    float: left;
    width: 300px;
    height: 25px;
    line-heigt: 25px;
    margin: ${({margin})=>`${margin}`};
    border: none;
    border-radius: 5px;
    text-indent: 10px;
`
const SubContainer = styled.div`
    float: left;
    width: 100%;
    margin: ${({margin})=>`${margin}`};

    .ck-editor__editable {
        
        height: 592px;
    }
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////