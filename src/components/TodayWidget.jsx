// src/components/TodayWidget.jsx
import { Sunrise, Sunset } from 'lucide-react';

const TodayWidget = () => {
  return (
    <div className="font-mukta h-full">
      {/* The Purple Card */}
      <div className="w-full flex flex-col py-4 gap-4 px-5 rounded-lg overflow-hidden shadow-lg shadow-gray-500/50 bg-[#842362] text-white">
        
        {/* 1. Big Date Section */}
        <div className="flex flex-wrap font-semibold text-2xl md:text-3xl justify-center items-center gap-2 border-white/20 pb-4">
          <p className="text-4xl">९</p>
          <p>पुष</p>
          <p>२०८२,</p>
          <p>बुधबार</p>
        </div>

        {/* 2. Tithi & English Date */}
        <div className="flex flex-col gap-2 text-center">
           <div className="flex justify-between text-lg text-gray-100 opacity-90">
             <div className="flex gap-2">
               <span>११४६</span>
               <span>प्वहेलाथ्वः</span>
             </div>
             <span>Wed Dec 24 2025</span>
           </div>
           
           <span className="text-xl font-medium text-center mt-1">
             चतुर्थी, पौष शुक्लपक्ष
           </span>
        </div>
        <hr className="border-gray-300 opacity-30 my-1"></hr>

        {/* 3. Sunrise & Sunset (With Orange Icons) */}
        <div className="mt-2 flex justify-around">
            
            {/* Sunrise */}
            <div className="flex flex-col items-center justify-center">
              <div className="text-orange-500 mb-1">
                <Sunrise size={36} />
              </div>
              <div className="text-sm font-semibold">सूर्योदय</div>
              <div className="text-sm">०६:५२</div>
            </div>

            {/* Sunset */}
            <div className="flex flex-col items-center justify-center">
              <div className="text-orange-500 mb-1">
                <Sunset size={36} />
              </div>
              <div className="text-sm font-semibold">सूर्यास्त</div>
              <div className="text-sm">१७:१५</div>
            </div>

        </div>

        {/* 4. Bottom Buttons */}
        <div className="flex justify-between items-center mt-2 pt-2 border-white/10">
           <div className="bg-[#ee4343] py-1 px-4 rounded-lg font-semibold text-sm">
             काल: बेला
           </div>
           
           <button className="border border-white/50 rounded-2xl px-3 py-1 text-sm hover:bg-white hover:text-[#842362] transition duration-300 font-bold">
             आजको पञ्चाङ्ग
           </button>
        </div>

      </div>
    </div>
  );
};

export default TodayWidget;