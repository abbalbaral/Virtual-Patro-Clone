import { useEffect, useState } from 'react';
import { Sunrise, Sunset } from 'lucide-react';
import { Link } from 'react-router-dom';
import NepaliDate from 'nepali-date-converter';
// 1. IMPORT THE SERVICE AND HELPER
import { getPanchanga } from '../services/api';
import { getCurrentBela } from '../utils/timeHelpers';
import { convertToNepaliDigit, NEPAL_MONTHS_BS } from '../utils/calendarGenerator';

const TodayWidget = () => {
  // Logic to get display strings
  const today = new NepaliDate(); 
  const jsNow = new Date();
  
  const dayName = ["आइतबार", "सोमबार", "मंगलबार", "बुधवार", "बिहीबार", "शुक्रवार", "शनिबार"][today.getDay()];
  const monthName = NEPAL_MONTHS_BS[today.getMonth()];
  const yearNp = convertToNepaliDigit(today.getYear());
  const dayNp = convertToNepaliDigit(today.getDate());
  const engDateString = jsNow.toDateString();

  // State
  const [bela, setBela] = useState({ name: "लोड हुँदै...", color: "bg-gray-400" });
  const [sunData, setSunData] = useState({ rise: "06:50", set: "17:15" });

  useEffect(() => {
    const loadData = async () => {
      // 2. CALL THE SERVICE (No axios here!)
      const allPanchanga = await getPanchanga();
      
      // In a real app, you would generate the key dynamically like "2082-09-12"
      // For this demo, we fall back to the static data we have in JSON
      const data = allPanchanga["2082-09-12"]; 
      
      if (data) {
        // Calculate Logic
        const allBelas = [...data.day_bela, ...data.night_bela];
        const current = getCurrentBela(allBelas);
        setBela(current);

        setSunData({ rise: data.sunrise, set: data.sunset });
      }
    };
    loadData();

    // Update time every minute
    const interval = setInterval(loadData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mukta p-2 h-full">
      <div className="w-full flex flex-col py-4 gap-4 px-5 rounded-lg overflow-hidden shadow-lg shadow-gray-500/50 bg-[#842362] text-white h-full justify-between">
        
        {/* Date */}
        <div className="flex flex-wrap font-semibold text-2xl md:text-3xl justify-center items-center gap-2">
          <p className="text-4xl">{dayNp}</p>
          <p> {monthName} </p>
          <p>{yearNp},</p>
          <p>{dayName}</p>
        </div>

        {/* Tithi */}
        <div className="flex flex-col gap-2 text-center">
           <div className="flex justify-between text-lg text-gray-100 opacity-90">
             <div className="flex gap-2">
               <span>११४६</span>
               <span>प्वहेलाथ्वः</span>
             </div>
             <span>{engDateString}</span>
           </div>
           <span className="text-xl font-medium text-center mt-1">
             सप्तमी, पौष शुक्लपक्ष
           </span>
           <hr className="border-gray-300 opacity-30 my-1" />
        </div>

        {/* Sun */}
        <div className="mt-1 flex justify-around">
            <div className="flex flex-col items-center justify-center">
              <div className="text-orange-500 mb-1"><Sunrise size={36} /></div>
              <div className="text-sm font-semibold">सूर्योदय</div>
              <div className="text-sm">{sunData.rise}</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-orange-500 mb-1"><Sunset size={36} /></div>
              <div className="text-sm font-semibold">सूर्यास्त</div>
              <div className="text-sm">{sunData.set}</div>
            </div>
        </div>

        {/* Bela Button */}
        <div className="flex justify-between items-center mt-2">
           <div className={`${bela.color} py-1 px-4 rounded-lg font-semibold text-sm cursor-pointer transition-colors duration-500`}>
             {bela.name}
           </div>
           
           <Link to="/panchanga">
             <button className="border border-white/50 rounded-2xl px-3 py-1 text-sm hover:bg-white hover:text-[#842362] transition duration-300 font-bold">
               आजको पञ्चाङ्ग
             </button>
           </Link>
        </div>

      </div>
    </div>
  );
};

export default TodayWidget;