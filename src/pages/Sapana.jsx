import { useEffect, useState } from 'react';
import { getDreamData } from '../services/api'; 
import { Moon } from 'lucide-react';

const Sapana = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const result = await getDreamData();
      setData(result);
      setTimeout(() => setLoading(false), 300);
    };
    loadData();
  }, []);

  if (loading || !data) return <div className="p-10 text-center text-gray-500">Loading...</div>;

  return (
    <div className="bg-slate-100 min-h-screen py-8 px-2 font-mukta">
      <div className="max-w-4xl mx-auto">
        
        {/* --- HEADER --- */}

        {/* --- 1. THE TABLE (Clone of Forex Style) --- */}
        <div className="bg-white shadow-lg border border-gray-400 mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              
              <thead>
                {/* MERGED TITLE ROW (Orange Text) */}
                <tr className="bg-white border-b-2 border-gray-400">
                  <th colSpan="2" className="p-4 text-center text-3xl font-bold text-orange-500">
                    {data.title}
                  </th>
                </tr>

                {/* HEADER ROW (Bold, White Background) */}
                <tr className="bg-white text-black border-b border-gray-400">
                  <th className="p-3 border-r border-gray-400 font-bold text-2xl w-1/2 text-center">संकेत</th>
                  <th className="p-3 font-bold text-2xl w-1/2 text-center">अर्थ</th>
                </tr>
              </thead>
              
              {/* DATA ROWS (Alternating Gray/White) */}
              <tbody>
                {data.tableData.map((item, idx) => (
                  <tr 
                    key={idx} 
                    className={`
                      border-b border-gray-400 transition-colors
                      ${idx % 2 === 0 ? "bg-[#F2F2F2]" : "bg-white"} 
                      hover:bg-purple-100
                    `}
                  >
                    {/* Sanket */}
                    <td className="p-2 pl-4 border-r border-gray-400 font-medium text-black text-sm md:text-base">
                      {item.sanket}
                    </td>

                    {/* Artha */}
                    <td className="p-2 pl-4 text-black text-sm md:text-base">
                      {item.artha}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- 2. TEXT PARAGRAPHS --- */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-6 mb-8">
          
          {/* Ramra Sapana */}
          <div>
            <span className="font-bold text-[#842362] text-lg block mb-1">{data.ramra_title}</span>
            <p className="text-gray-700 text-justify leading-relaxed text-sm md:text-base">
              {data.ramra_text}
            </p>
          </div>

          {/* Naramra Sapana */}
          <div>
            <span className="font-bold text-[#842362] text-lg block mb-1">{data.naramra_title}</span>
            <p className="text-gray-700 text-justify leading-relaxed text-sm md:text-base">
              {data.naramra_text}
            </p>
          </div>

        </div>

        {/* --- 3. YELLOW FOOTER BOX --- */}
        <div className="bg-[#fff9c4] border border-yellow-200 p-6 rounded-lg shadow-sm text-center md:text-justify">
           <p className="text-gray-800 text-sm md:text-base leading-loose">
             {data.footer_note}
           </p>
        </div>

      </div>
    </div>
  );
};

export default Sapana;