import { useState } from 'react'; // 1. Import useState
import { Menu, CalendarDays, X } from 'lucide-react'; // 2. Import 'X' (Close icon)
import { Link } from 'react-router-dom';

const Header = () => {
  // 3. State to control the Mobile Menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "पात्रो", path: "/" },
    { name: "राशिफल", path: "/rashifal" },
    { name: "मिति परिवर्तन", path: "/date-converter" },
    { name: "सपनाको फल", path: "/sapana" },
    { name: "विनिमय दर", path: "/forex" },
    { name: "कर्मकाण्ड", path: "/karmakanda" },
    { name: "हाम्रो बारेमा", path: "/about" },
  ];

  return (
    <nav className="bg-[#842362] shadow-md sticky top-0 z-50 font-mukta text-white">
      
      <div className="lg:mx-auto lg:max-w-[1400px] flex w-full py-1 justify-between items-center pb-1 px-3 md:px-2 relative">
        
        {/* --- LEFT: LOGO --- */}
        <div className="my-2">
          <Link to="/" className="flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
             {/* Logo Icon */}
             <div className="bg-white/10 p-2 rounded-xl">
                <CalendarDays size={32} className="text-white" />
             </div>
             
             {/* Text Logo */}
             <div className="flex flex-row gap-2 leading-none items-center">
                <span className="text-xl md:text-2xl font-bold tracking-wide uppercase">Virtual</span>
                <span className="text-xl md:text-2xl font-bold tracking-wide uppercase">Patro</span>
             </div>
          </Link>
        </div>

        
        <div className="hidden lg:block w-full font-semibold">
          <ul className="flex items-center justify-end h-full text-lg gap-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path}
                  className="m-1 p-2 px-3 hover:bg-[#a9608f] rounded-md transition-colors duration-200 block"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* --- RIGHT: MOBILE HAMBURGER BUTTON --- */}
        <button 
          className="h-full my-auto lg:hidden cursor-pointer p-1 hover:bg-[#a9608f] rounded-md transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle Logic
        >
           {/* Switch icon based on state */}
           {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>

        
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#842362] shadow-xl border-t border-white/10 lg:hidden animate-fade-in-down">
             <ul className="flex flex-col p-4 space-y-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path}
                      // Close menu when a link is clicked
                      onClick={() => setIsMenuOpen(false)}
                      className="block p-3 rounded-lg hover:bg-white/10 font-bold text-lg border-b border-white/5 last:border-0"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
             </ul>
          </div>
        )}

      </div>
    </nav>
  );
};

export default Header;