import { Link } from 'react-router-dom';
import { CalendarDays } from 'lucide-react'; // Fallback logo

const Footer = () => {
  return (
    <footer className="bg-[#842362] text-white border-t border-white/10 font-mukta mt-auto">
      <div className="lg:mx-auto lg:max-w-[1400px] flex flex-wrap justify-between items-center py-4 px-4">
        
        {/* 1. Left: Logo & App Links */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full md:w-auto mb-4 md:mb-0">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            {/* Try to load image, fallback to Icon if missing */}
            <img src="/logo.png" alt="Virtual Patro" className="h-12 w-auto object-contain hidden md:block" onError={(e) => e.target.style.display='none'}/>
            <div className="md:hidden flex items-center gap-2">
                <CalendarDays size={28} />
                <span className="font-bold text-xl">Virtual Patro</span>
            </div>
          </Link>

          {/* App Store Badges */}
          <div className="flex gap-2">
            <a href="#" className="hover:opacity-80 transition">
              <img src="/app_store.png" alt="App Store" className="h-8 md:h-10" onError={(e) => {e.target.style.display='none'; e.target.parentElement.innerHTML='<span class="border px-2 py-1 rounded text-xs">App Store</span>'}} />
            </a>
            <a href="#" className="hover:opacity-80 transition">
              <img src="/play_store.png" alt="Play Store" className="h-8 md:h-10" onError={(e) => {e.target.style.display='none'; e.target.parentElement.innerHTML='<span class="border px-2 py-1 rounded text-xs">Google Play</span>'}} />
            </a>
          </div>
        </div>

        {/* 2. Right: Text Info */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right gap-1 w-full md:w-auto">
          <p className="text-xs md:text-sm font-light opacity-90">
            नेपाल पञ्चाङ्ग निर्णायक विकास समितिबाट स्वीकृति प्राप्त
          </p>
          <span className="text-[10px] md:text-xs text-gray-300">
            © २०२५ सर्वाधिकार सुरक्षित भर्चुअल पात्रो
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;