import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux"; // To get current Nepali date
import {
  convertToNepaliDigit,
  NEPAL_MONTHS_BS,
} from "../utils/calendarGenerator";

const Rashifal = () => {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState("daily"); // 'daily', 'monthly', 'yearly'
  const [loading, setLoading] = useState(true);

  // Get Date from Redux (The Brain)
  const { bsDate } = useSelector((state) => state.calendar);

  // Parse Date: "2082-09-09" -> year=2082, month=9, day=9
  const [year, month, day] = bsDate.split("-").map(Number);
  const monthName = NEPAL_MONTHS_BS[month - 1]; // Adjust for 0-index array if needed, usually 1-12 in string
  // Note: In our Redux, month 09 means Poush (Index 8). Let's use the array directly:
  // We used a helper in utils, let's reuse that logic or just map roughly for display.
  // Actually, bsDate "2082-09-09" in the context of the app:
  // If we assume standard 1=Baisakh, then 9=Poush.
  const currentMonthName = NEPAL_MONTHS_BS[month - 1] || "पुष";
  const currentDay = convertToNepaliDigit(day);
  const currentYear = convertToNepaliDigit(year);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/data/rashifal.json");
        setData(response.data);
      } catch (e) {
        console.error("Error fetching rashifal", e);
      } finally {
        setTimeout(() => setLoading(false), 300);
      }
    };
    fetchData();
  }, []);

  const getContent = (zodiac) => {
    if (activeTab === "daily") return zodiac.daily;
    if (activeTab === "monthly") return zodiac.monthly;
    return zodiac.yearly;
  };

  // --- DYNAMIC HEADER TEXT LOGIC ---
  const getHeaderText = () => {
    if (activeTab === "daily") {
      return {
        title: "आजको राशिफल - Today's Horoscope",
        sub: `${currentYear} ${currentMonthName} ${currentDay} गतेको राशिफल`,
      };
    }
    if (activeTab === "monthly") {
      return {
        title: "मासिक राशिफल - Monthly Horoscope",
        sub: `${currentYear} ${currentMonthName} को राशिफल`,
      };
    }
    return {
      title: "वार्षिक राशिफल - Yearly Horoscope",
      sub: `${currentYear} साल को राशिफल`,
    };
  };

  const headerInfo = getHeaderText();

  return (
    <div className="bg-slate-100 min-h-screen py-6 px-2 font-mukta">
      <div className="max-w-7xl mx-auto">
        {/* --- HEADER SECTION --- */}
        <div className="mb-6 border-b border-gray-400 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* LEFT: BUTTON GROUP (Table-like Grid) */}
            <div className="grid grid-cols-3 border border-gray-300 rounded-md overflow-hidden text-sm md:text-base shadow-sm">
              {["daily", "monthly", "yearly"].map((tab, index) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    px-6 py-2 font-bold transition-colors border-r border-gray-300 last:border-r-0
                    ${
                      activeTab === tab
                        ? "bg-orange-500 text-white"
                        : "bg-white text-black hover:bg-gray-50"
                    }
                  `}
                >
                  {tab === "daily" && "दैनिक"}
                  {tab === "monthly" && "मासिक"}
                  {tab === "yearly" && "वार्षिक"}
                </button>
              ))}
            </div>

            {/* RIGHT: DYNAMIC TITLE TEXT */}
            <div className="text-left md:text-right">
              <h1 className="text-xl md:text-2xl font-bold text-orange-500">
                {headerInfo.title}
              </h1>
              <p className="text-black font-medium text-sm md:text-base mt-1 md:text-left">
                {headerInfo.sub}
              </p>
            </div>
          </div>
        </div>

        {/* --- CONTENT CARDS --- */}
        {loading ? (
          <div className="text-center p-20 text-gray-400">लोड हुँदैछ...</div>
        ) : (
          <div
            className={`
             grid gap-6
             ${
               activeTab === "daily"
                 ? "grid-cols-1"
                 : "grid-cols-1 md:grid-cols-2"
             }
          `}
          >
            {data.map((zodiac) => (
              <div
                key={zodiac.id}
                className={`
                  bg-white border border-gray-200 rounded-xl shadow-md p-4
                  ${
                    activeTab === "daily"
                      ? "flex flex-col md:flex-row items-center md:items-start gap-4"
                      : "flex flex-col gap-3"
                  }
                  ${activeTab === "yearly" ? "min-h-[400px]" : ""} 
                `}
              >
                {/* 1. Icon & Name */}
                <div
                  className={`
                   shrink-0 flex items-center gap-4
                   ${
                     activeTab === "daily"
                       ? "w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0"
                       : "border-b border-gray-100 pb-2"
                   }
                `}
                >
                  {/* Icon Circle */}
                  <div className="w-16 h-16 rounded-full bg-gray-50 border border-gray-200 p-1 flex items-center justify-center overflow-hidden shrink-0">
                    <img
                      src={zodiac.img}
                      alt={zodiac.name}
                      className="w-full h-full object-cover"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  </div>

                  {/* Info */}
                  <div>
                    <h2 className="text-2xl font-bold text-[#842362] flex gap-2 items-center">
                      {zodiac.name}
                      <span className="text-sm font-semibold text-gray-400 font-sans">
                        ({zodiac.eng})
                      </span>
                    </h2>

                    {/* Lucky Letters (Always show) */}
                    <div className="text-xs text-orange-500 mt-1 font-medium leading-tight">
                      {zodiac.letters}
                    </div>
                  </div>
                </div>

                {/* 2. Text Content */}
                <div className="flex-grow">
                  <p
                    className={`
                     text-gray-700 text-lg leading-relaxed text-justify
                     ${activeTab === "daily" ? "pt-2 md:pt-0" : ""}
                   `}
                  >
                    {getContent(zodiac)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rashifal;
