import React, { useContext, useRef, useState } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKeditor from '@ckeditor/ckeditor5-react';
import Store from '../Store/Store';
import {put, post} from 'axios';
import parse from  'html-react-parser';

function AddBoardForm({id,title,description}) {
    const {globalState, globalStateDispatch} = useContext(Store);
    const [data, setData] = useState();
    const [_content, set_Content] = useState();
    const [titleRef, thumbnailRef, imageRef] = [useRef(),useRef(),useRef(),useRef()];
    const handleCKeditorState = (event, editor) => {
        const _data = editor.getData();
        console.log(_data);
        setData(_data);
        set_Content(parse (_data));
    }
    let setMain = '';
    let payload = {}

    const onSubmit = (e) => {
        e.preventDefault();
        if(globalState.main==='addEvent'){
            setMain = 'event';
            payload = Object.assign(globalState, {main:setMain})
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
                    title: titleRef.current.value,
                    description: data
                }
                
                if(id){ // 기존 글 수정
                    post(`/event/update/${id}`, sendContent)
                    .then((res) => {
                        console.log(payload);
                        console.log(res);
                        globalStateDispatch({type:'GLOBAL', payload})
                    }).catch((err) => console.log(err));
                }else{ // 신규 글 작성
                    put('/event/add', sendContent)
                    .then((res) => {
                        console.log(payload);
                        console.log(res);
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
            payload = Object.assign(globalState, {main:setMain})
            const sendContent = {
                title: titleRef.current.value,
                description: data
            }
            if(id){ // 기존 글 수정
                if(globalState.main==='addNotice') url=`/notice/update/${id}`
                if(globalState.main==='addCenter') url=`/service_center/update/${id}`
                
                return post(url, sendContent)
                    .then((res) => {
                        console.log(res);
                        globalStateDispatch({type:'GLOBAL', payload})
                    }).catch((err) => console.log(err));
            }else{ // 신규 글 작성
                return put(url, sendContent)
                    .then((res) => {
                        console.log(res);
                        globalStateDispatch({type:'GLOBAL', payload})
                    }).catch((err) => console.log(err));
            }
        }
    }

    return (
        <form onSubmit={e => onSubmit(e)}>
            제목 : <br/>
            <input type="text" ref={titleRef} defaultValue={title}/>
            {globalState.main!=='addEvent'?''
            :<>
                <br/>썸네일 : <br/>
                <input type="file" ref={thumbnailRef}/>
                <br/>이미지 : <br/>
                <input type="file" ref={imageRef}/>
            </>}
            <br/>내용 : <br/>
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
            <button type="submit">Upload</button>
            {_content}
        </form>
    );
}

export default AddBoardForm;