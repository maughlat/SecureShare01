import React from 'react'
import { Search, ShieldCheck, Menu, Bell, User } from 'lucide-react'

export const PortalNavbar = ({ onToggleSidebar }) => {
  return (
    <nav className="flex justify-between items-center px-6 lg:px-12 py-5 bg-[#7A1C1C] text-white shadow-md">
      {/* Logo Section */}
      <div className='flex items-center space-x-3'>
        <button onClick={onToggleSidebar} aria-label="Toggle sidebar" className="p-2 rounded-lg hover:bg-white/10 transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <div className='bg-gradient-to-br from-[#7A1C1C] to-[#9B2D2D] p-2.5 rounded-lg shadow-lg'>
          <ShieldCheck className="text-white w-6 h-6" />
        </div>
        <div className='text-left'>
          <h1 className="text-white text-lg font-bold tracking-tight">SecureShare</h1>
          <p className='text-red-200 text-xs font-semibold tracking-wide'>Academic Portal</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex items-center bg-white border border-transparent rounded-lg px-4 py-2.5 w-full max-w-md shadow-sm hover:shadow-md transition-shadow duration-200 focus-within:ring-2 focus-within:ring-[#9B2D2D]">
        <Search className="text-slate-500 w-4 h-4 mr-2 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search files, assignments..."
          className="w-full outline-none text-sm text-slate-700 placeholder-slate-400"
        />
      </div>

      {/* Right Side Actions */}
      <ul className="flex items-center gap-4 lg:gap-6">
        <li className="hidden sm:block">
          <button className="flex items-center gap-2 px-4 py-2 bg-white text-[#7A1C1C] text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
            <ShieldCheck className="w-4 h-4" />
            <span>Encrypted</span>
          </button>
        </li>
        <li className="hidden lg:block">
          <button className="p-2.5 text-white hover:bg-white/10 rounded-lg transition-colors duration-200 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full"></span>
          </button>
        </li>
        <li className="hidden lg:block">
          <button className="p-2.5 text-white hover:bg-white/10 rounded-lg transition-colors duration-200">
            <User className="w-5 h-5" />
          </button>
        </li>
        
      </ul>
    </nav>
  )
}
