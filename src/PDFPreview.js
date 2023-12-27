import React from 'react';
import { Document, Page, PDFViewer } from '@react-pdf/renderer';

const PDFPreview = ({ pdfSource }) => {
  console.log(pdfSource);
  if (!pdfSource) {
    return;
  }
  return (
    <PDFViewer width="600" height="800">
      <Document file={pdfSource}>
        <Page pageNumber={1} />
      </Document>
    </PDFViewer>
  );
};

export default PDFPreview;