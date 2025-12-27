// src/components/CalendarWidget.jsx
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeDate, setToday } from '../store/dateSlice';
import { 
  getMonthCalendar, 
  NEPAL_MONTHS_BS, 
  WEEK_DAYS_COMPLEX,
  convertToNepaliDigit 
} from '../utils/calendarGenerator';
import { ChevronUp, ChevronDown, ChevronsLeft, ChevronsRight } from 'lucide-react';
import DayPopup from './DayPopup';
import { getCalendarEvents } from '../services/api';

const THEME_COLOR = "text-[#842362]";
const BORDER_COLOR = "border-gray-300";

const CalendarWidget = () => {
  const dispatch = useDispatch();
  const { bsDate } = useSelector((state) => state.calendar);
  
  const [currentYear, currentMonth] = bsDate.split('-').map(Number);
  const [viewYear, setViewYear] = useState(currentYear);
  const [viewMonth, setViewMonth] = useState(currentMonth - 1); 
  
  const [calendarData, setCalendarData] = useState(null);
  const [muhurtList, setMuhurtList] = useState([]);
  const [apiEvents, setApiEvents] = useState([]);

  // --- CHANGED STATE: Store the whole cell object ---
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeCell, setActiveCell] = useState(null); // Holds { tithi, dayNp, eventName... }

  useEffect(() => {
    const loadData = async () => {
      // CALL SERVICE
      const data = await getCalendarEvents();
      setApiEvents(data.events); 
      if (data.muhurts && data.muhurts["8"]) {
          setMuhurtList(data.muhurts["8"]);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const data = getMonthCalendar(viewYear, viewMonth, apiEvents);
    setCalendarData(data);
  }, [viewYear, viewMonth, apiEvents]);

  // ... (Keep handlePrevMonth, handleNextMonth, jumpToToday same as before) ...
  const handlePrevMonth = () => { if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); } else { setViewMonth(viewMonth - 1); } };
  const handleNextMonth = () => { if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); } else { setViewMonth(viewMonth + 1); } };
  const jumpToToday = () => { dispatch(setToday()); setViewYear(currentYear); setViewMonth(currentMonth - 1); };


  // --- UPDATED CLICK HANDLER ---
  // Now accepts the whole 'cell' object
  const onDateClick = (cell) => {
    dispatch(changeDate(cell.fullDate));

    if (cell.isCurrentMonth) {
      setActiveCell(cell); // Pass the exact grid data to the popup
      setIsPopupOpen(true);
    }
  };

  if (!calendarData) return <div className="p-10 text-center">लोड हुँदैछ...</div>;

  return (
    <div className="w-full font-mukta p-2 relative">
      
      {/* ... (Keep Header Controls exactly same as before) ... */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3 md:gap-0">
          {/* ... (Header buttons code) ... */}
           {/* Use your existing header code here */}
           <div className="self-start md:self-auto"><button onClick={jumpToToday} className={`bg-white border border-gray-400 shadow-md shadow-gray-400/50 px-3 py-2 rounded-md hover:text-orange-500 ${THEME_COLOR} font-bold text-sm lg:text-lg`}>आज</button></div>
           <div className="flex items-center gap-1 bg-gray-200 border border-gray-400 shadow-md shadow-gray-300/50 px-2 py-1 rounded-lg">
             <button onClick={handlePrevMonth} className={`${THEME_COLOR} p-1 hover:border hover:border-slate-500 rounded`}><ChevronsLeft size={20} /></button>
             <div className="flex items-center justify-center"><select value={viewMonth} onChange={(e) => setViewMonth(Number(e.target.value))} className={`bg-transparent ${THEME_COLOR} font-bold text-lg lg:text-xl cursor-pointer outline-none appearance-none text-center min-w-[60px]`}>{NEPAL_MONTHS_BS.map((m, i) => <option key={m} value={i}>{m}</option>)}</select></div>
             <div className="flex items-center justify-center"><select value={viewYear} onChange={(e) => setViewYear(Number(e.target.value))} className={`bg-transparent ${THEME_COLOR} font-bold text-lg lg:text-xl cursor-pointer outline-none appearance-none text-center`}>{Array.from({length: 21}, (_, i) => 2070 + i).map(y => <option key={y} value={y}>{convertToNepaliDigit(y)}</option>)}</select></div>
             <button onClick={handleNextMonth} className={`${THEME_COLOR} p-1 hover:border hover:border-slate-500 rounded`}><ChevronsRight size={20} /></button>
           </div>
           <div className={`self-end md:self-auto flex border border-gray-500 shadow-md bg-white shadow-gray-400/50 rounded-lg gap-1 items-center px-3 py-2 font-bold ${THEME_COLOR} min-w-[140px] justify-center`}><span className="text-sm lg:text-lg">{calendarData.engMonthString}</span></div>
      </div>

      <div className={`border-l border-t ${BORDER_COLOR} w-full shadow-lg shadow-gray-400/50 bg-white`}>
        <div className="grid grid-cols-7 text-center">
          {WEEK_DAYS_COMPLEX.map((day, idx) => (
            <div key={day.en} className={`border-r-2 border-b-2 border-gray-400 py-1 bg-gray-200 flex flex-col items-center justify-center ${idx === 6 ? 'text-red-600' : 'text-gray-600'}`}>
              <span className="text-[10px] sm:text-xs lg:text-sm font-bold">{day.np}</span>
              <span className="text-[9px] sm:text-[10px] lg:text-xs font-semibold">{day.en}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {calendarData.grid.map((cell, index) => {
            const isToday = cell.fullDate === bsDate;
            const isSaturday = (index % 7) === 6; 
            
            let containerClass = "bg-white hover:bg-gray-100 text-gray-600";
            let numColor = "text-gray-600";
            
            if (isSaturday || cell.isHoliday) {
              containerClass = "bg-white hover:bg-gray-100 text-red-500";
              numColor = "text-red-500";
            }
            if (isToday) {
               containerClass = "bg-green-700 text-white hover:bg-green-600";
               numColor = "text-white";
            }
            if (!cell.isCurrentMonth && !isToday) {
               containerClass = "bg-white text-gray-300"; 
               numColor = "text-gray-200"; 
            }

            return (
              <div 
                key={`${cell.fullDate}-${index}`} 
                // --- PASS WHOLE CELL TO CLICK ---
                onClick={() => onDateClick(cell)}
                className={`h-16 md:h-28 border-r border-b ${BORDER_COLOR} ${containerClass} relative cursor-pointer transition-colors flex flex-col justify-between p-1`}
              >
                <div className="w-full text-center leading-none">
                   <span className={`text-[8px] md:text-[10px] font-medium block line-clamp-1 ${isToday ? 'text-white' : (isSaturday || cell.isHoliday ? 'text-red-500' : 'text-gray-700')}`}>
                     {cell.isCurrentMonth ? cell.eventName : ''}
                   </span>
                </div>
                <div className="flex justify-center items-center -mt-1">
                  <span className={`text-2xl md:text-3xl lg:text-4xl font-light ${numColor}`}>{cell.dayNp}</span>
                </div>
                <div className="flex justify-between items-end w-full px-1">
                  <span className={`text-[7px] md:text-[9px] lg:text-[11px] font-medium ${!cell.isCurrentMonth && 'invisible'}`}>{cell.tithi}</span>
                  <span className={`text-[9px] md:text-[11px] font-bold font-sans ${isToday ? 'text-white' : 'text-gray-400'} ${!cell.isCurrentMonth && 'text-gray-200'}`}>{cell.engDate}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {muhurtList.length > 0 && (
        <div className="flex flex-wrap gap-4 md:gap-8 justify-center mt-6">
          {muhurtList.map((item, idx) => (
             <div key={idx} className="bg-white rounded-lg p-3 shadow-lg shadow-gray-500/50 w-[45%] md:w-56 flex flex-col items-center border border-gray-100">
                <p className="text-orange-500 text-sm md:text-lg text-center font-bold mb-1 font-mukta">{item.title}</p>
                <p className="text-center leading-tight text-gray-700 text-sm md:text-base font-semibold">{item.dates}</p>
             </div>
          ))}
        </div>
      )}

      {/* --- PASS activeCell TO POPUP --- */}
      <DayPopup 
        data={activeCell} 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />

    </div>
  );
};

export default CalendarWidget;