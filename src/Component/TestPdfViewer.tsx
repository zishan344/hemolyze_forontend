import { useState } from "react";
import jsPDF from "jspdf";

function TestPdfViewer() {
  const [pdfUrl, setPdfUrl] = useState("");

  const generatePdf = () => {
    const doc = new jsPDF();
    doc.text("Hello World!", 10, 10);
    const blob = doc.output("blob");
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Test PDF Viewer</h1>
      <button
        onClick={generatePdf}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        Generate Test PDF
      </button>

      {pdfUrl && (
        <div className="border p-2">
          <iframe
            src={pdfUrl}
            className="w-full h-[600px]"
            title="PDF Viewer"></iframe>
        </div>
      )}
    </div>
  );
}

export default TestPdfViewer;
