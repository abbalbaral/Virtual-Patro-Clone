// src/components/Header.jsx
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
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
    // Exact Background Color from Virtual Patro HTML
    <nav className="bg-[#842362] shadow-md sticky top-0 z-50 font-mukta text-white">
      {/* Container - Matches the max-width 1400px from the original site */}
      <div className="lg:mx-auto lg:max-w-[1400px] flex w-full py-1 justify-between items-center pb-1 px-3 md:px-2">
        {/* --- LEFT: LOGO --- */}
        <div className="my-2">
          <Link to="/" className="flex">
            <img
              src="/logo.png"
              alt="Virtual Patro"
              className="h-14 w-44 object-contain"
            />
          </Link>
        </div>

        {/* --- CENTER/RIGHT: DESKTOP MENU --- */}
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

        {/* --- RIGHT: MOBILE HAMBURGER --- */}
        <div className="h-full my-auto lg:hidden cursor-pointer p-1 hover:bg-[#a9608f] rounded-md">
          <Menu size={32} />
        </div>
      </div>
    </nav>
  );
};

export default Header;
