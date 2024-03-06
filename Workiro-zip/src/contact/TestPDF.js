import React from 'react';
import FileViewer from 'react-file-viewer';

function TestPDF() {
  return (
    <div>
      <h1>PDF Viewer</h1>
      <FileViewer filePath="https://pdfobject.com/pdf/sample.pdf" fileType="pdf"/>
    </div>
  );
}

export default TestPDF;

