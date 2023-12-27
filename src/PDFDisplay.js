import React from 'react';
import { Document, Page } from 'react-pdf';

const PDFDisplay = ({ pdfUrl }) => {
  return (
    <div>
      <Document file={pdfUrl}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
}

export default PDFDisplay;
