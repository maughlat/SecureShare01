import React, { useState } from 'react'
import { X, Award, FileText, Download } from 'lucide-react'

export const GradingModal = ({ student, submission, onClose, onSave }) => {
  // Convert letter grade to numeric if needed, or use numeric grade directly
  const getInitialGrade = () => {
    if (!submission?.grade) return ''
    // If grade is already numeric, use it
    if (typeof submission.grade === 'number' || !isNaN(parseFloat(submission.grade))) {
      return submission.grade.toString()
    }
    // If it's a letter grade, return empty (let teacher enter numeric)
    return ''
  }
  
  const [grade, setGrade] = useState(getInitialGrade())
  const [feedback, setFeedback] = useState(submission?.feedback || '')
  
  const isGraded = submission?.status === 'graded'

  const handleSave = () => {
    if (!grade) {
      // TODO: Replace with proper error toast/notification
      return
    }
    onSave({
      submissionId: submission?.id,
      studentId: student.id,
      grade,
      feedback
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
          <div className='flex items-center gap-3'>
            <div className='p-2 rounded-lg bg-gradient-to-br from-[#7A1C1C] to-[#9B2D2D]'>
              <Award className='w-5 h-5 text-white' />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Grade Submission</h2>
              <p className="text-sm text-slate-600">{student.name} - {submission?.fileName || 'No file'}</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 overflow-y-auto flex-1">
          <div className="space-y-6">
            {/* Submission Details */}
            <div>
              <h3 className='font-semibold text-slate-800 mb-3'>Submission Details</h3>
              <div className='bg-slate-50 rounded-lg p-4 space-y-2 text-sm'>
                <p><span className='font-medium'>Student:</span> {student.name}</p>
                <p><span className='font-medium'>Student ID:</span> {student.id}</p>
                {submission && (
                  <>
                    <p><span className='font-medium'>File:</span> {submission.fileName}</p>
                    <p><span className='font-medium'>File Size:</span> {submission.fileSize}</p>
                    <p><span className='font-medium'>Submitted:</span> {submission.submittedAt}</p>
                    <p><span className='font-medium'>Course:</span> {submission.course}</p>
                  </>
                )}
              </div>
              {submission && (
                <div className='mt-3'>
                  <button className='flex items-center gap-2 px-4 py-2 bg-[#7A1C1C] hover:bg-[#5a1515] text-white font-semibold rounded-lg transition-colors text-sm'>
                    <Download className='w-4 h-4' />
                    Download File
                  </button>
                </div>
              )}
            </div>

            {/* Grade Selection */}
            <div>
              <label className='block text-sm font-semibold text-slate-700 mb-2'>
                Grade (0-100) {!isGraded && <span className='text-red-500'>*</span>}
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={grade}
                onChange={(e) => {
                  const value = e.target.value
                  // Only allow numbers between 0 and 100
                  if (value === '' || (parseFloat(value) >= 0 && parseFloat(value) <= 100)) {
                    setGrade(value)
                  }
                }}
                disabled={isGraded}
                placeholder="Enter grade (0-100)"
                className={`w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#7A1C1C] focus:border-transparent outline-none ${
                  isGraded ? 'bg-slate-100 cursor-not-allowed' : ''
                }`}
              />
            </div>

            {/* Feedback */}
            <div>
              <label className='block text-sm font-semibold text-slate-700 mb-2'>
                Feedback
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder='Enter your feedback for the student...'
                rows={6}
                disabled={isGraded}
                className={`w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#7A1C1C] focus:border-transparent outline-none resize-none ${
                  isGraded ? 'bg-slate-100 cursor-not-allowed' : ''
                }`}
              />
            </div>
          </div>
        </div>

        {/* Footer - Only show buttons if not graded */}
        {!isGraded && (
          <div className='flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50'>
            <button 
              onClick={onClose}
              className='px-4 py-2.5 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-white transition-colors'
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!grade}
              className='px-6 py-2.5 bg-[#7A1C1C] hover:bg-[#5a1515] text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Save Grade
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

