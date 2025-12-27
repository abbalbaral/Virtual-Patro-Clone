import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sunrise, Sunset } from 'lucide-react';
import TodayWidget from '../components/TodayWidget';
import UpcomingEvents from '../components/UpcomingEvents';
// 1. IMPORT SERVICE
import { getPanchanga } from '../services/api';

const Panchanga = () => {
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  
  const queryDate = searchParams.get("date") || "2082-09-12"; 

  useEffect(() => {
    const loadData = async () => {
      // 2. CALL SERVICE
      const allData = await getPanchanga();
      // Select specific date or fallback
      setData(allData[queryDate] || allData["2082-09-12"]);
    };
    loadData();
  }, [queryDate]);

  // Helper for colors
  const getColor = (type) => {
    switch(type) {
      case 'good': return 'bg-[#a3e635] border-[#65a30d]';
      case 'bad': return 'bg-[#f87171] border-[#b91c1c]';
      case 'neutral': return 'bg-[#93c5fd] border-[#1d4ed8]';
      default: return 'bg-[#fdba74] border-[#c2410c]';
    }
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="bg-slate-100 min-h-screen py-6 px-2 font-mukta">
      <h1 className="text-3xl text-[#842362] text-center font-bold mb-6">
        {data.date_np}
      </h1>

      <div className="lg:mx-auto lg:max-w-[1400px] grid grid-cols-1 lg:grid-cols-10 gap-6 items-start">
        
        <div className="order-2 lg:order-1 lg:col-span-3 flex flex-col gap-4">
           <TodayWidget />
           <UpcomingEvents />
        </div>

        <div className="order-1 lg:order-2 lg:col-span-7 bg-white p-6 rounded-xl shadow-md border border-gray-200">
           
           {/* Top Info */}
           <div className="flex flex-col md:flex-row justify-between border-b border-gray-200 pb-6 mb-6">
              <div className="space-y-2 text-lg text-gray-700 w-full md:w-1/2">
                 <div className="flex"><span className="w-20 font-bold">दिन:</span> {data.date_np.split(',')[1]}</div>
                 <div className="flex"><span className="w-20 font-bold">तिथि:</span> {data.tithi}</div>
                 <div className="flex"><span className="w-20 font-bold">नक्षत्र:</span> {data.details['नक्षत्र']}</div>
                 <div className="flex"><span className="w-20 font-bold">योग:</span> {data.details['योग']}</div>
                 <div className="flex"><span className="w-20 font-bold">करण:</span> {data.details['करण']}</div>
                 <div className="flex"><span className="w-20 font-bold">चन्द्रराशि:</span> {data.details['चन्द्रराशि']}</div>
              </div>

              <div className="flex justify-around w-full md:w-1/2 mt-4 md:mt-0 items-center">
                 <div className="text-center">
                    <Sunrise className="text-orange-500 mx-auto" size={48} />
                    <div className="font-bold text-gray-600">सूर्योदय</div>
                    <div>{data.sunrise}</div>
                 </div>
                 <div className="text-center">
                    <Sunset className="text-orange-500 mx-auto" size={48} />
                    <div className="font-bold text-gray-600">सूर्यास्त</div>
                    <div>{data.sunset}</div>
                 </div>
              </div>
           </div>

           {/* Belas */}
           <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-[#842362] mb-4 text-center">दिन बेलाचक्रमा</h3>
                <div className="space-y-2">
                   {data.day_bela.map((item, idx) => (
                      <div key={idx} className={`border rounded-md px-3 py-2 flex justify-between items-center text-sm font-bold shadow-sm ${getColor(item.type)}`}>
                         <span>{item.name}</span>
                         <span>{item.start} - {item.end}</span>
                      </div>
                   ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#842362] mb-4 text-center">रात्री बेलाचक्रमा</h3>
                <div className="space-y-2">
                   {data.night_bela.map((item, idx) => (
                      <div key={idx} className={`border rounded-md px-3 py-2 flex justify-between items-center text-sm font-bold shadow-sm ${getColor(item.type)}`}>
                         <span>{item.name}</span>
                         <span>{item.start} - {item.end}</span>
                      </div>
                   ))}
                </div>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};

export default Panchanga;