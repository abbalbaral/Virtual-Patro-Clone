import { Link } from 'react-router-dom';
import { CalendarDays } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#842362] text-white border-t border-white/10 font-mukta mt-auto">
      <div className="lg:mx-auto lg:max-w-[1400px] px-4 py-4">
        
        {/* 
           THE FIX: 
           1. Flex Container with 5 direct children.
           2. 'justify-between' spreads them out evenly across the full width.
           3. 'items-center' keeps them vertically aligned.
        */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 w-full">
          
          {/* ENTITY 1: Logo */}
          <Link to="/" className="shrink-0 flex items-center gap-2 font-bold">
            <img 
              src="/logo.png" 
              alt="Virtual Patro" 
              className="h-14 w-auto object-contain hidden md:block" 
              onError={(e) => {e.target.style.display='none'}}
            />
            {/* Mobile Fallback */}
            <div className="md:hidden flex items-center gap-2">
                <CalendarDays size={28} />
                <span className="font-bold text-xl">Virtual Patro</span>
            </div>
          </Link>

          {/* ENTITY 2: App Store */}
          <a 
            href="https://apps.apple.com" 
            target="_blank" 
            rel="noreferrer" 
            className="shrink-0 hover:scale-105 transition-transform"
          >
            <img 
              src="/app_store.png" 
              alt="App Store" 
              className="h-15 w-auto" 
              onError={(e) => {e.target.style.display='none'; e.target.parentElement.innerText='App Store'}} 
            />
          </a>
          
          {/* ENTITY 3: Play Store */}
          <a 
            href="https://play.google.com" 
            target="_blank" 
            rel="noreferrer" 
            className="shrink-0 hover:scale-105 transition-transform"
          >
            <img 
              src="/play_store.png" 
              alt="Google Play" 
              className="h-15 w-auto" 
              onError={(e) => {e.target.style.display='none'; e.target.parentElement.innerText='Google Play'}} 
            />
          </a>

          {/* ENTITY 4: Approval Text */}
          <p className="text-base md:text-base font-bold opacity-90 text-center lg:text-left">
            नेपाल पञ्चाङ्ग निर्णायक विकास समितिबाट स्वीकृति प्राप्त
          </p>

          {/* ENTITY 5: Copyright Text */}
          <span className="text-[10px] md:text-xs text-gray-300 shrink-0 text-center lg:text-right">
            © २०२५ सर्वाधिकार सुरक्षित भर्चुअल पात्रो
          </span>

        </div>
      </div>
    </footer>
  );
};

export default Footer;