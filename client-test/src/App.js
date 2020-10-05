import React, { useContext } from 'react';
import UploadImage from './UploadImage';
import TextEditor from './TextEditor';
import { post } from 'axios'
import Store from './store/store';

function App(props) {
  const { content, contentDispatch} = useContext(Store);
  
  const addContent = ()=>{
    var newContent = content.concat([{
      id : content.length,
      head : content.length%2===0 ? 'text':'image',
      content : content.length%2===0 ? '':[]
    }]);
    contentDispatch({type: 'CHANGE', payload: newContent});
  }
  
  // Upload to server
  const onSubmit = (e)=>{
    e.preventDefault();
    contentDispatch({type: 'CHANGE', payload: [{id:0, head:'text', content:''}]  })

    const url = '/upload'
    const formData = new FormData()
    const config={ headers:{ 'content-type':'multipart/form-data' } }

    const imageContent = content.filter(i => i.head === 'image');

    var cnt=0;
    imageContent.map( (u)=>{
      u.content.map(f=>formData.append('file'+cnt++, f.file));
    });
    return post(url, formData, config)
  }

  const makeAddContent = content.map(i=> i.head==='text'?
    <TextEditor key={i.id} id={i.id} /> : <UploadImage key={i.id} id={i.id} />
  );

  return (
    <>
      <form onSubmit={e=>onSubmit(e)}>
        {makeAddContent}
        <button type="submit">Upload</button>
      </form>
      <button onClick={()=>addContent()}>+</button>
    </>
  );
}

export default App;