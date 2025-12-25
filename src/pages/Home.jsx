// src/pages/Home.jsx
import CalendarWidget from '../components/CalendarWidget';
import TodayWidget from '../components/TodayWidget';
import UpcomingEvents from '../components/UpcomingEvents';
import HoroscopeWidget from '../components/HoroscopeWidget';

const Home = () => {
  return (
    <div className="bg-slate-100 min-h-screen pb-10 font-mukta">
      
      {/* 
         LAYOUT STRATEGY:
         - Mobile: We use 'flex-col'. The 'contents' wrapper disappears, so all 3 items become siblings. 
                   We use 'order-1', 'order-2', 'order-3' to sort them.
         - Desktop: We use 'grid-cols-10'. The wrapper becomes a REAL column (col-span-3).
                    Inside it, we stack widgets tightly with 'flex-col gap-3'.
      */}
      <div className="lg:mx-auto lg:max-w-[1400px] flex flex-col lg:grid lg:grid-cols-10 gap-4 pt-2 px-2 items-start">
        
        {/* --- LEFT SIDEBAR WRAPPER --- */}
        {/* 
           'contents': On Mobile, this div effectively vanishes. Its children become direct children of the parent.
           'lg:flex': On Desktop, this div reappears as a Flex Column. This ensures Today & Upcoming are TIGHT.
        */}
        <div className="contents lg:flex lg:flex-col lg:col-span-3 gap-3 h-full">
           
           {/* 1. Today Widget */}
           <div className="order-1 w-full">
             <TodayWidget />
           </div>

           {/* 3. Upcoming Events (Order 3 on Mobile to go BELOW Calendar) */}
           <div className="order-3 w-full pt-2">
             <UpcomingEvents />
           </div>

        </div>

        {/* --- 2. CALENDAR WIDGET --- */}
        {/* Order 2 on Mobile (Sits between Today and Upcoming) */}
        <div className="order-2 lg:order-none w-full lg:col-span-7 lg:pt-4">
           <CalendarWidget />
        </div>

      </div>

      {/* HOROSCOPE (Full Width) */}
      <div className="lg:mx-auto lg:max-w-[1400px] mt-8 px-2">
         <HoroscopeWidget />
      </div>

    </div>
  );
};

export default Home;