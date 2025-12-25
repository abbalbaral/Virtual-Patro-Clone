import { useEffect, useState } from 'react';
import axios from 'axios'; // The star of the interview!
import { RefreshCw, TrendingUp, Calendar, ArrowRight } from 'lucide-react';

const Forex = () => {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState('');
  const [error, setError] = useState(null);

  // 1. The Axios Function
  const fetchForexData = async () => {
    setLoading(true);
    setError(null);
    try {
      // FETCHING LOCAL JSON (Simulating Real API)
      const response = await axios.get('/data/forex.json');
      
      // DEBUG: Check your console to see if data is loaded
      console.log("Forex Data Loaded:", response.data);

      // JSON Structure is: { status: "success", data: { payload: [...], date: "..." } }
      // So we need to access response.data.data.payload
      if (response.data && response.data.data) {
        setRates(response.data.data.payload);
        setDate(response.data.data.date);
      } else {
        setError("Invalid Data Structure");
      }

    } catch (err) {
      console.error("Error fetching forex:", err);
      setError("Failed to load exchange rates.");
    } finally {
      // Small fake delay just so you can see the loading spinner (User Experience)
      setTimeout(() => setLoading(false), 500);
    }
  };

  // 2. Run on Mount
  useEffect(() => {
    fetchForexData();
  }, []);

  // Helper to get flag url (using a free CDN based on currency code)
  const getFlagUrl = (currency) => `https://flagcdn.com/48x36/${currency.slice(0,2).toLowerCase()}.png`;

  return (
    <div className="bg-slate-100 min-h-screen py-8 px-4 font-mukta">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border-l-8 border-[#842362] flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#842362] flex items-center gap-3">
              <TrendingUp size={32} /> 
              विनिमय दर (Exchange Rate)
            </h1>
            <p className="text-gray-500 mt-2 flex items-center gap-2 text-sm font-medium">
              <Calendar size={16} className="text-orange-500"/> 
              Updated: <span className="text-gray-800">{date || 'Loading...'}</span>
            </p>
          </div>
          
          <button 
            onClick={fetchForexData}
            className="flex items-center gap-2 bg-[#842362] hover:bg-purple-900 text-white px-6 py-2.5 rounded-full shadow-lg transition-all active:scale-95"
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            <span>Refresh Rates</span>
          </button>
        </div>

        {/* Content Area */}
        {error ? (
          <div className="bg-red-50 text-red-600 p-8 text-center rounded-xl border border-red-200">
            {error}. Make sure public/data/forex.json exists.
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
            {loading ? (
              <div className="p-20 text-center text-gray-400 flex flex-col items-center gap-4">
                <RefreshCw size={40} className="animate-spin text-[#842362]" />
                <p>Loading Exchange Rates...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  {/* Table Header */}
                  <thead className="bg-gray-100 text-gray-600 border-b border-gray-300">
                    <tr>
                      <th className="p-4 py-5 font-bold uppercase text-sm tracking-wider">Currency</th>
                      <th className="p-4 py-5 font-bold uppercase text-sm tracking-wider text-center">Unit</th>
                      <th className="p-4 py-5 font-bold uppercase text-sm tracking-wider text-right text-green-700">Buying</th>
                      <th className="p-4 py-5 font-bold uppercase text-sm tracking-wider text-right text-red-600">Selling</th>
                    </tr>
                  </thead>
                  
                  {/* Table Body */}
                  <tbody className="divide-y divide-gray-100">
                    {rates.map((rate) => (
                      <tr key={rate.currency} className="hover:bg-purple-50/50 transition-colors group">
                        
                        {/* Currency Column */}
                        <td className="p-4">
                          <div className="flex items-center gap-4">
                            {/* Flag Circle */}
                            <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 p-1 shadow-sm shrink-0 overflow-hidden relative">
                               {/* Use INR flag for INR, otherwise try CDN */}
                               <img 
                                 src={rate.currency === 'INR' ? 'https://flagcdn.com/48x36/in.png' : getFlagUrl(rate.currency)} 
                                 alt={rate.currency}
                                 className="w-full h-full object-cover rounded-full"
                                 onError={(e) => {e.target.style.display='none'}} // Hide if broken
                               />
                            </div>
                            <div>
                              <div className="font-bold text-lg text-gray-800 flex items-center gap-2">
                                {rate.currency}
                                <ArrowRight size={14} className="text-gray-300 group-hover:text-[#842362] transition-colors"/>
                              </div>
                              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">{rate.name}</div>
                            </div>
                          </div>
                        </td>

                        {/* Unit Column */}
                        <td className="p-4 text-center font-bold text-gray-600 bg-gray-50/30">
                          {rate.unit}
                        </td>

                        {/* Buying Column */}
                        <td className="p-4 text-right font-bold text-lg text-green-700">
                          Rs. {rate.buy.toFixed(2)}
                        </td>

                        {/* Selling Column */}
                        <td className="p-4 text-right font-bold text-lg text-[#D12027]">
                          Rs. {rate.sell.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
        
        <p className="text-center text-gray-400 text-xs mt-8">
          Note: These rates are fixed by Nepal Rastra Bank. (Source: public/data/forex.json)
        </p>

      </div>
    </div>
  );
};

export default Forex;