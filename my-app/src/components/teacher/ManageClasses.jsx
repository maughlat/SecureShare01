import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Users, Plus, Edit, Trash2 } from 'lucide-react'
import { AddCourseModal } from './AddCourseModal'

export const ManageClasses = () => {
  const navigate = useNavigate()
  const [showAddCourseModal, setShowAddCourseModal] = useState(false)
  // Mock data - in production, this would come from API
  const [classes] = useState([
    {
      id: 1,
      subjectCode: 'CS101',
      subjectName: 'Introduction to Computer Science',
      enrolledStudents: 45,
      schedule: 'Mon, Wed, Fri 9:00 AM - 10:30 AM'
    },
    {
      id: 2,
      subjectCode: 'CS201',
      subjectName: 'Data Structures and Algorithms',
      enrolledStudents: 38,
      schedule: 'Tue, Thu 2:00 PM - 3:30 PM'
    },
    {
      id: 3,
      subjectCode: 'CS301',
      subjectName: 'Database Systems',
      enrolledStudents: 42,
      schedule: 'Tue, Thu 10:00 AM - 11:30 AM'
    }
  ])

  return (
    <div className='container mx-auto bg-gradient-to-br from-slate-50 via-white to-slate-50 min-h-screen m-0 p-0'>
      {/* Header Section */}
      <div className='px-6 lg:px-12 pt-8 pb-6'>
        <div className='flex items-center justify-between mb-2'>
          <div>
            <h1 className='text-4xl lg:text-5xl font-bold text-slate-800 mb-2'>
              Manage Classes
            </h1>
            <p className='text-slate-600 text-base lg:text-lg font-medium'>
              View and manage all your courses
            </p>
          </div>
          <button 
            onClick={() => setShowAddCourseModal(true)}
            className='bg-[#7A1C1C] hover:bg-[#5a1515] text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center gap-2'
          >
            <Plus className='w-5 h-5' />
            <span>Add New Course</span>
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className='px-6 lg:px-12 mb-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          <div className='bg-white rounded-xl border border-slate-200 shadow-sm p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-slate-600 font-medium mb-1'>Total Courses</p>
                <p className='text-3xl font-bold text-[#7A1C1C]'>{classes.length}</p>
              </div>
              <div className='p-4 bg-gradient-to-br from-[#7A1C1C] to-[#9B2D2D] rounded-lg'>
                <BookOpen className='w-8 h-8 text-white' />
              </div>
            </div>
          </div>
          <div className='bg-white rounded-xl border border-slate-200 shadow-sm p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-slate-600 font-medium mb-1'>Total Students</p>
                <p className='text-3xl font-bold text-[#7A1C1C]'>
                  {classes.reduce((sum, c) => sum + c.enrolledStudents, 0)}
                </p>
              </div>
              <div className='p-4 bg-gradient-to-br from-[#7A1C1C] to-[#9B2D2D] rounded-lg'>
                <Users className='w-8 h-8 text-white' />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Classes List */}
      <div className='px-6 lg:px-12 pb-12'>
        <div className='bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden'>
          <div className='bg-gradient-to-r from-slate-50 to-white px-6 py-5 border-b border-slate-200'>
            <h2 className='font-bold text-xl text-slate-800 flex items-center gap-2'>
              <BookOpen className='w-5 h-5 text-[#7A1C1C]' />
              Your Courses
            </h2>
          </div>
          <div className='divide-y divide-slate-100'>
            {classes.map((classItem) => (
              <div
                key={classItem.id}
                className='px-6 py-5 hover:bg-slate-50 transition-colors duration-150 cursor-pointer'
                onClick={() => navigate(`/teacher-dashboard/manage-classes/course/${classItem.id}`)}
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-start gap-4 flex-1'>
                    <div className='bg-gradient-to-br from-[#7A1C1C] to-[#9B2D2D] rounded-lg p-3'>
                      <BookOpen className='w-6 h-6 text-white' />
                    </div>
                    <div className='flex-1'>
                      <div className='flex items-center gap-3 mb-2'>
                        <h3 className='font-bold text-lg text-slate-800'>{classItem.subjectCode}</h3>
                      </div>
                      <p className='text-slate-700 font-medium mb-2'>{classItem.subjectName}</p>
                      <div className='flex items-center gap-4 text-sm text-slate-500'>
                        <span className='flex items-center gap-1'>
                          <Users className='w-4 h-4' />
                          <span>{classItem.enrolledStudents} students</span>
                        </span>
                        <span>•</span>
                        <span>{classItem.schedule}</span>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center gap-2 ml-4' onClick={(e) => e.stopPropagation()}>
                    <button 
                      className='p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors'
                      onClick={(e) => {
                        e.stopPropagation()
                        // Handle edit action
                      }}
                    >
                      <Edit className='w-5 h-5' />
                    </button>
                    <button 
                      className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                      onClick={(e) => {
                        e.stopPropagation()
                        // Handle delete action
                      }}
                    >
                      <Trash2 className='w-5 h-5' />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Course Modal */}
      {showAddCourseModal && (
        <AddCourseModal
          onClose={() => setShowAddCourseModal(false)}
          onSave={(courseData) => {
            // TODO: Replace with API call to create course and toast notification
            setShowAddCourseModal(false)
          }}
        />
      )}
    </div>
  )
}


