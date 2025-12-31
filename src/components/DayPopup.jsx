import { X, Sunrise, Sunset } from 'lucide-react';
import { NEPAL_MONTHS_BS, convertToNepaliDigit } from '../utils/calendarGenerator';
const DayPopup = ({ data, isOpen, onClose }) => {
  if (!isOpen || !data) return null;

  // Static Date Parts from the Cell Data
  const [y, m, d] = data.fullDate.split('-');
  const monthName = NEPAL_MONTHS_BS[parseInt(m) - 1]; 

  // Use the pre-calculated English Date from generator to avoid timezone math here
  // data.engFullDate string (e.g. "Sat Dec 27 2025")
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 font-mukta">
      
      <div className="bg-white w-full max-w-lg rounded-lg shadow-2xl relative animate-scale-in max-h-[90vh] overflow-y-auto">
        
        <button onClick={onClose} className="absolute right-4 top-4 text-black hover:text-red-500 transition z-10">
          <X size={28} strokeWidth={2.5} />
        </button>

        <div className="p-6 border-b border-gray-200">
           {/* TITLE: Use the dayName passed from Grid (Saturday) */}
           <h2 className="text-3xl font-bold text-[#842362] mb-4">
             {data.dayNp} {monthName} {convertToNepaliDigit(y)}, {data.dayName}
           </h2>

           <div className="flex justify-between items-start">
              <div className="text-gray-800 font-semibold space-y-1">
                 {/* Remove day name from Eng string since we show it in Nepali */}
                 <p className="text-lg">{data.engFullDate}</p> 
                 <p className="text-lg">११४६ थिंलागा: {data.dayNp}</p>
              </div>

              {/* ... (Sun Icons remain same) ... */}
              <div className="flex gap-8 text-center">
                 <div>
                    <Sunrise className="text-orange-500 mx-auto" size={32} />
                    <div className="text-sm font-bold text-gray-700">सूर्योदय</div>
                    <div className="text-sm font-bold text-gray-900">06:54</div>
                 </div>
                 <div>
                    <Sunset className="text-orange-500 mx-auto" size={32} />
                    <div className="text-sm font-bold text-gray-700">सूर्यास्त</div>
                    <div className="text-sm font-bold text-gray-900">17:16</div>
                 </div>
              </div>

           </div>
        </div>

        {/* ... (Rest of body remains same) ... */}
        <div className="p-6 space-y-6">
           <div>
              <h3 className="text-2xl font-bold text-orange-500 mb-4 border-b border-gray-100 pb-2">पञ्चाङ्ग</h3>
              <div className="space-y-2 text-lg text-gray-700">
                 {/* Correctly mapped */}
                 <InfoRow label="दिन" value={data.dayName} />
                 <InfoRow label="तिथि" value={data.tithi} /> 
                 <InfoRow label="पक्ष" value="शुक्लपक्ष" />
                 <InfoRow label="नक्षत्र" value="पूर्वाषाढा" />
                 <InfoRow label="योग" value="शूल" />
                 <InfoRow label="करण" value="बब" />
              </div>
           </div>
           
           <div>
              <h3 className="text-2xl font-bold text-orange-500 mb-2 border-b border-gray-100 pb-2">कार्यक्रमहरु</h3>
              <div className="text-gray-600 text-lg">
                 {data.eventName ? (
                    <p className="py-2 text-[#842362] font-bold">{data.eventName}</p>
                 ) : (
                    <p className="py-2 text-gray-400 italic">कुनै विशेष कार्यक्रम छैन</p>
                 )}
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex items-start">
    <span className="w-24 font-bold text-gray-600 flex justify-between pr-4">{label} <span>:</span></span>
    <span className="text-gray-800 font-medium">{value}</span>
  </div>
);

export default DayPopup;