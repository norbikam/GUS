// app/components/PdfViewer.tsx
'use client';

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// ✅ Użyj odpowiedniej wersji workera
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  pdfUrl: string;
}

export default function PdfViewer({ pdfUrl }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [error, setError] = useState<string>('');

  if (!pdfUrl) return null;

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setError('');
    console.log('✅ PDF loaded successfully:', numPages, 'pages');
  }

  function onDocumentLoadError(error: Error): void {
    console.error('❌ PDF load error:', error);
    setError(error.message);
  }

  return (
    <div 
      className="w-full bg-white"
      ref={(ref) => {
        if (ref && containerWidth === 0) {
          setContainerWidth(ref.offsetWidth);
        }
      }}
    >
      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        loading={
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-500">Ładowanie PDF...</div>
          </div>
        }
        error={
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <div className="text-red-500">Błąd ładowania PDF</div>
            {error && <div className="text-sm text-gray-600 max-w-md text-center">{error}</div>}
            <a 
              href={pdfUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              Spróbuj otworzyć PDF bezpośrednio
            </a>
          </div>
        }
      >
        <div className="flex flex-col items-center gap-4 py-4">
          {Array.from(new Array(numPages), (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={containerWidth || undefined}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="shadow-sm"
            />
          ))}
        </div>
      </Document>
    </div>
  );
}