import React, { useContext } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKeditor from '@ckeditor/ckeditor5-react';
import Store from '../Store/Store';

function TextEditor({id, _content}) {
    const { globalState, content, contentDispatch} = useContext(Store);
    const handleCKeditorState = (event, editor) => {
        const data = editor.getData();
        var newContent = content;
        newContent[id].content = data;
        contentDispatch( {type: 'CHANGE', payload: newContent } );
    }
    return (
        <div id={id}>
            <br/>
            <CKeditor
                editor={ClassicEditor} onInit={() => { }}
                onChange={(event, editor) => {
                    handleCKeditorState(event, editor); // console.log(editor.sourceElement.parentNode.id)
                }}
                data={_content?_content:'<p></p>'}
                config={{
                    toolbar: [
                        "heading", "|", "bold", "italic", "link", "bulletedList",
                        "numberedList", "|", "indent", "outdent", "|", // "imageUpload"
                        "blockQuote", "insertTable", "mediaEmbed", "undo", "redo"
                    ],
                    placeholder: "글을 작성해 주세요."
                }}
            />
        </div>
    );
}

export default TextEditor;