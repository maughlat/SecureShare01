# Database Schema Design
## SecureShare Academic Portal System

This document outlines the database table structure required to support the role-based academic portal system with Teacher Dashboard and Student Portal functionality.

---

## Table Definitions

### 1. Users Table
Stores user account information including authentication details and role assignment.

```sql
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role ENUM('Student', 'Teacher') NOT NULL,
    student_id VARCHAR(50) NULL,  -- NULL for teachers
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_student_id (student_id)
);
```

**Fields:**
- `user_id`: Primary key, auto-incrementing unique identifier
- `email`: Unique email address for login
- `password_hash`: Hashed password (using bcrypt/argon2)
- `full_name`: User's full name
- `role`: Either 'Student' or 'Teacher'
- `student_id`: Optional student ID (only for students)
- `created_at`: Account creation timestamp
- `updated_at`: Last update timestamp
- `last_login`: Last login timestamp
- `is_active`: Account status flag

---

### 2. Courses Table
Stores course/subject information.

```sql
CREATE TABLE courses (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    subject_code VARCHAR(20) NOT NULL,
    subject_name VARCHAR(255) NOT NULL,
    description TEXT NULL,
    semester VARCHAR(50) NOT NULL,
    academic_year VARCHAR(20) NOT NULL,
    schedule VARCHAR(255) NULL,  -- e.g., "Mon, Wed, Fri 9:00 AM - 10:30 AM"
    credits INT DEFAULT 3,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_subject_code (subject_code),
    INDEX idx_semester (semester, academic_year)
);
```

**Fields:**
- `course_id`: Primary key
- `subject_code`: Course code (e.g., "CS101")
- `subject_name`: Full course name
- `description`: Course description
- `semester`: Semester identifier (e.g., "Fall 2024")
- `academic_year`: Academic year
- `schedule`: Class schedule information
- `credits`: Credit hours

---

### 3. Teaches Table (Teacher-Course Relationship)
Links teachers to the courses they teach.

```sql
CREATE TABLE teaches (
    teaches_id INT PRIMARY KEY AUTO_INCREMENT,
    teacher_id INT NOT NULL,
    course_id INT NOT NULL,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (teacher_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE,
    UNIQUE KEY unique_teacher_course (teacher_id, course_id),
    
    INDEX idx_teacher_id (teacher_id),
    INDEX idx_course_id (course_id)
);
```

**Fields:**
- `teaches_id`: Primary key
- `teacher_id`: Foreign key to users table (must be Teacher role)
- `course_id`: Foreign key to courses table
- `assigned_at`: When the teacher was assigned to the course

---

### 4. Enrollments Table (Student-Course Relationship)
Links students to the courses they are enrolled in.

```sql
CREATE TABLE enrollments (
    enrollment_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Active', 'Dropped', 'Completed') DEFAULT 'Active',
    final_grade VARCHAR(5) NULL,  -- e.g., "A", "B+", "C-"
    
    FOREIGN KEY (student_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE,
    UNIQUE KEY unique_student_course (student_id, course_id),
    
    INDEX idx_student_id (student_id),
    INDEX idx_course_id (course_id),
    INDEX idx_status (status)
);
```

**Fields:**
- `enrollment_id`: Primary key
- `student_id`: Foreign key to users table (must be Student role)
- `course_id`: Foreign key to courses table
- `enrolled_at`: Enrollment timestamp
- `status`: Enrollment status
- `final_grade`: Final course grade (if completed)

---

### 5. Submissions Table
Stores student assignment submissions with file information.

```sql
CREATE TABLE submissions (
    submission_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    assignment_name VARCHAR(255) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,  -- Server file path
    file_size BIGINT NOT NULL,  -- Size in bytes
    file_type VARCHAR(50) NULL,  -- MIME type
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Pending', 'Graded', 'Returned') DEFAULT 'Pending',
    grade VARCHAR(5) NULL,  -- e.g., "A", "B+", "85"
    feedback TEXT NULL,
    graded_by INT NULL,  -- Teacher user_id
    graded_at TIMESTAMP NULL,
    
    FOREIGN KEY (student_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE,
    FOREIGN KEY (graded_by) REFERENCES users(user_id) ON DELETE SET NULL,
    
    INDEX idx_student_id (student_id),
    INDEX idx_course_id (course_id),
    INDEX idx_status (status),
    INDEX idx_submitted_at (submitted_at),
    INDEX idx_graded_by (graded_by)
);
```

