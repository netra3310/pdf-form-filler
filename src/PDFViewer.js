import React, { useEffect } from 'react';
import pdfjs from 'pdfjs-dist';

const PDFViewer = ({ pdfUrl }) => {
  useEffect(() => {
    const viewerContainer = document.getElementById('viewerContainer');
    const loadingTask = pdfjs.getDocument(pdfUrl);

    loadingTask.promise.then((pdfDocument) => {
      pdfDocument.getPage(1).then((page) => {
        const scale = 1.5;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        viewerContainer.appendChild(canvas);

        page.render({
          canvasContext: context,
          viewport,
        });
      });
    });
  }, [pdfUrl]);

  return <div id="viewerContainer"></div>;
}

export default PDFViewer;
