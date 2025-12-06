# Supabase Setup Instructions

## 1. Create .env File

Create a `.env` file in the `my-app` directory with the following content:

```env
REACT_APP_SUPABASE_URL=https://spinlhuugxeezldyozdj.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwaW5saHV1Z3hlZXpsZHlvemRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5MTgzNzksImV4cCI6MjA4MDQ5NDM3OX0.E73P54oq1Wi30wzprnvsoLzV6o-T1pEkK4N0vKHeLzM
HOST=0.0.0.0
PORT=3000
```

**Important:** The `.env` file should be in the `my-app` folder (same level as `package.json`).

## 2. Supabase Database Setup

You need to create the following tables in your Supabase database. Go to your Supabase dashboard → SQL Editor and run these SQL commands:

### Create Users Table

```sql
CREATE TABLE users (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('Student', 'Teacher')),
    student_id VARCHAR(50) NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read their own data
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = user_id);

-- Create policy to allow users to update their own data
CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = user_id);

-- Create policy to allow authenticated users to insert their own profile
CREATE POLICY "Users can insert own profile" ON users
    FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### Create Courses Table

```sql
CREATE TABLE courses (
    course_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_code VARCHAR(20) NOT NULL,
    subject_name VARCHAR(255) NOT NULL,
    description TEXT NULL,
    semester VARCHAR(50) NOT NULL,
    academic_year VARCHAR(20) NOT NULL,
    schedule VARCHAR(255) NULL,
    credits INTEGER DEFAULT 3,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all authenticated users to view courses
CREATE POLICY "Anyone can view courses" ON courses
    FOR SELECT USING (auth.role() = 'authenticated');
```

### Create Teaches Table (Teacher-Course Relationship)

```sql
CREATE TABLE teaches (
    teaches_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(teacher_id, course_id)
);

-- Enable Row Level Security
ALTER TABLE teaches ENABLE ROW LEVEL SECURITY;

-- Create policy to allow teachers to view their own courses
CREATE POLICY "Teachers can view own courses" ON teaches
    FOR SELECT USING (auth.uid() = teacher_id);
```

### Create Enrollments Table (Student-Course Relationship)

```sql
CREATE TABLE enrollments (
    enrollment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE,
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Dropped', 'Completed')),
    final_grade VARCHAR(5) NULL,
    UNIQUE(student_id, course_id)
);

-- Enable Row Level Security
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Create policy to allow students to view their own enrollments
CREATE POLICY "Students can view own enrollments" ON enrollments
    FOR SELECT USING (auth.uid() = student_id);
```

### Create Submissions Table

```sql
CREATE TABLE submissions (
    submission_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE,
    assignment_name VARCHAR(255) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size BIGINT NOT NULL,
    file_type VARCHAR(50) NULL,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    status VARCHAR(20) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Graded', 'Returned')),
    grade VARCHAR(5) NULL,
    feedback TEXT NULL,
    graded_by UUID NULL REFERENCES users(user_id) ON DELETE SET NULL,
    graded_at TIMESTAMP WITH TIME ZONE NULL
);

-- Enable Row Level Security
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow students to view their own submissions
CREATE POLICY "Students can view own submissions" ON submissions
    FOR SELECT USING (auth.uid() = student_id);

-- Create policy to allow teachers to view submissions for their courses
CREATE POLICY "Teachers can view course submissions" ON submissions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM teaches
            WHERE teaches.teacher_id = auth.uid()
            AND teaches.course_id = submissions.course_id
        )
    );
```

## 3. Running the Application on Network

To make the application accessible from other devices on your network:

1. **Start the development server:**
   ```bash
   npm start
   ```

2. **Find your local IP address:**
   - Windows: Open Command Prompt and run `ipconfig`
   - Look for "IPv4 Address" under your active network adapter
   - Example: `192.168.1.100`

3. **Access from other devices:**
   - On other devices connected to the same network, open a browser
   - Navigate to: `http://YOUR_IP_ADDRESS:3000`
   - Example: `http://192.168.1.100:3000`

4. **Firewall Configuration:**
   - You may need to allow port 3000 through Windows Firewall
   - Go to Windows Defender Firewall → Advanced Settings
   - Create an inbound rule for port 3000

## 4. Environment Variables

The `.env` file is already configured with:
- `HOST=0.0.0.0` - Makes the server accessible from all network interfaces
- `PORT=3000` - Sets the port to 3000

## 5. Testing the Connection

1. Start the app: `npm start`
2. Try registering a new user
3. Check your Supabase dashboard → Authentication → Users to see if the user was created
4. Check Supabase dashboard → Table Editor → users to see if the profile was created

## Troubleshooting

- **Can't connect from other devices:** Make sure both devices are on the same network
- **Port already in use:** Change PORT in .env to a different port (e.g., 3001)
- **Supabase connection errors:** Verify your URL and anon key in .env
- **Database errors:** Make sure you've run all the SQL commands in Supabase SQL Editor


