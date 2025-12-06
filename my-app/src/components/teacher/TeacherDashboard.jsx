import React, { useState } from 'react'
import { FileText, Users, CheckCircle, User, Award, ArrowLeft } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { GradingModal } from './GradingModal'

export const TeacherDashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [showGradingModal, setShowGradingModal] = useState(false)

  // Get courseId from location state or default to navigating to manage-classes
  const courseId = location.state?.courseId

  // Mock data - in production, this would come from API
  // This represents students enrolled in the selected course/assignment
  const students = [
    {
      id: 'STU-2024-001',
      name: 'John Doe',
      submission: {
        id: 1,
        fileName: 'Assignment_1_Computer_Science.pdf',
        fileSize: '2.4 MB',
        submittedAt: '2024-01-15 10:30 AM',
        course: 'CS101 - Introduction to Computer Science',
        status: 'pending',
        grade: null,
        feedback: null
      }
    },
    {
      id: 'STU-2024-002',
      name: 'Jane Smith',
      submission: {
        id: 2,
        fileName: 'Lab_Report_Week_5.docx',
        fileSize: '1.8 MB',
        submittedAt: '2024-01-15 09:15 AM',
        course: 'CS101 - Introduction to Computer Science',
        status: 'graded',
        grade: 'A',
        feedback: 'Excellent work! Well-structured analysis.'
      }
    },
    {
      id: 'STU-2024-003',
      name: 'Mike Johnson',
      submission: {
        id: 3,
        fileName: 'Project_Proposal.pdf',
        fileSize: '3.2 MB',
        submittedAt: '2024-01-14 04:45 PM',
        course: 'CS201 - Data Structures',
        status: 'pending',
        grade: null,
        feedback: null
      }
    },
    {
      id: 'STU-2024-004',
      name: 'Sarah Williams',
      submission: null // No submission yet
    },
    {
      id: 'STU-2024-005',
      name: 'David Brown',
      submission: null
    }
  ]

  const handleStudentClick = (student) => {
    // Only allow clicking if student has a submission
    if (!student.submission) {
      return
    }
    setSelectedStudent(student)
    setShowGradingModal(true)
  }

  const handleSaveGrade = (gradeData) => {
    // In production, this would make an API call to save the grade
    // TODO: Replace with API call and toast notification
    setShowGradingModal(false)
    setSelectedStudent(null)
  }

  const pendingCount = students.filter(s => s.submission && s.submission.status === 'pending').length
  const gradedCount = students.filter(s => s.submission && s.submission.status === 'graded').length

  const handleBack = () => {
    if (courseId) {
      navigate(`/teacher-dashboard/manage-classes/course/${courseId}`)
    } else {
      navigate('/teacher-dashboard/manage-classes')
    }
  }

  return (
    <div className='container mx-auto bg-gradient-to-br from-slate-50 via-white to-slate-50 min-h-screen m-0 p-0'>
      {/* Header with Back Button */}
      <div className='px-6 lg:px-12 pt-8 pb-6'>
        <button
          onClick={handleBack}
          className='flex items-center gap-2 text-slate-600 hover:text-[#7A1C1C] transition-colors mb-4'
        >
          <ArrowLeft className='w-5 h-5' />
          <span className='font-medium'>Back to Assignment</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className='px-6 lg:px-12 mb-8'>
        <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
          <li className='bg-white hover:bg-gradient-to-br hover:from-white hover:to-slate-50 w-full px-6 py-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-default group'>
            <div className='flex items-center justify-between mb-3'>
              <p className='font-semibold text-slate-600 text-sm uppercase tracking-wide'>Pending Grades</p>
              <FileText className='w-5 h-5 text-slate-400 group-hover:text-[#7A1C1C] transition-colors' />
            </div>
            <span className='text-4xl text-[#7A1C1C] font-bold block mb-1'>{pendingCount}</span>
            <p className='text-xs text-slate-500'>Requires attention</p>
          </li>
          <li className='bg-white hover:bg-gradient-to-br hover:from-white hover:to-slate-50 w-full px-6 py-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-default group'>
            <div className='flex items-center justify-between mb-3'>
              <p className='font-semibold text-slate-600 text-sm uppercase tracking-wide'>Graded</p>
              <CheckCircle className='w-5 h-5 text-slate-400 group-hover:text-[#7A1C1C] transition-colors' />
            </div>
            <span className='text-4xl text-[#7A1C1C] font-bold block mb-1'>{gradedCount}</span>
            <p className='text-xs text-slate-500'>Completed</p>
          </li>
          <li className='bg-white hover:bg-gradient-to-br hover:from-white hover:to-slate-50 w-full px-6 py-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-default group'>
            <div className='flex items-center justify-between mb-3'>
              <p className='font-semibold text-slate-600 text-sm uppercase tracking-wide'>Total Students</p>
              <Users className='w-5 h-5 text-slate-400 group-hover:text-[#7A1C1C] transition-colors' />
            </div>
            <span className='text-4xl text-[#7A1C1C] font-bold block mb-1'>{students.length}</span>
            <p className='text-xs text-slate-500'>Across all classes</p>
          </li>
          <li className='bg-white hover:bg-gradient-to-br hover:from-white hover:to-slate-50 w-full px-6 py-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-default group'>
            <div className='flex items-center justify-between mb-3'>
              <p className='font-semibold text-slate-600 text-sm uppercase tracking-wide'>Active Courses</p>
              <Award className='w-5 h-5 text-slate-400 group-hover:text-[#7A1C1C] transition-colors' />
            </div>
            <span className='text-4xl text-[#7A1C1C] font-bold block mb-1'>5</span>
            <p className='text-xs text-slate-500'>Active</p>
          </li>
        </ul>
      </div>

      {/* Main Content Section - Student Names List */}
      <section className='px-6 lg:px-12 pb-12'>
        <div className='w-full rounded-xl bg-white border border-slate-200 shadow-lg overflow-hidden'>
          <div className='bg-gradient-to-r from-slate-50 to-white px-6 py-5 border-b border-slate-200'>
            <h2 className='font-bold text-xl text-slate-800 flex items-center gap-2'>
              <Users className='w-5 h-5 text-[#7A1C1C]' />
              Students
            </h2>
          </div>
          <div className='overflow-y-auto max-h-[600px]'>
            <ul className='divide-y divide-slate-100'>
              {students.map((student) => {
                const hasSubmission = !!student.submission
                return (
                  <li 
                    key={student.id} 
                    className={`px-6 py-4 transition-colors duration-150 group ${
                      hasSubmission 
                        ? 'hover:bg-slate-50 cursor-pointer' 
                        : 'opacity-60 cursor-not-allowed'
                    }`}
                    onClick={() => handleStudentClick(student)}
                  >
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-4 flex-1'>
                        <div className={`p-2 rounded-lg transition-colors ${
                          hasSubmission 
                            ? 'bg-slate-100 group-hover:bg-[#7A1C1C]/10' 
                            : 'bg-slate-100'
                        }`}>
                          <User className={`w-5 h-5 ${hasSubmission ? 'text-[#7A1C1C]' : 'text-slate-400'}`} />
                        </div>
                        <div className='flex-1'>
                          <p className={`font-semibold mb-1 text-lg transition-colors ${
                            hasSubmission 
                              ? 'text-slate-800 group-hover:text-[#7A1C1C]' 
                              : 'text-slate-500'
                          }`}>
                            {student.name}
                          </p>
                          <p className='text-xs text-slate-500'>
                            Student ID: {student.id}
                          </p>
                        </div>
                      </div>
                      <div className='ml-4 flex items-center gap-3'>
                        {student.submission ? (
                          <>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              student.submission.status === 'pending' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {student.submission.status === 'pending' ? 'Pending' : 'Graded'}
                            </span>
                            {student.submission.grade && (
                              <span className='font-semibold text-[#7A1C1C]'>
                                {student.submission.grade}
                              </span>
                            )}
                          </>
                        ) : (
                          <span className='px-3 py-1 rounded-full text-xs font-semibold bg-slate-200 text-slate-500'>
                            No Submission
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Grading Modal */}
      {showGradingModal && selectedStudent && (
        <GradingModal
          student={selectedStudent}
          submission={selectedStudent.submission}
          onClose={() => {
            setShowGradingModal(false)
            setSelectedStudent(null)
          }}
          onSave={handleSaveGrade}
        />
      )}
    </div>
  )
}

