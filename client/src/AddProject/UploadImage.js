import React, { useContext, useRef, useState } from 'react';
import Store from '../Store/Store';
import parse from 'html-react-parser';
import styled from 'styled-components';

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
          width: 800
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

  const viewPath = (e) => {
    if(e.target.id==='thumbnail'){
        document.getElementById('thumbnailPath').value = e.target.value;
    }else{
        document.getElementById('logoPath').value = e.target.value;
    }
  }

  return (
    <div id={id}>
      <br />
      <input type='file' accept='image/jpg,image/jpeg' name='profile_img'
        onChange={handleFileOnChange} ref={imagesRef} multiple />
      <CheckFileBtn onClick={(e) => refresh(e)}>이미지 확인</CheckFileBtn>
      <br />
      {globalState.sub === 'editProject' && typeof (content[id].content) === 'string' ?
        parse(content[id].content) :
        content[id].content.map((file, idx) => <div key={idx} id={idx}>
          <img src={file.previewURL} width={file.width} alt='profile_preview' />
          <br />
          <input type='text' placeholder='넓이 조절' onChange={handleImageSize} defaultValue="800" />
          <button onClick={(e) => refresh(e)}>변경</button>
          <br />
        </div>)
      }
    </div>
  );
}

export default UploadImage;

const CheckFileBtn = styled.button`
    height: 25px;
    font-weight: bold;
    text-shadow: 1px 1px 3px grey;
    box-shadow: 1px 1px 5px #BDBDBD;
    border: none;
    border-radius: 5px;
    color: white;
    background-color: #95a5a6;
    cursor: pointer;

    &:hover {
        box-shadow: 2px 2px 5px #BDBDBD;
    }
`