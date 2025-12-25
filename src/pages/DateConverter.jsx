import { useState } from 'react';
import NepaliDate from 'nepali-date-converter';

const DateConverter = () => {
  return (
    <div className="bg-slate-100 min-h-screen py-10 px-4 font-mukta">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#842362] text-center mb-10">
          मिति परिवर्तन (Date Converter)
        </h1>
        <div className="flex flex-col md:flex-row justify-center gap-8 items-start">
          <ConverterCard 
            title="AD to BS Date Converter"
            rangeText="(Ad range from 1944 - 2043)"
            placeholder="Enter date in AD (YYYY-MM-DD)"
            type="AD"
            minYear={1944}
            maxYear={2043}
          />
          <ConverterCard 
            title="BS to AD Date Converter"
            rangeText="(BS range from 2000 - 2099)"
            placeholder="Enter date in BS (YYYY-MM-DD)"
            type="BS"
            minYear={2000}
            maxYear={2099}
          />
        </div>
      </div>
    </div>
  );
};

const ConverterCard = ({ title, rangeText, placeholder, type, minYear, maxYear }) => {
  const [inputDate, setInputDate] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    let value = e.target.value.replace(/[^0-9-]/g, '');
    if (value.length === 4 && inputDate.length === 3) value += '-';
    if (value.length === 7 && inputDate.length === 6) value += '-';
    if (value.length > 10) return;

    setInputDate(value);
    
    // Clear state
    setResult(null);
    setError(null);

    // Auto-Convert on full date
    if (value.length === 10) {
      convertDate(value);
    }
  };

  const convertDate = (dateStr) => {
    const parts = dateStr.split('-');
    const y = parseInt(parts[0]);
    const m = parseInt(parts[1]);
    const d = parseInt(parts[2]);

    // 1. Basic Structure Check
    if (isNaN(y) || isNaN(m) || isNaN(d)) {
       setError("Result :\nenter valid date");
       return;
    }

    // 2. Year Range Check
    if (y < minYear || y > maxYear) {
      setError("Result :\nenter valid date (Year out of range)");
      return;
    }

    // 3. Month Check
    if (m < 1 || m > 12) {
      setError("Result :\nenter valid date");
      return;
    }

    // 4. Day Check (Simple)
    if (d < 1 || d > 32) {
      setError("Result :\nenter valid date");
      return;
    }

    try {
      if (type === "AD") {
        // --- AD to BS ---
        
        // FIX 1: Set time to Noon (12:00) to avoid timezone shifts
        const jsDate = new Date(y, m - 1, d, 12, 0, 0); 

        // Validate: Did JS rollover the date? (e.g. Feb 30 -> Mar 2)
        if (jsDate.getFullYear() !== y || jsDate.getMonth() !== (m - 1) || jsDate.getDate() !== d) {
           throw new Error("Invalid Date");
        }

        const bsObj = new NepaliDate(jsDate);
        setResult(`Result :\n${bsObj.format('YYYY-M-D')}`);

      } else {
        // --- BS to AD ---
        
        // Attempt create
        const bsObj = new NepaliDate(y, m - 1, d);

        // Validate: Did library rollover? (e.g. 2081-02-32 -> 2081-03-01)
        if (bsObj.getYear() !== y || bsObj.getMonth() !== (m - 1) || bsObj.getDate() !== d) {
           throw new Error("Invalid Date");
        }

        // FIX 2: The "Noon Shift" for BS->AD
        // toJsDate() returns a date at 00:00:00 (Midnight).
        // converting that to String often subtracts hours -> Previous Day.
        const jsDate = bsObj.toJsDate();
        
        // Add 6 hours (in milliseconds) to push it safely into the day
        jsDate.setHours(jsDate.getHours() + 6);

        const adStr = jsDate.toISOString().split('T')[0];
        setResult(`Result :\n${adStr}`);
      }
    } catch (err) {
      setError("Result :\nenter valid date");
    }
  };

  return (
    <div className="w-full max-w-md flex flex-col items-center">
      <div className="w-full rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white">
        
        {/* Header */}
        <div className="bg-[#b35c8e] text-white text-center py-6 px-4 h-32 flex flex-col justify-center items-center">
          <h2 className="text-xl font-bold uppercase tracking-wide">{title}</h2>
          <p className="text-sm opacity-90 mt-1">{rangeText}</p>
        </div>

        {/* Body */}
        <div className="bg-[#f8f9fa] py-10 px-6 flex flex-col items-center gap-4 h-64 justify-center">
          <label className="text-black font-medium text-lg">
            {placeholder.split('(')[0]} <span className="text-gray-500 text-sm">({placeholder.split('(')[1]}</span>
          </label>
          
          <input 
            type="text" 
            value={inputDate}
            onChange={handleInputChange}
            placeholder="YYYY-MM-DD"
            maxLength={10}
            className="w-full text-center py-3 px-8 rounded-md border border-gray-300 focus:outline-none focus:border-[#842362] focus:ring-1 focus:ring-[#842362] text-xl tracking-wider text-gray-700 bg-white placeholder-gray-300 transition-all"
          />
        </div>
      </div>

      {/* Result */}
      <div className="mt-8 text-center min-h-[60px]">
        {result && (
          <div className="text-2xl font-bold text-[#842362] animate-fade-in whitespace-pre-line leading-relaxed">
            {result}
          </div>
        )}
        {error && (
          <div className="text-2xl font-bold text-red-500 animate-pulse whitespace-pre-line leading-relaxed">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default DateConverter;