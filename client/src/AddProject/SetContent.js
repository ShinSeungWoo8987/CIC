import React, { useContext } from 'react';
import UploadImage from './UploadImage';
import TextEditor from './TextEditor';
import { put, post } from 'axios'
import Store from '../Store/Store';
import styled from 'styled-components';

function SetContent(props) {
    const { globalState, info, infoDispatch, pageDispatch, content, contentDispatch, projectInformation } = useContext(Store);
    const addContent = (e) => {
        e.preventDefault();
        var newContent = content.concat([{
            id: content.length,
            head: content.length % 2 === 0 ? 'text' : 'image',
            content: content.length % 2 === 0 ? '' : []
        }]);
        contentDispatch({ type: 'CHANGE', payload: newContent });
    }
    // Upload to server
    const onSubmit = (e) => {
        e.preventDefault();
        
        if(globalState.main==='addProject'){ // 프로젝트 등록
            const url = '/upload'
            const formData = new FormData();
            const config = { headers: { 'content-type': 'multipart/form-data' } }

            const imageContent = content.filter(i => i.head === 'image');

            var cnt = 0;

            formData.append('thumbnail', info.thumbnail);
            formData.append('logo', info.logo);
            imageContent.map((u) => {
                u.content.map(f => formData.append('file' + cnt++, f.file));
            });
            return put(url, formData, config).then(({data}) => {
                const folderName = 'https://crowdincreative.s3.ap-northeast-2.amazonaws.com/' + data.folderName;
                const fileName = data.files;
                const thumbnail = `${folderName}/${data.thumbnail}`
                const logo = `${folderName}/${data.logo}`
                
                const _info = Object.assign(info, {thumbnail,logo});
                infoDispatch({type:'CHANGE_INFO', payload:_info});

                //DB에 저장할 data형태로 만들기.
                var cnt = 0;
                let sendContent = []
                for(var k=0; k<content.length; k++){
                    const {head} = content[k];
                    const _content = content[k].content
                    if(head === 'text') sendContent.push({id:sendContent.length,head,content:_content})
                    else for(var j=0; j<_content.length; j++){
                        const {width} = _content[j];
                        sendContent.push({id:sendContent.length, head, content:`<img src='${folderName}/${fileName[cnt++]}' width=${width} alt='content' />`})
                    }
                }

                // post data
                put('/project/add', {...info, sendContent})
                    .then((res) => {
                        window.location.href = '/';
                    }).catch((err2) => alert(err2));
            }).catch(err1=>alert(err1));
        }else{ // 프로젝트 수정
            const url = '/upload'
            const formData = new FormData();
            const config = { headers: { 'content-type': 'multipart/form-data' } }

            const imageContent = content.filter(i => i.head === 'image');

            var cnt = 0;

            if( typeof(info.thumbnail)!=='string' ) formData.append('thumbnail', info.thumbnail);
            if( typeof(info.logo)!=='string' ) formData.append('logo', info.logo);

            imageContent.map((u) => {
                if( typeof(u.content) !== 'string' ){ //수정된 파일만 업로드
                    u.content.map(f => formData.append('file' + cnt++, f.file));
                }
            });
            return put(url, formData, config).then(({data}) => {
                const folderName = 'https://crowdincreative.s3.ap-northeast-2.amazonaws.com/' + data.folderName;
                const fileName = data.files;

                const thumbnail = data.thumbnail===''?'':`${folderName}/${data.thumbnail}`
                const logo = data.logo===''?'':`${folderName}/${data.logo}`

                //DB에 저장할 data형태로 만들기.
                var cnt = 0;
                const sendContent = content.map((i,idx)=>{
                    if(i.head==='image' && typeof(i.content)!=='string' ){
                        i.content = i.content.map(f=>{
                            return `<img src='${folderName}/${data.files[cnt++]}' width=${f.width} alt='content' />`
                        })[0]
                    }
                    return i;
                });

                //info 수정
                let _info = {...info};
                if(thumbnail!=='') _info.thumbnail=thumbnail;
                if(logo!=='') _info.logo=logo;

                post('/project/update', {..._info, sendContent, project_num:`${projectInformation.number}`})
                    .then((res) => {
                        window.location.href = '/';
                    }).catch((err2) => console.log(err2));
            }).catch(err1=>alert(err1));
        }
    }
    return <Form onSubmit={e => onSubmit(e)}>
        <Content>
            {content.map(i => i.head === 'text' ?
                <TextEditor key={i.id} id={i.id} _content={i.content}/> : <UploadImage key={i.id} id={i.id} />
            )}
            <br/>
            <PlusBtn onClick={(e) => addContent(e)}>{content.length%2===0?'내용추가':'이미지추가'}</PlusBtn>
        </Content>
        
        <UploadBtn type="submit">프로젝트 등록하기</UploadBtn>
    </Form>
}

export default SetContent;

const Form = styled.form`
    padding-top: 120px;
    font-size: 18px;
    text-align: center;
`
const Content = styled.div`
    min-height: 600px;
`

const UploadBtn = styled.button`
    margin-top:20px;
    width: 300px;
    height: 50px;
    font-size: 20px;
    font-weight: bold;
    text-shadow: 1px 1px 3px grey;
    box-shadow: 1px 1px 5px #BDBDBD;
    border: none;
    border-radius: 5px;
    color: white;
    background-color: #87d37c;
    cursor: pointer;

    &:hover {
        box-shadow: 2px 2px 5px #BDBDBD;
    }
`

const PlusBtn = styled(UploadBtn)`
    font-size: 14px;
    width: 90px;
    height: 35px;
    margin-top: 20px;
    background-color: #fdcb6e;
`