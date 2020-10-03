import React from 'react';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKeditor from '@ckeditor/ckeditor5-react';

function TextEditor(props) {
    const handleCKeditorState = (event, editor) => {
        const data = editor.getData();
        console.log(data);
    }

    return (
        <>
            <br />
            CKeditor Test
            <br />
            <CKeditor
                editor={ClassicEditor}
                onInit={editor => {}}
                onChange={handleCKeditorState}
                config={{
                    toolbar:[
                        "heading", "|", "bold", "italic", "link","bulletedList",
                        "numberedList", "|", "indent", "outdent", "|", //"imageUpload"
                        "blockQuote", "insertTable", "mediaEmbed", "undo", "redo"
                    ],
                    placeholder: "글을 입력해보세요!"
                  }}
            />

            <br/>

            <CKeditor
                editor={ClassicEditor}
                onInit={editor => {}}
                onChange={handleCKeditorState}
                config={{
                    toolbar:[
                        "heading", "|", "bold", "italic", "link","bulletedList",
                        "numberedList", "|", "indent", "outdent", "|", //"imageUpload"
                        "blockQuote", "insertTable", "mediaEmbed", "undo", "redo"
                    ],
                    placeholder: "글을 입력해보세요!"
                  }}
            />
        </>
    );
}

export default TextEditor;


