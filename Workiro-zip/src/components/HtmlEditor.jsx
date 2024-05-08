import HtmlEditor, {
    Toolbar,
    MediaResizing,
    ImageUpload,
    Item,
} from 'devextreme-react/html-editor';
import { useEffect, useRef, useState } from 'react';

import { Editor } from '@tinymce/tinymce-react';

const HtmlEditorDX =({templateDataMarkup,setTemplateDataMarkup,setEditorContentValue})=>{
   
//console.log("templateDataMarkup",templateDataMarkup)
    const [isMultiline, setIsMultiline] = useState(true);
    const [currentTab, setCurrentTab] = useState(null);
    const [editorContent, setEditorContent] = useState('');

    // Handler function to update the editor content
    const handleContentChange = (e) => {
        setEditorContent(e.value);
    };
    // const editorRef = useRef(null);
    // const editor = editorRef.current?.editor;
    // if (editor) {
    //   const contentHeight = editor.getContentHeight();
    //   editor.theme.resizeTo(null, contentHeight);
    // }
    useEffect(()=>{
        setTemplateDataMarkup(templateDataMarkup)
       
    },[templateDataMarkup])

   
  


  // Function to handle editor content changes
  const handleEditorChange = (content, editor) => {
    setEditorContent(content);
    setEditorContentValue(content);
  };

return(<>
  <Editor
        apiKey='o4y7u8xi67vf7efmqoitw2dd85wgsq7xoh7838djixgfddsl'
        initialValue={templateDataMarkup}
        
        init={{
            height: "240px",
            menubar: false,
            readonly: true,
            plugins: [
                'a11ychecker','advlist','advcode','advtable','autolink','checklist','export',
                'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks',
                'powerpaste','fullscreen','formatpainter','insertdatetime','media','table','help','wordcount','resize'
            ],
            toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' +
                'alignleft aligncenter alignright alignjustify | ' +
                'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            resize: true, // Enable resizing,
            
        }}
        onEditorChange={handleEditorChange}
        // onInit={(evt, editor) => {
        //     editorRef.current = editor;
        //   }}
    />
  
    
{/* <HtmlEditor height="600px" defaultValue={templateDataMarkup} onValueChanged={handleContentChange}>
<MediaResizing enabled={true} />
<ImageUpload tabs={currentTab} fileUploadMode="base64" />
<Toolbar multiline={isMultiline}>
    <Item name="undo" />
    <Item name="redo" />
    <Item name="separator" />
    <Item name="size" acceptedValues={sizeValues} options={fontSizeOptions} />
    <Item name="font" acceptedValues={fontValues} options={fontFamilyOptions} />
    <Item name="separator" />
    <Item name="bold" />
    <Item name="italic" />
    <Item name="strike" />
    <Item name="underline" />
    <Item name="separator" />
    <Item name="alignLeft" />
    <Item name="alignCenter" />
    <Item name="alignRight" />
    <Item name="alignJustify" />
    <Item name="separator" />
    <Item name="orderedList" />
    <Item name="bulletList" />
    <Item name="separator" />
    <Item name="header" acceptedValues={headerValues} options={headerOptions} />
    <Item name="separator" />
    <Item name="color" />
    <Item name="background" />
    <Item name="separator" />
    <Item name="link" />
    <Item name="image" />
    <Item name="separator" />
    <Item name="clear" />
    <Item name="codeBlock" />
    <Item name="blockquote" />
    <Item name="separator" />
    <Item name="insertTable" />
    <Item name="deleteTable" />
    <Item name="insertRowAbove" />
    <Item name="insertRowBelow" />
    <Item name="deleteRow" />
    <Item name="insertColumnLeft" />
    <Item name="insertColumnRight" />
    <Item name="deleteColumn" />
</Toolbar>
</HtmlEditor> */}
</>)
}
export default HtmlEditorDX;


const sizeValues = ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'];
const fontValues = [
    'Arial',
    'Courier New',
    'Georgia',
    'Impact',
    'Lucida Console',
    'Tahoma',
    'Times New Roman',
    'Verdana',
];
const headerValues = [false, 1, 2, 3, 4, 5];
const fontSizeOptions = {
    inputAttr: {
        'aria-label': 'Font size',
    },
};
const fontFamilyOptions = {
    inputAttr: {
        'aria-label': 'Font family',
    },
};
const headerOptions = {
    inputAttr: {
        'aria-label': 'Font family',
    },
};
