import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

const PDFPreview = ({ pdfSource }) => {
  console.log(pdfSource);
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
  if (!pdfSource) {
    return;
  }
  return (
      <Document file={pdfSource}>
        <Page pageNumber={1} />
      </Document>
  );
};

export default PDFPreview;