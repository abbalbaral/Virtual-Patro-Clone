import { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronUp, ChevronDown, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

// Worker Config
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Karmakanda = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [pdfWidth, setPdfWidth] = useState(null);
  
  const containerRef = useRef(null);

  // 1. Auto-Calculate Width to Fit Container
  useEffect(() => {
    if (containerRef.current) {
      // Subtract padding (32px) to fit perfectly
      setPdfWidth(containerRef.current.offsetWidth - 32);
    }
    
    // Optional: Handle window resize to keep it responsive
    const handleResize = () => {
       if (containerRef.current) {
         setPdfWidth(containerRef.current.offsetWidth - 32);
       }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // 2. Change Page Handler (Scrolls to top)
  const changePage = (offset) => {
    setPageNumber(prev => {
      const newPage = Math.min(Math.max(1, prev + offset), numPages || 1);
      // Scroll container to top when page changes
      if (containerRef.current) containerRef.current.scrollTop = 0;
      return newPage;
    });
  };

  const changeZoom = (factor) => {
    setScale(prev => Math.min(Math.max(0.5, prev + factor), 3.0));
  };

  return (
    <div className="bg-slate-100 min-h-screen py-6 px-2 font-mukta flex flex-col items-center">
      
      <h1 className="text-3xl font-bold text-[#842362] mb-4">कर्मकाण्ड</h1>

      {/* Main Card Container */}
      <div className="w-full max-w-4xl bg-white border border-gray-300 shadow-xl rounded-lg overflow-hidden flex flex-col h-[75vh]">
        
        {/* --- TOOLBAR --- */}
        <div className="bg-[#f8f9fa] border-b border-gray-300 p-2 px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-gray-700 select-none z-10 shadow-sm">
          
          {/* Left: Page Navigation */}
          <div className="flex items-center gap-4 bg-white border border-gray-300 rounded-md px-2 py-1 shadow-sm">
             <button 
               onClick={() => changePage(-1)} 
               disabled={pageNumber <= 1}
               className="hover:text-[#842362] disabled:opacity-30 transition p-1"
             >
               <ChevronUp size={22} />
             </button>
             
             <span className="font-bold text-lg min-w-[60px] text-center">
               {pageNumber} <span className="text-gray-400 font-normal text-sm">/ {numPages || '--'}</span>
             </span>

             <button 
               onClick={() => changePage(1)} 
               disabled={pageNumber >= numPages}
               className="hover:text-[#842362] disabled:opacity-30 transition p-1"
             >
               <ChevronDown size={22} />
             </button>
          </div>

          {/* Right: Zoom Controls */}
          <div className="flex items-center gap-3 bg-white border border-gray-300 rounded-md px-3 py-1 shadow-sm">
             <button 
                onClick={() => changeZoom(-0.2)} 
                className="hover:text-[#842362] transition active:scale-90" 
                title="Zoom Out"
             >
               <ZoomOut size={20} />
             </button>
             
             <span className="text-xs font-mono font-bold w-12 text-center border-l border-r border-gray-200 px-1">
               {(scale * 100).toFixed(0)}%
             </span>
             
             <button 
               onClick={() => changeZoom(0.2)} 
               className="hover:text-[#842362] transition active:scale-90" 
               title="Zoom In"
             >
               <ZoomIn size={20} />
             </button>

             {/* Reset Zoom */}
             <button 
               onClick={() => setScale(1.0)} 
               className="text-gray-400 hover:text-black ml-1" 
               title="Reset Zoom"
             >
               <RotateCw size={14} />
             </button>
          </div>

        </div>

        {/* --- PDF CONTAINER --- */}
        <div 
          className="flex-grow overflow-auto bg-[#525659] p-4 flex justify-center items-start"
          ref={containerRef}
        >
           <Document
             file="/karmakanda.pdf"
             onLoadSuccess={onDocumentLoadSuccess}
             loading={<div className="text-white mt-10 animate-pulse">Loading Document...</div>}
             error={
               <div className="bg-red-50 text-red-600 p-6 rounded-lg mt-10 text-center border border-red-200">
                 <p className="font-bold">PDF Not Found</p>
                 <p className="text-sm">Please ensure 'karmakanda.pdf' is in the public folder.</p>
               </div>
             }
           >
              {/* 
                 Render ONE page at a time.
                 width={pdfWidth} ensures it fills the view horizontally.
              */}
              <div className="shadow-2xl border border-gray-400">
                <Page 
                  pageNumber={pageNumber} 
                  scale={scale} 
                  width={pdfWidth ? pdfWidth : 600} 
                  renderTextLayer={false} 
                  renderAnnotationLayer={false}
                  loading={<div className="bg-white h-[800px] w-full flex items-center justify-center text-gray-400">Rendering...</div>}
                />
              </div>
           </Document>
        </div>

      </div>
      
      <p className="text-gray-400 text-xs mt-3">
        Use controls to navigate pages. Double tap zoom to reset.
      </p>

    </div>
  );
};

export default Karmakanda;