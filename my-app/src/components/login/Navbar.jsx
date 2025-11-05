import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-[#7A1C1C]">
      <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
      <div className='bg-gradient-to-br from-[#7A1C1C] to-[#9B2D2D] p-2.5 rounded-lg shadow-lg'>
          <ShieldCheck className="text-white w-6 h-6" />
        </div>
        <div className="text-white text-xl font-extrabold">SecureShare</div>
      </Link>
      
      <ul className="flex gap-8">
        <li><a href="#" className="text-white hover:text-yellow-200">Features</a></li>
        <li><a href="#" className="text-white hover:text-yellow-200">Security</a></li>
        <li><Link to="/about" className="text-white hover:text-yellow-200">About</Link></li>
      </ul>
    </nav>
  );
}