**Fields:**
- `submission_id`: Primary key
- `student_id`: Foreign key to users (Student)
- `course_id`: Foreign key to courses
- `assignment_name`: Name/title of the assignment
- `file_name`: Original filename
- `file_path`: Server storage path
- `file_size`: File size in bytes
- `file_type`: MIME type (e.g., "application/pdf")
- `submitted_at`: Submission timestamp
- `status`: Submission status
- `grade`: Assigned grade
- `feedback`: Teacher feedback text
- `graded_by`: Teacher who graded it
- `graded_at`: When it was graded

---

### 6. Files Table (Optional - for general file storage)
Stores general files uploaded by users (not necessarily submissions).

```sql
CREATE TABLE files (
    file_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size BIGINT NOT NULL,
    file_type VARCHAR(50) NULL,
    folder_id INT NULL,  -- For folder organization
    is_shared BOOLEAN DEFAULT FALSE,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    
    INDEX idx_user_id (user_id),
    INDEX idx_folder_id (folder_id),
    INDEX idx_uploaded_at (uploaded_at)
);
```

---

### 7. Shared_Access Table (Optional - for file sharing)
Manages file sharing permissions between users.

```sql
CREATE TABLE shared_access (
    share_id INT PRIMARY KEY AUTO_INCREMENT,
    file_id INT NOT NULL,
    owner_id INT NOT NULL,  -- User who owns/shared the file
    shared_with_id INT NOT NULL,  -- User with whom file is shared
    permission_level ENUM('View', 'Edit', 'Download') DEFAULT 'View',
    shared_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (file_id) REFERENCES files(file_id) ON DELETE CASCADE,
    FOREIGN KEY (owner_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (shared_with_id) REFERENCES users(user_id) ON DELETE CASCADE,
    
    UNIQUE KEY unique_share (file_id, shared_with_id),
    INDEX idx_owner_id (owner_id),
    INDEX idx_shared_with_id (shared_with_id)
);
```

---

## Relationships Summary

1. **Users → Courses (Many-to-Many via Teaches)**: Teachers teach multiple courses
2. **Users → Courses (Many-to-Many via Enrollments)**: Students enroll in multiple courses
3. **Users → Submissions (One-to-Many)**: Students submit multiple assignments
4. **Courses → Submissions (One-to-Many)**: Courses have multiple submissions
5. **Users → Submissions (One-to-Many via graded_by)**: Teachers grade multiple submissions
6. **Users → Files (One-to-Many)**: Users upload multiple files
7. **Files → Shared_Access (One-to-Many)**: Files can be shared with multiple users

---

## Sample Queries

### Get all courses for a student:
```sql
SELECT c.*, u.full_name as professor_name
FROM courses c
JOIN enrollments e ON c.course_id = e.course_id
JOIN teaches t ON c.course_id = t.course_id
JOIN users u ON t.teacher_id = u.user_id
WHERE e.student_id = ? AND e.status = 'Active';
```

### Get all pending submissions for a teacher:
```sql
SELECT s.*, u.full_name as student_name, u.student_id, c.subject_code, c.subject_name
FROM submissions s
JOIN users u ON s.student_id = u.user_id
JOIN courses c ON s.course_id = c.course_id
JOIN teaches t ON c.course_id = t.course_id
WHERE t.teacher_id = ? AND s.status = 'Pending'
ORDER BY s.submitted_at DESC;
```

### Get student submissions for a specific course:
```sql
SELECT s.*, u.full_name as student_name
FROM submissions s
JOIN users u ON s.student_id = u.user_id
WHERE s.course_id = ? AND s.student_id = ?
ORDER BY s.submitted_at DESC;
```

### Update submission grade:
```sql
UPDATE submissions
SET grade = ?, 
    feedback = ?, 
    graded_by = ?, 
    graded_at = CURRENT_TIMESTAMP,
    status = 'Graded'
WHERE submission_id = ?;
```

---

## Security Considerations

1. **Password Hashing**: Always use bcrypt or argon2 for password storage
2. **SQL Injection**: Use parameterized queries/prepared statements
3. **File Upload Security**: Validate file types, scan for malware, limit file sizes
4. **Access Control**: Implement role-based access control (RBAC) at the application level
5. **Encryption**: Encrypt sensitive data at rest and in transit (TLS/SSL)
6. **Audit Logging**: Consider adding an audit_log table to track important actions

---

## Indexes for Performance

The following indexes are recommended for optimal query performance:
- Email lookups (users table)
- Role-based queries (users table)
- Course lookups by semester/year
- Submission queries by status and date
- Enrollment queries by student/course

---

## Notes

- All timestamps use UTC timezone
- Soft deletes can be implemented using `is_active` flags or `deleted_at` columns
- Consider adding a `version` column for optimistic locking on critical tables
- File paths should be stored securely and not expose server directory structure
- Consider implementing file versioning for submissions if needed



