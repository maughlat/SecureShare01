import React from "react";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-[#7A1C1C]">
      <div className="text-white text-xl font-extrabold">SecureShare</div>
      <ul className="flex gap-8">
        <li><a href="#" className="text-white hover:text-yellow-200">Features</a></li>
        <li><a href="#" className="text-white hover:text-yellow-200">Security</a></li>
        <li><a href="#" className="text-white hover:text-yellow-200">About</a></li>
      </ul>
    </nav>
  );
}


