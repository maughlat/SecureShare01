import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

export default function Navbar({ activePage = 'home' }) {
  const navLinks = [
    { name: "Security", path: "/security", key: "security" },
    { name: "About", path: "/about", key: "about" },
  ];

  return (

    <header className="w-full sticky top-0 z-50 pt-8 pb-10 px-4"> 
      <nav className="flex justify-between items-center mx-auto w-full max-w-7xl rounded-full bg-[#7A1C1C] shadow-xl border border-[#9B2D2D] px-8 py-3">
        
        <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <div className='p-2 rounded-full'> 
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          <div className="text-white text-xl font-extrabold">SecureShare</div>
        </Link>
        
        <ul className="flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.key}>
              <Link 
                to={link.path} 
                className={`text-white transition-all duration-300 font-medium relative pb-1 group`}
              >
                {link.name}
                <span 
                  className={`absolute bottom-0 left-0 w-full h-[3px] rounded-full transition-all duration-300
                    ${activePage === link.key 
                      ? 'bg-white scale-x-100' 
                      : 'bg-white scale-x-0 group-hover:scale-x-75' 
                    }
                  `}
                ></span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}