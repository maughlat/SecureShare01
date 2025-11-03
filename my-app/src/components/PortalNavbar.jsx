import React from 'react'
import { Search, ShieldCheck, Menu, Bell, User } from 'lucide-react'

export const PortalNavbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 lg:px-12 py-5 bg-gradient-to-r from-slate-50 to-white shadow-md border-b border-slate-200">
      {/* Logo Section */}
      <div className='flex items-center space-x-3'>
        <div className='bg-gradient-to-br from-[#7A1C1C] to-[#9B2D2D] p-2.5 rounded-lg shadow-lg'>
          <ShieldCheck className="text-white w-6 h-6" />
        </div>
        <div className='text-left'>
          <h1 className="text-slate-800 text-lg font-bold tracking-tight">SecureShare</h1>
          <p className='text-[#7A1C1C] text-xs font-semibold tracking-wide'>Academic Portal</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex items-center bg-white border border-slate-300 rounded-lg px-4 py-2.5 w-full max-w-md shadow-sm hover:shadow-md transition-shadow duration-200 focus-within:ring-2 focus-within:ring-[#7A1C1C] focus-within:border-[#7A1C1C]">
        <Search className="text-slate-400 w-4 h-4 mr-2 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search files, assignments..."
          className="w-full outline-none text-sm text-slate-700 placeholder-slate-400"
        />
      </div>

      {/* Right Side Actions */}
      <ul className="flex items-center gap-4 lg:gap-6">
        <li className="hidden sm:block">
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#7A1C1C] to-[#9B2D2D] text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-[#8B2323] hover:to-[#A03D3D] transition-all duration-200">
            <ShieldCheck className="w-4 h-4" />
            <span>Encrypted</span>
          </button>
        </li>
        <li className="hidden lg:block">
          <button className="p-2.5 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors duration-200 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#7A1C1C] rounded-full"></span>
          </button>
        </li>
        <li className="hidden lg:block">
          <button className="p-2.5 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors duration-200">
            <User className="w-5 h-5" />
          </button>
        </li>
        <li className="lg:hidden">
          <button className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors duration-200">
            <Menu className="w-6 h-6" />
          </button>
        </li>
      </ul>
    </nav>
  )
}
