import React, { useContext, useRef, useState } from 'react';
import Store from './store/store';

function UploadImage({id}) {
  const { content, contentDispatch } = useContext(Store);
  const [cnt, setCnt] = useState(0);
  const imagesRef = useRef();

  const handleImageSize = (e)=>{
    const parentId = e.target.parentNode.id
    console.log(parentId)
    let newContent = content;
    newContent[id].content[parentId].width = e.target.value
    contentDispatch({type: 'CHANGE', payload: newContent});
  }

  // Image preview
  const handleFileOnChange = (e) => {
    var newFileList = [];
    const uploadedFile = e.target.files;
    for (var i = 0; i < uploadedFile.length; i++) {
      let reader = new FileReader();
      let file = uploadedFile[i];
      reader.onloadend = () => {
        newFileList.push({
          file: file,
          previewURL: reader.result,
          width:300
        })
      }
      reader.readAsDataURL(file);

      if (i === uploadedFile.length - 1) {
        let newContent = content;
        newContent[id].content = newFileList;
        contentDispatch({type: 'CHANGE', payload: newContent});
      }
    }
  }

  const refresh = (e)=>{
    e.preventDefault();
    setCnt(cnt+1);
  }

  return (
    <div id={id}>
      <input type='file'
          accept='image/jpg,impge/png,image/jpeg,image/gif'
          name='profile_img'
          onChange={handleFileOnChange}
          ref={imagesRef}
          multiple
      />
      <button onClick={(e)=>refresh(e)}>새로고침</button>
      <br/>
      {content[id].content.map( (file,idx) => <div key={idx} id={idx}>
        <img src={file.previewURL} width={file.width} alt='profile_preview' />
        <br/>
        <input type='text' placeholder='넓이 조절' onChange={handleImageSize}/>
        <button onClick={(e)=>refresh(e)}>변경</button>
        <br/>
      </div>)}
    </div>
  );
}

export default UploadImage;