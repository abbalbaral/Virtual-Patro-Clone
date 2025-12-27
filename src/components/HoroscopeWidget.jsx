import { useRef, useEffect, useState } from 'react';
import { getRashifal } from '../services/api'; 
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HoroscopeWidget = () => {
  const scrollRef = useRef(null);
  
  // 1. STATE: To hold the fetched data
  const [horoscopeData, setHoroscopeData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. FETCH DATA: Runs once when component loads
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await getRashifal(); // CALL SERVICE
      if(data) setHoroscopeData(data); 
      setTimeout(() => setLoading(false), 300);
    };
    loadData();
  }, []);

  // 3. AUTO SCROLL LOGIC
  useEffect(() => {
    if (loading || horoscopeData.length === 0) return;
    const interval = setInterval(() => { scroll('right'); }, 8000);
    return () => clearInterval(interval);
  }, [loading, horoscopeData]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 672; // Scroll 2 cards approx
      if (direction === 'left') {
        current.scrollLeft -= scrollAmount;
      } else {
        const maxScroll = current.scrollWidth - current.clientWidth;
        if (current.scrollLeft >= maxScroll - 10) current.scrollTo({ left: 0, behavior: 'smooth' });
        else current.scrollLeft += scrollAmount;
      }
    }
  };

  if (loading) return <div className="text-center p-10">राशिफल लोड हुँदैछ...</div>;

  return (
    <div className="w-full font-mukta relative group mb-10">
      <div className="text-center mb-6">
         <h1 className="text-[#842362] text-3xl font-bold font-serif inline-block border-b-2 border-orange-400 pb-1">
           आजको राशिफल
         </h1>
      </div>

      <button onClick={() => scroll('left')} className="absolute left-0 top-[55%] -translate-y-1/2 z-20 bg-[#842362] text-white p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:scale-110 hidden md:block">
        <ChevronLeft size={28} />
      </button>

      {/* Container */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 p-4 scroll-smooth scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {horoscopeData.map((zodiac) => (
          <div 
            key={zodiac.id} 
            className="w-96 md:w-[360px] flex-shrink-0 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-5 flex flex-col gap-3"
          >
            <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
               <div className="w-14 h-14 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                 {/* Uses image path from JSON */}
                 <img src={zodiac.img} alt={zodiac.name} className="w-full h-full object-cover" 
                      onError={(e) => {e.target.style.display='none'}} /> 
               </div>
               <div className="flex flex-col">
                 <span className="text-2xl font-bold text-[#842362]">{zodiac.name}</span>
                 <span className="text-sm font-semibold text-gray-500">({zodiac.eng})</span>
               </div>
            </div>

            <div className="flex flex-col gap-2 h-full">
                <div className="text-orange-500 text-sm font-medium">
                   {zodiac.letters}
                </div>
                <p className="text-gray-700 text-lg leading-relaxed text-justify line-clamp-4">
                   {zodiac.daily}
                </p>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => scroll('right')} className="absolute right-0 top-[55%] -translate-y-1/2 z-20 bg-[#842362] text-white p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:scale-110 hidden md:block">
        <ChevronRight size={28} />
      </button>

    </div>
  );
};

export default HoroscopeWidget;