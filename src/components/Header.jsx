import { useState } from "react"; // 1. Import useState
import { Menu, CalendarDays, X } from "lucide-react"; // 2. Import 'X' (Close icon)
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  // 3. State to control the Mobile Menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
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
          <Link
            to="/"
            className="flex items-center gap-3"
            onClick={() => setIsMenuOpen(false)}
          >
            {/* Logo Icon */}
            <img
              src="/logo.png"
              alt="Virtual Patro"
              className="h-12 md:h-16 w-auto object-contain rounded-lg"
              // Fallback: If image fails, show text logo
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          </Link>
        </div>

        <div className="hidden lg:block font-semibold">
          <ul className="flex items-center justify-end h-full text-lg gap-1">
            {navLinks.map((link) => {
              // 3. Check if this link is active
              const isActive = location.pathname === link.path;

              return (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`
                      m-1 p-2 px-3 rounded-md transition-colors duration-200 block
                      hover:bg-[#a9608f]
                      /* 4. Apply Yellow Color if Active, White if not */
                      ${
                        isActive
                          ? "text-orange-400 font-bold bg-white/10"
                          : "text-white"
                      }
                    `}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <button
          className="h-full my-auto lg:hidden cursor-pointer p-1 hover:bg-[#a9608f] rounded-md transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle Logic
        >
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>

        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#842362] shadow-xl border-t border-white/10 lg:hidden animate-fade-in-down">
            <ul className="flex flex-col p-4 space-y-2">
              {navLinks.map((link) => {
                //checking the link is active or not for mobile.
                const isActive = location.pathname === link.path;

                return (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`
                          block p-3 rounded-lg border-b border-white/5 last:border-0
                          hover:bg-white/10 
                          ${
                            isActive
                              ? "text-orange-400 font-bold bg-white/10"
                              : "text-white font-normal"
                          }
                        `}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
