import { useEffect, useState } from 'react';
import axios from 'axios';
import { RefreshCw, Calendar } from 'lucide-react';
import { convertToNepaliDigit } from '../utils/calendarGenerator';

const Forex = () => {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState('');

  const fetchForexData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/data/forex.json');
      if (response.data && response.data.data) {
        setRates(response.data.data.payload);
        setDate(response.data.data.date);
      }
    } catch (err) {
      console.error("Error fetching forex:", err);
    } finally {
      setTimeout(() => setLoading(false), 300);
    }
  };

  useEffect(() => {
    fetchForexData();
  }, []);

  const getFlagUrl = (currency) => {
    if (currency === 'INR') return 'https://flagcdn.com/48x36/in.png';
    return `https://flagcdn.com/48x36/${currency.slice(0,2).toLowerCase()}.png`;
  };

  return (
    <div className="bg-slate-100 min-h-screen py-8 font-mukta">
      <div className="max-w-4xl mx-auto px-2">
        
        {/* Top Control Bar */}
        {/* <div className="flex justify-end mb-2">
           <div className="flex items-center gap-2 text-gray-600 text-sm bg-white px-3 py-1 rounded shadow-sm">
             <Calendar size={16} className="text-orange-500" />
             <span className="font-bold">{convertToNepaliDigit(date)}</span>
             <button onClick={fetchForexData} className="ml-2 p-1 hover:bg-gray-200 rounded-full transition">
               <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
             </button>
           </div>
        </div> */}

        {/* --- THE TABLE --- */}
        <div className="bg-white shadow-lg border border-gray-300">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              
              <thead>
                {/* ROW 1: Merged Title */}
                <tr className="bg-white border border-gray-300">
                  <th colSpan="4" className="p-3 text-center text-xl font-bold text-orange-500">
                    आजको विनिमय दर
                  </th>
                </tr>

                {/* ROW 2: Column Headers */}
                {/* Gray background, Bold, Dark Border */}
                <tr className="bg-white text-black border-b border-gray-300">
                  <th className="p-3 border-r border-gray-400 font-bold text-lg text-center">मुद्रा संकेत</th>
                  <th className="p-3 border-r border-gray-400 font-bold text-lg text-center">एकाई</th>
                  <th className="p-3 border-r border-gray-400 font-bold text-lg text-center">खरिद दर</th>
                  <th className="p-3 font-bold text-lg text-center">बिक्री दर</th>
                </tr>
              </thead>
              
              <tbody>
                {rates.map((rate, index) => (
                  <tr 
                    key={rate.currency} 
                    // Alternating Colors: Darker Gray vs White
                    className={`
                      border-b border-gray-300 transition-colors
                      ${index % 2 === 0 ? "bg-[#F2F2F2]" : "bg-white"} 
                      hover:bg-purple-100
                    `}
                  >
                    
                    {/* Column 1: Currency & Flag */}
                    <td className="p-2 pl-4 border-r border-gray-300">
                      <div className="flex items-center gap-3">
                        <img 
                          src={getFlagUrl(rate.currency)} 
                          alt={rate.currency} 
                          className="w-8 h-5 object-cover shadow-sm border border-gray-300"
                        />
                        <div>
                          <div className="font-bold text-black text-base">
                             {rate.currency} 
                             <span className="text-gray-600 font-normal text-sm ml-1 hidden sm:inline">
                               ({rate.name})
                             </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Column 2: Unit */}
                    <td className="p-2 text-center font-medium text-black text-base border-r border-gray-300">
                      {rate.unit}
                    </td>

                    {/* Column 3: Buy */}
                    <td className="p-2 text-right font-medium text-black text-base border-r border-gray-300">
                      {rate.buy.toFixed(2)}
                    </td>

                    {/* Column 4: Sell */}
                    <td className="p-2 text-right font-medium text-black text-base">
                      {rate.sell.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        

      </div>
    </div>
  );
};

export default Forex;