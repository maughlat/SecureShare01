import React from 'react'

export const PortalNavbar = () => {
  return (
        <nav className="flex justify-between items-center px-8 py-4 bg-white border border-b-2">
      <div className='text-center'>
      <h1 className="text-black text-s font-bold">SecureShare</h1>
      <p className='text-[#7A1C1C] text-xs font-semibold'>Academic Portal</p>
      </div>
      <div class="flex items-center border-2 border-gray-300 p-2 w-full h-7 max-w-sm ">
      <input
        type="text"
        placeholder="Search files, assignments..."
        class="w-full outline-none px-2 text-sm"
      />
    </div>

      <ul className="flex gap-8">
        <li><a href="#" className="text-black text-sm border-2 p-1 rounded-lg border-black hover:text-yellow-200">o Encrypted</a></li>

      </ul>
    </nav>
  )
}
