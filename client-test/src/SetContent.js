import React, { useContext } from 'react';
import UploadImage from './UploadImage';
import TextEditor from './TextEditor';
import { put, post } from 'axios'
import Store from './store/store';
import  parse  from  'html-react-parser'

function SetContent(props) {
    const { info, infoDispatch, pageDispatch, content, contentDispatch } = useContext(Store);

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
        return put(url, formData, config).then(res => {
            const folderName = 'https://crowdincreative.s3.ap-northeast-2.amazonaws.com/' + res.data.folderName;
            const fileName = [res.data.fileName0, res.data.fileName1, res.data.fileName2, res.data.fileName3, res.data.fileName4];
            const thumbnail = `<img src='${folderName}/${res.data.thumbnail} alt='thumbnail' />`
            const logo = `<img src='${folderName}/${res.data.logo} alt='logo' />`
            
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
                    sendContent.push({id:sendContent.length, head, content:`<img src='${folderName}/${fileName[cnt++]} width=${width}' alt='content' />`})
                }
            }

            // post data
            put('/create_project', {...info, sendContent})
                .then((res) => {
                    console.log(res);
                }).catch((err) => console.log(err));
        });
    }
    let _content = []
    content.map( (i,idx)=>{
        if(idx%2===0){
            _content.push( parse (i.content) );
        }
    })
    return (
        <>
            <form onSubmit={e => onSubmit(e)}>
                {content.map(i => i.head === 'text' ?
                    <TextEditor key={i.id} id={i.id} _content={i.content}/> : <UploadImage key={i.id} id={i.id} />
                )}
                <br />
                <button onClick={(e) => addContent(e)}>+</button>
                <br /><br /><br />
                <button type="submit">Upload</button>
                <button onClick={() => pageDispatch({ type: 'CHANGE_PAGE', payload: 'writeInfo' })}>이전</button>
            </form>
            {_content}
        </>
    );
}

export default SetContent;


