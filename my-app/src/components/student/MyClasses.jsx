import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, User, Calendar, Users } from 'lucide-react'

export const MyClasses = () => {
  const navigate = useNavigate()
  
  // Mock data - in production, this would come from API
  const classes = [
    {
      id: 1,
      subjectCode: 'CS101',
      subjectName: 'Introduction to Computer Science',
      professorName: 'Dr. Sarah Johnson',
      enrolledStudents: 45,
      schedule: 'Mon, Wed, Fri 9:00 AM - 10:30 AM'
    },
    {
      id: 2,
      subjectCode: 'CS201',
      subjectName: 'Data Structures and Algorithms',
      professorName: 'Prof. Michael Chen',
      enrolledStudents: 38,
      schedule: 'Tue, Thu 2:00 PM - 3:30 PM'
    },
    {
      id: 3,
      subjectCode: 'MATH202',
      subjectName: 'Discrete Mathematics',
      professorName: 'Dr. Emily Rodriguez',
      enrolledStudents: 52,
      schedule: 'Mon, Wed 11:00 AM - 12:30 PM'
    },
    {
      id: 4,
      subjectCode: 'CS301',
      subjectName: 'Database Systems',
      professorName: 'Prof. David Kim',
      enrolledStudents: 42,
      schedule: 'Tue, Thu 10:00 AM - 11:30 AM'
    },
    {
      id: 5,
      subjectCode: 'CS401',
      subjectName: 'Software Engineering',
      professorName: 'Dr. Lisa Anderson',
      enrolledStudents: 35,
      schedule: 'Mon, Wed, Fri 1:00 PM - 2:30 PM'
    },
    {
      id: 6,
      subjectCode: 'ENG101',
      subjectName: 'Technical Writing',
      professorName: 'Prof. Robert Taylor',
      enrolledStudents: 28,
      schedule: 'Tue, Thu 3:00 PM - 4:30 PM'
    }
  ]

  return (
    <div className='container mx-auto bg-gradient-to-br from-slate-50 via-white to-slate-50 min-h-screen m-0 p-0'>
      {/* Header Section */}
      <div className='px-6 lg:px-12 pt-8 pb-6'>
        <div className='mb-2'>
          <h1 className='text-4xl lg:text-5xl font-bold text-slate-800 mb-2'>
            My Classes
          </h1>
          <p className='text-slate-600 text-base lg:text-lg font-medium'>
            View all your enrolled courses
          </p>
        </div>
      </div>

      {/* Stats Summary */}
      <div className='px-6 lg:px-12 mb-8'>
        <div className='bg-white rounded-xl border border-slate-200 shadow-sm p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-600 font-medium mb-1'>Total Enrolled Courses</p>
              <p className='text-3xl font-bold text-[#7A1C1C]'>{classes.length}</p>
            </div>
            <div className='p-4 bg-gradient-to-br from-[#7A1C1C] to-[#9B2D2D] rounded-lg'>
              <BookOpen className='w-8 h-8 text-white' />
            </div>
          </div>
        </div>
      </div>

      {/* Classes Grid */}
      <div className='px-6 lg:px-12 pb-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {classes.map((classItem) => (
            <div
              key={classItem.id}
              className='bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer hover:-translate-y-1'
            >
              {/* Card Header with Gradient */}
              <div className='bg-gradient-to-br from-[#7A1C1C] to-[#9B2D2D] px-6 py-5'>
                <div className='flex items-start justify-between mb-3'>
                  <div className='bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5'>
                    <p className='text-white font-bold text-lg tracking-wide'>{classItem.subjectCode}</p>
                  </div>
                  <div className='bg-white/20 backdrop-blur-sm rounded-full p-2'>
                    <BookOpen className='w-5 h-5 text-white' />
                  </div>
                </div>
                <h3 className='text-white font-bold text-xl mb-1 line-clamp-2'>
                  {classItem.subjectName}
                </h3>
              </div>

              {/* Card Body */}
              <div className='px-6 py-5 space-y-4'>
                {/* Professor Info */}
                <div className='flex items-center gap-3'>
                  <div className='p-2 bg-slate-100 rounded-lg'>
                    <User className='w-4 h-4 text-[#7A1C1C]' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-xs text-slate-500 font-medium mb-0.5'>Professor</p>
                    <p className='text-sm font-semibold text-slate-800 truncate'>
                      {classItem.professorName}
                    </p>
                  </div>
                </div>

                {/* Schedule Info */}
                <div className='flex items-center gap-3'>
                  <div className='p-2 bg-slate-100 rounded-lg'>
                    <Calendar className='w-4 h-4 text-[#7A1C1C]' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-xs text-slate-500 font-medium mb-0.5'>Schedule</p>
                    <p className='text-sm font-semibold text-slate-800'>
                      {classItem.schedule}
                    </p>
                  </div>
                </div>

                {/* Enrolled Students */}
                <div className='flex items-center gap-3'>
                  <div className='p-2 bg-slate-100 rounded-lg'>
                    <Users className='w-4 h-4 text-[#7A1C1C]' />
                  </div>
                  <div className='flex-1'>
                    <p className='text-xs text-slate-500 font-medium mb-0.5'>Enrolled Students</p>
                    <p className='text-sm font-semibold text-slate-800'>
                      {classItem.enrolledStudents} students
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className='px-6 py-4 bg-slate-50 border-t border-slate-100'>
                <button 
                  onClick={() => navigate(`/portal/my-classes/course/${classItem.id}`)}
                  className='w-full bg-[#7A1C1C] hover:bg-[#5a1515] text-white font-semibold py-2.5 rounded-lg transition-colors text-sm'
                >
                  View Course Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


