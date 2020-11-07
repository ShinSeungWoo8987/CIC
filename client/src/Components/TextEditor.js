import React from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKeditor from '@ckeditor/ckeditor5-react';
import styled from 'styled-components';

function TextEditor({content, setContent}) {
    const handleCKeditorState = (event, editor) => {
        const data = editor.getData();
        setContent({
            title: content.title,
            description: data
        });
    }
    return (
        <Container>
            <br/>
            <CKeditor
                editor={ClassicEditor} onInit={() => { }}
                onBlur={(event, editor) => {
                    handleCKeditorState(event, editor);
                }}
                data={content.description}
                config={{
                    toolbar: [
                        "heading", "|", "bold", "italic", "link", "bulletedList",
                        "numberedList", "|", "indent", "outdent", "|",
                        "blockQuote", "insertTable", "mediaEmbed", "undo", "redo"
                    ],
                    placeholder: "글을 작성해 주세요.",
                }}
            />
        </Container>
    );
}

export default TextEditor;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Container = styled.div`
    margin: -20px 0 0 0px;

    .ck-editor__editable {
        height: 592px;
    }
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////