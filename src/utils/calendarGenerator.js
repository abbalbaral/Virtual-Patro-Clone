// src/utils/calendarGenerator.js
import NepaliDate from 'nepali-date-converter';

// 1. Helper: Convert English Numbers to Nepali (1 -> १)
export const convertToNepaliDigit = (number) => {
  const nepalDigits = ['०','१','२','३','४','५','६','७','८','९'];
  return String(number).split('').map(digit => nepalDigits[digit] || digit).join('');
};

// 2. Helper: Pad numbers (9 -> 09)
const pad = (num) => String(num).padStart(2, '0');

// 3. MAIN LOGIC: Generates the Grid
// Now accepts 'eventData' which comes from your JSON file via Axios
// src/utils/calendarGenerator.js

// ... imports and helpers (convertToNepaliDigit, pad) remain same ...

export const getMonthCalendar = (year, month, eventData = []) => {
  // ... Setup code (firstDayOfMonth, engMonthString, daysInCurrentMonth, daysInPrevMonth) remains same ...
  // (I am skipping the setup lines to keep this short, copy the previous setup if needed)
  
  const firstDayOfMonth = new NepaliDate(year, month, 1);
  const startDayIndex = firstDayOfMonth.getDay(); 
  
  const startJsDate = firstDayOfMonth.toJsDate();
  let endJsDate = new Date(startJsDate);
  endJsDate.setDate(endJsDate.getDate() + 35); 
  const engMonth1 = startJsDate.toLocaleString('default', { month: 'short' });
  const engMonth2 = endJsDate.toLocaleString('default', { month: 'short' });
  const engYear = startJsDate.getFullYear();
  const engMonthString = `${engMonth1}/${engMonth2} ${engYear}`;

  let daysInCurrentMonth = 0;
  for (let i = 29; i <= 32; i++) {
     try { if (new NepaliDate(year, month, i).getMonth() === month) daysInCurrentMonth = i; } catch (e) { break; }
  }

  let prevMonthYear = month === 0 ? year - 1 : year;
  let prevMonthIndex = month === 0 ? 11 : month - 1;
  let daysInPrevMonth = 0;
  for (let i = 29; i <= 32; i++) {
    try { if (new NepaliDate(prevMonthYear, prevMonthIndex, i).getMonth() === prevMonthIndex) daysInPrevMonth = i; } catch (e) { break; }
 }

  const calendarGrid = [];

  // A. PREVIOUS MONTH
  for (let i = startDayIndex - 1; i >= 0; i--) {
    const dayNum = daysInPrevMonth - i;
    const pDate = new NepaliDate(prevMonthYear, prevMonthIndex, dayNum);
    const jsDate = pDate.toJsDate();
    
    calendarGrid.push({
      dayEn: dayNum, 
      engDate: jsDate.getDate(),
      dayNp: convertToNepaliDigit(dayNum),
      isCurrentMonth: false,
      fullDate: `${prevMonthYear}-${pad(prevMonthIndex+1)}-${pad(dayNum)}`
    });
  }

  // B. CURRENT MONTH
  for (let i = 1; i <= daysInCurrentMonth; i++) {
    const fullDateString = `${year}-${pad(month + 1)}-${pad(i)}`;
    const nDate = new NepaliDate(year, month, i);
    const dayOfWeek = nDate.getDay(); // 0-6
    const jsDate = nDate.toJsDate(); 

    // --- FIX 1: Correct Data Mapping ---
    const foundEvent = eventData.find(e => e.day === i);

    // Logic: Saturday (6) is always holiday. OR if JSON says is_holiday: true
    let isHoliday = dayOfWeek === 6; 
    if (foundEvent && foundEvent.is_holiday === true) { // <--- FIXED KEY NAME HERE
      isHoliday = true;
    }

    calendarGrid.push({
      dayEn: i, 
      engDate: jsDate.getDate(),
      dayNp: convertToNepaliDigit(i),
      isCurrentMonth: true,
      fullDate: fullDateString,
      isHoliday: isHoliday,
      eventName: foundEvent ? foundEvent.title : "", 
      tithi: foundEvent && foundEvent.tithi ? foundEvent.tithi : "दशमी" 
    });
  }

  // C. NEXT MONTH
  const totalSlots = 35; 
  if (calendarGrid.length < totalSlots) {
      const remainingSlots = totalSlots - calendarGrid.length;
      let nextMonthYear = month === 11 ? year + 1 : year;
      let nextMonthIndex = month === 11 ? 0 : month + 1;

      for (let i = 1; i <= remainingSlots; i++) {
        const nDate = new NepaliDate(nextMonthYear, nextMonthIndex, i);
        const jsDate = nDate.toJsDate();

        calendarGrid.push({
            dayEn: i,
            engDate: jsDate.getDate(),
            dayNp: convertToNepaliDigit(i),
            isCurrentMonth: false,
            fullDate: `${nextMonthYear}-${pad(nextMonthIndex+1)}-${pad(i)}`
        });
      }
  } 
  
  const finalGrid = calendarGrid.slice(0, 35);
  return { grid: finalGrid, engMonthString };
};

// ... constants export remains same ...
export const NEPAL_MONTHS_BS = ["बैशाख", "जेठ", "असार", "सावन", "भदौ", "असोज", "कार्तिक", "मंसिर", "पुष", "माघ", "फागुन", "चैत"];
export const WEEK_DAYS_COMPLEX = [
  { np: "आइतबार", en: "Sunday" }, { np: "सोमबार", en: "Monday" }, { np: "मंगलबार", en: "Tuesday" }, { np: "बुधबार", en: "Wednesday" }, { np: "बिहीबार", en: "Thursday" }, { np: "शुक्रबार", en: "Friday" }, { np: "शनिबार", en: "Saturday" }
];