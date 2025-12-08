import React, { useState } from 'react'
import { ArrowLeft, BookOpen, Users, Calendar, Plus, FileText, Clock, CheckCircle } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { AddAssignmentModal } from './AddAssignmentModal'

export const CourseDetailView = () => {
  const navigate = useNavigate()
  const { courseId } = useParams()
  const [showAddAssignmentModal, setShowAddAssignmentModal] = useState(false)
  
  // Mock data - in production, this would come from API based on courseId
  const course = {
    id: courseId || '1',
    subjectCode: 'CS101',
    subjectName: 'Introduction to Computer Science',
    enrolledStudents: 45,
    schedule: 'Mon, Wed, Fri 9:00 AM - 10:30 AM',
    description: 'An introductory course covering fundamental concepts of computer science including programming basics, data structures, and algorithms.'
  }

  // Mock assignments data - using state to allow adding new assignments
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: 'Assignment 1: Introduction to Programming',
      dueDate: '2024-02-15',
      submissions: 42,
      totalStudents: 45,
      status: 'active'
    },
    {
      id: 2,
      title: 'Lab Exercise 2: Data Types',
      dueDate: '2024-02-20',
      submissions: 38,
      totalStudents: 45,
      status: 'active'
    },
    {
      id: 3,
      title: 'Midterm Project',
      dueDate: '2024-03-01',
      submissions: 0,
      totalStudents: 45,
      status: 'upcoming'
    }
  ])

  const handleAddAssignment = () => {
    setShowAddAssignmentModal(true)
  }

  const handleCreateAssignment = (assignmentData) => {
    // Create new assignment object
    const newAssignment = {
      id: assignments.length > 0 ? Math.max(...assignments.map(a => a.id)) + 1 : 1,
      title: assignmentData.title,
      dueDate: assignmentData.dueDate,
      submissions: 0,
      totalStudents: course.enrolledStudents,
      status: 'upcoming',
      description: assignmentData.description || '',
      maxPoints: assignmentData.maxPoints,
      dueTime: assignmentData.dueTime
    }

    // Add to assignments list
    setAssignments([...assignments, newAssignment])
    
    // In production, this would make an API call to save the assignment
    // TODO: Replace with API call and toast notification
  }

  return (
    <div className='container mx-auto bg-gradient-to-br from-slate-50 via-white to-slate-50 min-h-screen m-0 p-0'>
      {/* Header Section with Back Button */}
      <div className='px-6 lg:px-12 pt-8 pb-6'>
        <button
          onClick={() => navigate('/teacher-dashboard/manage-classes')}
          className='flex items-center gap-2 text-slate-600 hover:text-[#7A1C1C] transition-colors mb-4'
        >
          <ArrowLeft className='w-5 h-5' />
          <span className='font-medium'>Back to Manage Classes</span>
        </button>
        
        <div className='flex items-center justify-between mb-2'>
          <div>
            <div className='flex items-center gap-3 mb-2'>
              <div className='bg-gradient-to-br from-[#7A1C1C] to-[#9B2D2D] rounded-lg p-3'>
                <BookOpen className='w-8 h-8 text-white' />
              </div>
              <div>
                <h1 className='text-4xl lg:text-5xl font-bold text-slate-800'>
                  {course.subjectCode}
                </h1>
                <p className='text-slate-600 text-lg font-medium mt-1'>
                  {course.subjectName}
                </p>
              </div>
            </div>
            <p className='text-slate-500 text-sm mt-2 max-w-2xl'>
              {course.description}
            </p>
          </div>
          <button
            onClick={handleAddAssignment}
            className='bg-[#7A1C1C] hover:bg-[#5a1515] text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center gap-2'
          >
            <Plus className='w-5 h-5' />
            <span>Add Assignment</span>
          </button>
        </div>
      </div>

      {/* Course Info Cards */}
      <div className='px-6 lg:px-12 mb-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          <div className='bg-white rounded-xl border border-slate-200 shadow-sm p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-slate-600 font-medium mb-1'>Enrolled Students</p>
                <p className='text-3xl font-bold text-[#7A1C1C]'>{course.enrolledStudents}</p>
              </div>
              <div className='p-4 bg-gradient-to-br from-[#7A1C1C] to-[#9B2D2D] rounded-lg'>
                <Users className='w-8 h-8 text-white' />
              </div>
            </div>
          </div>
          <div className='bg-white rounded-xl border border-slate-200 shadow-sm p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-slate-600 font-medium mb-1'>Schedule</p>
                <p className='text-sm font-bold text-[#7A1C1C]'>{course.schedule}</p>
              </div>
              <div className='p-4 bg-gradient-to-br from-[#7A1C1C] to-[#9B2D2D] rounded-lg'>
                <Calendar className='w-8 h-8 text-white' />
              </div>
            </div>
          </div>
          <div className='bg-white rounded-xl border border-slate-200 shadow-sm p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-slate-600 font-medium mb-1'>Total Assignments</p>
                <p className='text-3xl font-bold text-[#7A1C1C]'>{assignments.length}</p>
              </div>
              <div className='p-4 bg-gradient-to-br from-[#7A1C1C] to-[#9B2D2D] rounded-lg'>
                <FileText className='w-8 h-8 text-white' />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Assignments List */}
      <div className='px-6 lg:px-12 pb-12'>
        <div className='bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden'>
          <div className='bg-gradient-to-r from-slate-50 to-white px-6 py-5 border-b border-slate-200'>
            <h2 className='font-bold text-xl text-slate-800 flex items-center gap-2'>
              <FileText className='w-5 h-5 text-[#7A1C1C]' />
              Assignments
            </h2>
          </div>
          <div className='divide-y divide-slate-100'>
            {assignments.length > 0 ? (
              assignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className='px-6 py-5 hover:bg-slate-50 transition-colors duration-150'
                >
                  <div className='flex items-center justify-between'>
                    <div className='flex items-start gap-4 flex-1'>
                      <div className={`p-2 rounded-lg ${
                        assignment.status === 'active' ? 'bg-blue-50' : 'bg-slate-50'
                      }`}>
                        <FileText className={`w-5 h-5 ${
                          assignment.status === 'active' ? 'text-blue-600' : 'text-slate-400'
                        }`} />
                      </div>
                      <div className='flex-1'>
                        <div className='flex items-center gap-3 mb-2'>
                          <h3 className='font-bold text-lg text-slate-800'>{assignment.title}</h3>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            assignment.status === 'active' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {assignment.status === 'active' ? 'Active' : 'Upcoming'}
                          </span>
                        </div>
                        <div className='flex items-center gap-4 text-sm text-slate-500'>
                          <span className='flex items-center gap-1'>
                            <Calendar className='w-4 h-4' />
                            <span>Due: {assignment.dueDate}</span>
                          </span>
                          <span>•</span>
                          <span className='flex items-center gap-1'>
                            <CheckCircle className='w-4 h-4' />
                            <span>{assignment.submissions} / {assignment.totalStudents} submitted</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => navigate('/teacher-dashboard/submissions', { state: { courseId: course.id } })}
                      className='ml-4 px-4 py-2 bg-[#7A1C1C] hover:bg-[#5a1515] text-white font-semibold rounded-lg transition-colors text-sm'
                    >
                      View Submissions
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className='px-6 py-12 text-center text-slate-400'>
                <FileText className='w-12 h-12 mx-auto mb-3 opacity-50' />
                <p className='text-sm'>No assignments yet. Click "Add Assignment" to create one.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Assignment Modal */}
      {showAddAssignmentModal && (
        <AddAssignmentModal
          onClose={() => setShowAddAssignmentModal(false)}
          onSave={(assignmentData) => {
            handleCreateAssignment(assignmentData)
            setShowAddAssignmentModal(false)
          }}
        />
      )}
    </div>
  )
}

