import React, { useState } from 'react'
import { X, Share2, Mail, UserPlus, Upload, FileText } from 'lucide-react'

export const ShareAccessModal = ({ onClose, onShare }) => {
  const [emails, setEmails] = useState('')
  const [role, setRole] = useState('Student')
  const [selectedFile, setSelectedFile] = useState(null)
  const [error, setError] = useState('')

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const list = emails.split(',').map(e => e.trim()).filter(Boolean)
    if (list.length === 0) {
      setError('Enter at least one email')
      return
    }
    if (!selectedFile) {
      setError('Please select a file to share')
      return
    }
    setError('')
    if (onShare) onShare({ emails: list, role, file: selectedFile })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
          <div className='flex items-center gap-2'>
            <div className='p-2 rounded-lg bg-gradient-to-br from-[#7A1C1C] to-[#9B2D2D]'>
              <Share2 className='w-4 h-4 text-white' />
            </div>
            <h2 className="text-lg font-bold text-slate-800">Share access</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-md text-slate-600 hover:bg-slate-100">
            <X className='w-5 h-5' />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
          {/* File Selection */}
          <div>
            <label className='block text-sm font-semibold text-slate-700 mb-2'>
              Choose File <span className='text-red-500'>*</span>
            </label>
            <label className='block'>
              <input
                type='file'
                className='hidden'
                onChange={handleFileSelect}
                accept='.pdf,.doc,.docx,.ppt,.pptx,.jpg,.png'
              />
              <div className='flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-[#7A1C1C] transition-colors cursor-pointer'>
                <Upload className='w-5 h-5 text-slate-400' />
                <span className='text-sm font-medium text-slate-600'>
                  {selectedFile ? selectedFile.name : 'Choose File'}
                </span>
              </div>
            </label>
            <p className='mt-1 text-xs text-slate-500'>Accepted: PDF, DOC, DOCX, PPT, PPTX, JPG, PNG</p>
          </div>

          {/* Email Input */}
          <div>
            <label className='block text-sm font-semibold text-slate-700 mb-2'>
              Invite by Email <span className='text-red-500'>*</span>
            </label>
            <div className='flex items-center border rounded-lg px-3 py-2 border-slate-300 focus-within:border-[#7A1C1C]'>
              <Mail className='w-4 h-4 text-slate-400 mr-2' />
              <input
                type="text"
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
                placeholder="student@univ.edu, prof@univ.edu"
                className='w-full outline-none text-sm'
              />
            </div>
            <p className='mt-1 text-xs text-slate-500'>Separate multiple emails with commas</p>
          </div>

          {/* Role Selection */}
          <div>
            <label className='block text-sm font-semibold text-slate-700 mb-2'>Role</label>
            <div className='flex items-center gap-2'>
              <UserPlus className='w-4 h-4 text-slate-400' />
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)} 
                className='border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#7A1C1C] w-full'
              >
                <option value='Student'>Student</option>
                <option value='Teacher'>Teacher</option>
              </select>
            </div>
          </div>

          {error && <p className='text-xs text-red-600 bg-red-50 p-2 rounded'>{error}</p>}
        </form>

        <div className='flex items-center justify-end gap-2 px-6 py-4 border-t border-slate-200 bg-slate-50'>
          <button onClick={onClose} type='button' className='px-4 py-2 text-sm rounded-lg border border-slate-300 text-slate-700 hover:bg-white transition-colors'>Cancel</button>
          <button onClick={handleSubmit} type='submit' className='px-4 py-2 text-sm rounded-lg text-white bg-[#7A1C1C] hover:bg-[#5a1515] transition-colors'>Share</button>
        </div>
      </div>
    </div>
  )
}



