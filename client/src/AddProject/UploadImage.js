import React, { useContext, useRef, useState } from 'react';
import Store from '../Store/Store';
import parse from 'html-react-parser';

function UploadImage({ id }) {
  const { globalState, content, contentDispatch } = useContext(Store);
  const [cnt, setCnt] = useState(0);
  const imagesRef = useRef();

  const handleImageSize = (e) => {
    const parentId = e.target.parentNode.id;
    let newContent = content;
    newContent[id].content[parentId].width = e.target.value
    contentDispatch({ type: 'CHANGE', payload: newContent });
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
          width: 650
        })
      }
      reader.readAsDataURL(file);

      if (i === uploadedFile.length - 1) {
        let newContent = content;
        newContent[id].content = newFileList;
        contentDispatch({ type: 'CHANGE', payload: newContent });
      }
    }
  }

  const refresh = (e) => {
    e.preventDefault();
    setCnt(cnt + 1);
  }

  return (
    <div id={id}>
      <br />
      <input type='file'
        accept='image/jpg,image/jpeg'
        name='profile_img'
        onChange={handleFileOnChange}
        ref={imagesRef}
        multiple
      />
      <button onClick={(e) => refresh(e)}>이미지 확인</button>
      <br />
      {globalState.sub === 'editProject' && typeof (content[id].content) === 'string' ?
        parse(content[id].content) :
        content[id].content.map((file, idx) => <div key={idx} id={idx}>
          <img src={file.previewURL} width={file.width} alt='profile_preview' />
          <br />
          <input type='text' placeholder='넓이 조절' onChange={handleImageSize} defaultValue="650" />
          <button onClick={(e) => refresh(e)}>변경</button>
          <br />
        </div>)
      }
    </div>
  );
}

export default UploadImage;