import { useEffect, useState } from 'react';
import axios from 'axios';
import { convertToNepaliDigit } from '../utils/calendarGenerator'; // Reuse our helper

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/data/calendar_data.json');
        
        // Transform the data for display
        const rawEvents = response.data.events || [];
        
        const formattedEvents = rawEvents.map(evt => ({
          // Convert '10' -> '१०'
          day: convertToNepaliDigit(evt.day),
          title: evt.title,
          isHoliday: evt.is_holiday
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching upcoming events", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="border border-slate-200 shadow-lg shadow-slate-500/50 p-3 flex flex-col items-center bg-white rounded-xl font-mukta h-full">
      <h1 className="text-2xl font-bold text-[#842362] w-full p-2 text-center rounded-md">
        आउँदा दिनहरु
      </h1>
      <div className="w-full max-h-[350px] overflow-auto p-2 scrollbar-thin">
        <ul className="w-full">
          {events.map((event, index) => (
            <li 
              key={index}
              className="w-full bg-white text-lg my-3 rounded-md flex shadow-md shadow-gray-500/50 overflow-hidden border border-gray-100"
            >
              <div className="bg-[#842362] text-gray-50 p-2 px-3 w-16 text-center font-bold text-xl flex items-center justify-center">
                {event.day}
              </div>
              <div className={`my-auto px-4 text-lg ${event.isHoliday ? 'text-orange-600' : 'text-gray-700'}`}>
                {event.title}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UpcomingEvents;