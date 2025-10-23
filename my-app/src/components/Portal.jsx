// UPDATED: Added useState import for modal state management
import React, { useState } from 'react'
// ADDED: Import FileUpload component
import { FileUpload } from './FileUpload'

export const Portal = () => {
  // ADDED: State to control upload modal visibility
  const [showUploadModal, setShowUploadModal] = useState(false);

  return (
    <header>
      <div className='container mx-auto bg-gray-100 min-h-screen m-0 p-0'>
        <div>
          <h1 className='text-4xl font-bold text-[#585658] mt-6 ml-4'>
            Welcome Back, <span>Alex!</span>
            </h1>
          <p className='text-[#A6A4AA] ml-4'>
            Your secure workspace for academic collaboration
            </p>
        </div>

        <ul className='flex flex-col sm:flex-row gap-4 lg:gap-5 ml-4 mt-8 mr-10'>
          <li className='bg-white hover:bg-[#F9F0D9] w-full px-6 py-5 text-sm rounded-md border-solid border-2 border-[#ACA8AE] transition-colors cursor-default'>
            <p className='font-semibold'>Total Files</p>
            <span className='text-4xl text-[#7A1C1C] font-bold'>24</span>
            <p className='italic'>+3 this week</p>
            </li>
          <li className='bg-white hover:bg-[#F9F0D9] w-full px-6 py-5 text-sm rounded-md border-solid border-2 border-[#ACA8AE] transition-colors cursor-default'>
            <p className='font-semibold'>Uploaded</p>
            <span className='text-4xl text-[#7A1C1C] font-bold'>24</span>
            <p className='italic'>+3 this week</p>
            </li>
          <li className='bg-white hover:bg-[#F9F0D9] w-full px-6 py-5 text-sm rounded-md border-solid border-2 border-[#ACA8AE] transition-colors cursor-default'>
            <p className='font-semibold'>Downloaded</p>
            <span className='text-4xl text-[#7A1C1C] font-bold'>24</span>
            <p className='italic'>+3 this week</p>
            </li>
          <li className='bg-white hover:bg-[#F9F0D9] w-full px-6 py-5 text-sm rounded-md border-solid border-2 border-[#ACA8AE] transition-colors cursor-default'>
            <p className='font-semibold'>Shared With</p>
            <span className='text-4xl text-[#7A1C1C] font-bold'>24</span>
            <p className='italic'>+3 this week</p>
            </li>
        </ul>

        <div>
          <h2 className='text-2xl font-bold text-[#585658] mt-10 ml-4 m-auto'>Quick Actions</h2>

          <ul className='flex flex-col sm:flex-row gap-4 lg:gap-5 ml-4 mt-4 mr-10'>
            {/* UPDATED: Made this clickable to open upload modal */}
            <li 
              onClick={() => setShowUploadModal(true)}
              className='bg-white w-full px-6 py-5 text-sm rounded-md border-2 border-[#ACA8AE] cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#F9F0D9] hover:-translate-y-1 hover:shadow-lg'
            >
              <p className='font-semibold'>Upload a file</p>
              <p className='text-xs'>.DOCX, .PDF, .PPTX, .JPG, .PNG</p>
            </li>
            <li className='bg-white w-full px-6 py-5 text-sm rounded-md border-2 border-[#ACA8AE] cursor-default transition-all duration-300 ease-in-out hover:bg-[#F9F0D9] hover:-translate-y-1 hover:shadow-lg'>
              <p className='font-semibold'>Create a folder</p>
              <p className='text-xs'>Organize your files</p>
              </li>
            <li className='bg-white w-full px-6 py-5 text-sm rounded-md border-2 border-[#ACA8AE] cursor-default transition-all duration-300 ease-in-out hover:bg-[#F9F0D9] hover:-translate-y-1 hover:shadow-lg'>
              <p className='font-semibold'>Share Access</p>
              <p className='text-xs'>Collaborate with others</p>
              </li>
            <li className='bg-white w-full px-6 py-5 text-sm rounded-md border-2 border-[#ACA8AE] cursor-default transition-all duration-300 ease-in-out hover:bg-[#F9F0D9] hover:-translate-y-1 hover:shadow-lg'>
              <p className='font-semibold'>Security Settings</p>
              <p className='text-xs'>Manage permission</p>
              </li>
        </ul>
        </div>

        <section className='flex flex-col sm:flex-row gap-4 lg:gap-5 ml-4 mr-10 py-12'>
          <div className='w-full h-auto lg:h-[450px] rounded-lg bg-white border-2 border-[#ACA8AE]'>
            <h2 className='px-6 py-5 mb-4 font-bold text-xl text-[#7A1C1C]'>
              Recent Files
              </h2>
                <ul>
                  <li className='px-6 font-semibold  hover:bg-slate-100'>Computer Science Assignment<span>.pdf</span>
                    <p className='text-xs font-light mb-4'>
                      <span>2.4 MB</span> | <span>Prof. Smith</span> | <span>2 hours ago</span>
                    </p>
                    <hr className=' border-t-2'/>
                  </li>
              
                <li className='px-6 font-semibold  hover:bg-slate-100 '>Data Structure Lecture Notes<span>.pdf</span>
                    <p className='text-xs font-light mb-2'>
                      <span>1.8 MB</span> | <span>Prof. Johnson</span> | <span>5 hours ago</span>
                    </p>
                    <hr className='border-t-2'/>
                  </li>
              
                  <li className='px-6 font-semibold hover:bg-slate-100 mt-2'>Lab Report - Week 5<span>.docx</span>
                  
                    <p className='text-xs font-light mb-2'>
                      <span>824 KB</span> | <span>You</span> | <span>2 days ago</span>
                    </p>
                    <hr className='border-t-2'/>
                  </li>
              
                <li className='px-6 font-semibold hover:bg-slate-100 mt-2'>Research Data Analysis<span>.xlsx</span>
                    <p className='text-xs font-light mb-2'>
                      <span>3.2 MB</span> | <span>Sara Duterte</span> | <span>3 days ago</span>
                    </p>
                    <hr className='border-t-2'/>
                  </li>
              
                </ul>
            <div>

            </div>
          </div>

          <div className='w-full max-w-[350px] h-auto lg:h-[650px] rounded-lg bg-white border-2 border-[#ACA8AE]'>
            <h2 className='px-6 py-5 font-bold text-xl text-[#7A1C1C]'>Recent Activity</h2>
          </div>
        </section>
      </div>

      {/* ADDED: File upload modal - shown when showUploadModal is true */}
      {showUploadModal && (
        <FileUpload onClose={() => setShowUploadModal(false)} />
      )}
  </header>
  )
}