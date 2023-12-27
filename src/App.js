import { useEffect, useRef, useState } from 'react';
import { PDFDocument } from 'pdf-lib';
// import PDFDisplay from './PDFDisplay';
// import PDFViewer from './PDFViewer';
// import { Document, Page } from '@react-pdf/renderer';
// import PDFPreview from './PDFPreview';
// import PDFViewer from 'pdf-viewer-reactjs'

// const PDFPreview = ({ pdfUrl }) => {
//   return (
//     <div>
//       <Document file={pdfUrl}>
//         <Page pageNumber={1} />
//       </Document>
//     </div>
//   );
// }

const App = () => {
	const iframeRef = useRef(null)
  const [pdfDoc, setPdfDoc] = useState(null);
	const [pdfSource, setPdfSource] = useState(null);
	const [pdfUrl, setPdfUrl] = useState(null);

  // get file from file input
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
		// setPdfSource(file);
    const reader = new FileReader();
    reader.onload = async (e) => {
			// setPdfSource(e.target.result);
      const pdfBytes = new Uint8Array(e.target.result);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      // Now you can work with the loaded PDF document
      setPdfDoc(pdfDoc);
    };
		// reader.readAsDataURL(file);
    reader.readAsArrayBuffer(file);
  };


	const fillForm = async () => {
		// Step 1: Load the PDF file from url.
		// const formUrl = 'https://pdf-lib.js.org/assets/dod_character.pdf';
		// const formPdfBytes = await fetch(formUrl).then((res) =>
		// 	res.arrayBuffer(),
		// );
		// const pdfDoc = await PDFDocument.load(formPdfBytes);

		// Step 2: Retrieve the form fields.

    // get field names
		const form = pdfDoc?.getForm();
    const fields = form.getFields();
    fields.forEach(field => {
      const type = field.constructor.name
      const name = field.getName()
      // console.log(`${type}: ${name}`)
    });

		try {
			const nameField = form.getTextField('CharacterName 2');
			nameField.setText('Mario222');
			form.flatten();
			// console.log(nameField);
			// console.log("success");
		} catch(e) {
			// console.log('error : ', e);
		}
		
		// const ageField = form.getTextField('Age');
		// const heightField = form.getTextField('Height');
		// const weightField = form.getTextField('Weight');
		// const eyesField = form.getTextField('Eyes');
		// const skinField = form.getTextField('Skin');
		// const hairField = form.getTextField('Hair');

		// // Step 3: Set values for the form fields.
		// ageField.setText('24 years');
		// heightField.setText(`5' 1"`);
		// weightField.setText('196 lbs');
		// eyesField.setText('blue');
		// skinField.setText('white');
		// hairField.setText('brown');

		// Step 4: Save the modified PDF.
		const pdfBytes = await pdfDoc.save();

		// Step 5: Create a `Blob` from the PDF bytes,
		const blob = new Blob([pdfBytes], { type: 'application/pdf' });

		// Step 6: Create a download URL for the `Blob`.
		const url = URL.createObjectURL(blob);
		setPdfUrl(url);

		// // Step 7: Create a link element and simulate a click event to trigger the download.
		// const link = document.createElement('a');
		// link.href = url;
		// link.download = 'test_result.pdf';
		// link.click();
	};


	return (
		<div>
			<h1>PDF Form Filler</h1>
      <div>
        <input type="file" onChange={handleFileChange} />
      </div>
			<div>
				{pdfUrl && (
					// <PDFDisplay pdfUrl={pdfUrl} />
					// <PDFViewer pdfUrl={pdfUrl} />
					// <PDFPreview pdfSource={pdfUrl} />
					// <iframe
					// 	ref={iframeRef}
					// 	key={1}
					// 	title="PDF Viewer"
					// 	src={pdfUrl + '#toolbar=0&navpanes=0'}
					// 	width="100%"
					// 	height="700px"
					// 	className="mb-8"
					// />
					<object width='100%' height={'400'} data={pdfUrl} type='application/pdf'/>
				)}
			</div>
			<div>
				<button onClick={fillForm}>Fill Form</button>
			</div>
		</div>
	);
};

export default App;