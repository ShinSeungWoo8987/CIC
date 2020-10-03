import React, { useRef, useState } from 'react';
import { post } from 'axios'

function App(props) {
  const [files, setFiles] = useState([]);
  const imagesRef = useRef();
  
  // Upload to server
  const onSubmit = (e)=>{
    e.preventDefault();
    setFiles([]);
    imagesRef.current.value = '';

    const url = '/upload'
    const formData = new FormData()
    const config={ headers:{ 'content-type':'multipart/form-data' } }

    for(var i=0; i<files.length;i++){
      formData.append('file'+i, files[i].file);
    }

    return post(url, formData, config)
  }

  // Image preview
  const handleFileOnChange = (e) => {
    e.preventDefault();
    var newFileList = [];
    const uploadedFile = e.target.files;
    for (var i = 0; i < uploadedFile.length; i++) {
      let reader = new FileReader();
      let file = uploadedFile[i];
      reader.onloadend = () => {
        newFileList.push({
          file: file,
          previewURL: reader.result
        })
      }
      reader.readAsDataURL(file);

      if (i === uploadedFile.length - 1) {
        setTimeout(() => setFiles(newFileList), 1000);
      }
    }
  }
  return (
    <div>
      <form onSubmit={e=>onSubmit(e)}>
        <input type='file'
          accept='image/jpg,impge/png,image/jpeg,image/gif'
          name='profile_img'
          onChange={handleFileOnChange}
          ref={imagesRef}
          multiple
        />
        <button type="submit">Upload</button>
      </form>
      {files.map(file => <img src={file.previewURL} width='100px' alt='profile_preview' />)}
    </div>
  );
}

export default App;