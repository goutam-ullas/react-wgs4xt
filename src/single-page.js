import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

//pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@2.4.456/build/pdf.worker.js`;
//pdfjs.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js';
export default function SinglePage(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  const { pdf, height } = props;

  return (
    <>
      <div style={{ display: "table-cell", verticalAlign: "middle" }}>
        <div style={{textAlign: "center", verticalAlign: "middle"}}>
          <div style={{ display: "inline-block" }}>
            <button
              className="button"
              disabled={pageNumber <= 1}
              onClick={previousPage}
            >
              <span>&#60;</span>
            </button>
          </div>
          <div style={{ display: "inline-block" }}>
            <p
              style={{
                fontSize: 16,
                fontFamily: "ballinger-mono"
              }}
            >
              {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
            </p>
          </div>
          <div style={{ display: "inline-block" }}>
            <button
              className="button"
              disabled={pageNumber >= numPages}
              onClick={nextPage}
            >
              <span>&#62;</span>
            </button>
          </div>
        </div>
        <div>
          <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} height={height} />
          </Document>
        </div>
      </div>
    </>
  );
}
