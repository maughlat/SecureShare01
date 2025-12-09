import React, { useState } from 'react'
import { ArrowLeft, BookOpen, Users, Calendar, FileText, Clock } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { AssignmentSubmissionModal } from './AssignmentSubmissionModal'

export const StudentCourseDetails = () => {
  const navigate = useNavigate()
  const { courseId } = useParams()
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [showSubmissionModal, setShowSubmissionModal] = useState(false)
  
  // Mock data - in production, this would come from API based on courseId
  const course = {
    id: courseId || '1',
    subjectCode: 'CS101',
    subjectName: 'Introduction to Computer Science',
    professorName: 'Dr. Sarah Johnson',
    enrolledStudents: 45,
    schedule: 'Mon, Wed, Fri 9:00 AM - 10:30 AM',
    description: 'An introductory course covering fundamental concepts of computer science including programming basics, data structures, and algorithms.'
  }

  // Mock assignments data
  const assignments = [
    {
      id: 1,
      title: 'Assignment 1: Introduction to Programming',
      dueDate: '2024-02-15',
      status: 'submitted',
      grade: 'A',
      submittedAt: '2024-02-14'
    },
    {
      id: 2,
      title: 'Lab Exercise 2: Data Types',
      dueDate: '2024-02-20',
      status: 'pending',
      grade: null,
      submittedAt: null,
      description: 'Complete the following exercises on Python data types:\n\n1. Create variables for different data types (int, float, string, boolean, list, dictionary)\n2. Perform type conversions between compatible types\n3. Write a function that accepts any data type and returns its type\n4. Submit your code as a Python file (.py)\n\nMake sure to include comments explaining your code.',
      attachedFile: {
        name: 'Lab_Exercise_2_Instructions.pdf',
        size: 245760, // 240 KB in bytes
        type: 'application/pdf',
        url: '#' // Mock URL - in production this would be the actual file URL
      }
    },
    {
      id: 3,
      title: 'Midterm Project',
      dueDate: '2024-03-01',
      status: 'not_started',
      grade: null,
      submittedAt: null
    }
  ]

  const handleAssignmentClick = (assignment) => {
    setSelectedAssignment(assignment)
    setShowSubmissionModal(true)
  }

  const handleSubmitAssignment = (submissionData) => {
    // In production, this would upload the file to the server
    // TODO: Replace with API call and toast notification
    setShowSubmissionModal(false)
    setSelectedAssignment(null)
  }

  return (
    <div className='container mx-auto bg-gradient-to-br from-slate-50 via-white to-slate-50 min-h-screen m-0 p-0'>
      {/* Header Section with Back Button */}
      <div className='px-6 lg:px-12 pt-8 pb-6'>
        <button
          onClick={() => navigate('/portal/my-classes')}
          className='flex items-center gap-2 text-slate-600 hover:text-[#7A1C1C] transition-colors mb-4'
        >
          <ArrowLeft className='w-5 h-5' />
          <span className='font-medium'>Back to My Classes</span>
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
              My Assignments
            </h2>
          </div>
          <div className='divide-y divide-slate-100'>
            {assignments.map((assignment) => (
              <div
                key={assignment.id}
                onClick={() => handleAssignmentClick(assignment)}
                className='px-6 py-5 hover:bg-slate-50 transition-colors duration-150 cursor-pointer group'
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-start gap-4 flex-1'>
                    <div className={`p-2 rounded-lg ${
                      assignment.status === 'submitted' ? 'bg-green-50' : 
                      assignment.status === 'pending' ? 'bg-yellow-50' : 'bg-slate-50'
                    }`}>
                      <FileText className={`w-5 h-5 ${
                        assignment.status === 'submitted' ? 'text-green-600' : 
                        assignment.status === 'pending' ? 'text-yellow-600' : 'text-slate-400'
                      }`} />
                    </div>
                    <div className='flex-1'>
                      <div className='flex items-center gap-3 mb-2'>
                        <h3 className='font-bold text-lg text-slate-800 group-hover:text-[#7A1C1C] transition-colors'>{assignment.title}</h3>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          assignment.status === 'submitted' 
                            ? 'bg-green-100 text-green-800' 
                            : assignment.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {assignment.status === 'submitted' ? 'Submitted' : 
                           assignment.status === 'pending' ? 'Pending' : 'Not Started'}
                        </span>
                      </div>
                      <div className='flex items-center gap-4 text-sm text-slate-500'>
                        <span className='flex items-center gap-1'>
                          <Clock className='w-4 h-4' />
                          <span>Due: {assignment.dueDate}</span>
                        </span>
                        {assignment.submittedAt && (
                          <>
                            <span>•</span>
                            <span>Submitted: {assignment.submittedAt}</span>
                          </>
                        )}
                        {assignment.grade && (
                          <>
                            <span>•</span>
                            <span className='font-semibold text-[#7A1C1C]'>Grade: {assignment.grade}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assignment Submission Modal */}
      {showSubmissionModal && selectedAssignment && (
        <AssignmentSubmissionModal
          assignment={selectedAssignment}
          onClose={() => {
            setShowSubmissionModal(false)
            setSelectedAssignment(null)
          }}
          onSubmit={handleSubmitAssignment}
        />
      )}
    </div>
  )
}

