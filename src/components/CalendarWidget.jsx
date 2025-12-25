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
import axios from 'axios';

// EXACT COLORS & CLASSES
const THEME_COLOR = "text-[#842362]";
const BORDER_COLOR = "border-gray-300";

const CalendarWidget = () => {
  const dispatch = useDispatch();
  const { bsDate } = useSelector((state) => state.calendar);
  
  // State for View Control
  const [currentYear, currentMonth] = bsDate.split('-').map(Number);
  const [viewYear, setViewYear] = useState(currentYear);
  const [viewMonth, setViewMonth] = useState(currentMonth - 1); // 0-11 index
  
  // State for Data
  const [calendarData, setCalendarData] = useState(null);
  const [muhurtList, setMuhurtList] = useState([]);
  const [apiEvents, setApiEvents] = useState([]);

  // 1. FETCH DATA (Runs once on mount)
  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const response = await axios.get('/data/calendar_data.json');
        
        // Save events for the generator
        // In real app, you would filter by month here
        setApiEvents(response.data.events); 
        
        // Save Muhurt data (Accessing specific key "8" for Poush)
        // In real app: response.data.muhurts[viewMonth]
        if (response.data.muhurts && response.data.muhurts["8"]) {
            setMuhurtList(response.data.muhurts["8"]);
        }
      } catch (e) {
        console.error("Calendar Data Error", e);
      }
    };
    fetchCalendarData();
  }, []);

  // 2. GENERATE GRID (Runs when Year/Month changes OR Data loads)
  useEffect(() => {
    // We pass 'apiEvents' to the generator so it knows which days are holidays
    const data = getMonthCalendar(viewYear, viewMonth, apiEvents);
    setCalendarData(data);
  }, [viewYear, viewMonth, apiEvents]);

  // Handlers
  const handlePrevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else { setViewMonth(viewMonth - 1); }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else { setViewMonth(viewMonth + 1); }
  };

  const jumpToToday = () => {
    dispatch(setToday());
    setViewYear(currentYear);
    setViewMonth(currentMonth - 1);
  };

  const onDateClick = (fullDate) => {
    dispatch(changeDate(fullDate));
  };

  if (!calendarData) return <div className="p-10 text-center">लोड हुँदैछ...</div>;

  return (
    <div className="w-full font-mukta p-2">
      
      {/* --- HEADER CONTROLS --- */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3 md:gap-0">
        <div className="self-start md:self-auto">
          <button 
            onClick={jumpToToday}
            className={`bg-white border border-gray-400 shadow-md shadow-gray-400/50 px-3 py-2 rounded-md hover:text-orange-500 ${THEME_COLOR} font-bold text-sm lg:text-lg`}
          >
            आज
          </button>
        </div>

        {/* Center Pill */}
        <div className="flex items-center gap-1 bg-gray-200 border border-gray-400 shadow-md shadow-gray-300/50 px-2 py-1 rounded-lg">
          <button onClick={handlePrevMonth} className={`${THEME_COLOR} p-1 hover:border hover:border-slate-500 rounded`}>
             <ChevronsLeft size={20} />
          </button>
          
          {/* Month Select */}
          <div className="flex items-center justify-center">
            <select 
              value={viewMonth} 
              onChange={(e) => setViewMonth(Number(e.target.value))}
              className={`bg-transparent ${THEME_COLOR} font-bold text-lg lg:text-xl cursor-pointer outline-none appearance-none text-center min-w-[60px]`}
            >
              {NEPAL_MONTHS_BS.map((m, i) => <option key={m} value={i}>{m}</option>)}
            </select>
          </div>

          {/* Year Select */}
          <div className="flex items-center justify-center">
            <select 
              value={viewYear} 
              onChange={(e) => setViewYear(Number(e.target.value))}
              className={`bg-transparent ${THEME_COLOR} font-bold text-lg lg:text-xl cursor-pointer outline-none appearance-none text-center`}
            >
               {Array.from({length: 21}, (_, i) => 2070 + i).map(y => <option key={y} value={y}>{convertToNepaliDigit(y)}</option>)}
            </select>
            <div className="flex flex-col -space-y-1 ml-1">
              <ChevronUp size={10} className="text-gray-600"/>
              <ChevronDown size={10} className="text-gray-600"/>
            </div>
          </div>

          <button onClick={handleNextMonth} className={`${THEME_COLOR} p-1 hover:border hover:border-slate-500 rounded`}>
             <ChevronsRight size={20} />
          </button>
        </div>

        {/* English Date */}
        <div className={`self-end md:self-auto flex border border-gray-500 shadow-md bg-white shadow-gray-400/50 rounded-lg gap-1 items-center px-3 py-2 font-bold ${THEME_COLOR} min-w-[140px] justify-center`}>
           <span className="text-sm lg:text-lg">{calendarData.engMonthString}</span>
        </div>
      </div>


      {/* --- CALENDAR GRID --- */}
      <div className={`border-l border-t ${BORDER_COLOR} w-full shadow-lg shadow-gray-400/50 bg-white`}>
        
        {/* Header Row */}
        <div className="grid grid-cols-7 text-center">
          {WEEK_DAYS_COMPLEX.map((day, idx) => (
            <div 
              key={day.en} 
              className={`
                border-r-2 border-b-2 border-gray-400 py-1 bg-gray-200
                flex flex-col items-center justify-center
                ${idx === 6 ? 'text-red-600' : 'text-gray-600'}
              `}
            >
              <span className="text-[10px] sm:text-xs lg:text-sm font-bold">{day.np}</span>
              <span className="text-[9px] sm:text-[10px] lg:text-xs font-semibold">{day.en}</span>
            </div>
          ))}
        </div>

    {/* grid */}

        <div className="grid grid-cols-7">
          {calendarData.grid.map((cell, index) => {
            const isToday = cell.fullDate === bsDate;
            const isSaturday = (index % 7) === 6; 
            
            // --- FIX 2: FORCE RED FOR HOLIDAYS ---
            let containerClass = "bg-white hover:bg-gray-100 text-gray-600";
            let numColor = "text-gray-600";
            
            // If Saturday OR Holiday -> Red Text
            if (isSaturday || cell.isHoliday) {
              containerClass = "bg-white hover:bg-gray-100 text-red-500";
              numColor = "text-red-500"; 
            }

            // Today Override (Wins over Red)
            if (isToday) {
               containerClass = "bg-green-700 text-white hover:bg-green-600";
               numColor = "text-white";
            }

            // Faded (Next/Prev Month)
            if (!cell.isCurrentMonth) {
               if(!isToday) {
                  containerClass = "bg-white text-gray-300"; 
                  numColor = "text-gray-200"; 
               }
            }

            return (
              <div 
                key={`${cell.fullDate}-${index}`} 
                onClick={() => onDateClick(cell.fullDate)}
                className={`
                  h-16 md:h-28 
                  border-r border-b ${BORDER_COLOR} 
                  ${containerClass}
                  relative cursor-pointer transition-colors
                  flex flex-col justify-between p-1
                `}
              >
                {/* Event Name */}
                <div className="w-full text-center leading-none">
                   <span className={`
                     text-[8px] md:text-[10px] font-medium block line-clamp-1 
                     ${isToday ? 'text-white' : (isSaturday || cell.isHoliday ? 'text-red-500' : 'text-gray-700')}
                   `}>
                     {cell.isCurrentMonth ? cell.eventName : ''}
                   </span>
                </div>

                {/* Main Number */}
                <div className="flex justify-center items-center -mt-1">
                  <span className={`text-2xl md:text-3xl lg:text-4xl font-light ${numColor}`}>
                    {cell.dayNp}
                  </span>
                </div>

                {/* Footer: Tithi + Eng Date */}
                <div className="flex justify-between items-end w-full px-1">
                  <span className={`text-[7px] md:text-[9px] lg:text-[11px] font-medium ${!cell.isCurrentMonth && 'invisible'}`}>
                    {cell.tithi}
                  </span>
                  <span className={`text-[9px] md:text-[11px] font-bold font-sans ${isToday ? 'text-white' : 'text-gray-400'} ${!cell.isCurrentMonth && 'text-gray-200'}`}>
                    {cell.engDate}
                  </span>
                </div>

              </div>
            );
          })}
        </div>


      </div>

      {/* --- MUHURT SECTION (Dynamic from JSON) --- */}
      {/* Only show if we have data for this month */}
      {muhurtList.length > 0 && (
        <div className="flex flex-wrap gap-4 md:gap-8 justify-center mt-6">
          {muhurtList.map((item, idx) => (
             <div 
               key={idx} 
               className="bg-white rounded-lg p-3 shadow-lg shadow-gray-500/50 w-[45%] md:w-56 flex flex-col items-center border border-gray-100"
             >
                <p className="text-orange-500 text-sm md:text-lg text-center font-bold mb-1 font-mukta">
                  {item.title}
                </p>
                <p className="text-center leading-tight text-gray-700 text-sm md:text-base font-semibold">
                  {item.dates}
                </p>
             </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default CalendarWidget; 