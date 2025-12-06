# Quick Start Guide - Supabase Integration

## ✅ What's Been Done

1. ✅ Supabase client library installed
2. ✅ Supabase configuration file created (`src/lib/supabase.js`)
3. ✅ Login component updated to use Supabase authentication
4. ✅ App.js updated with Supabase session management
5. ✅ Logout functionality integrated with Supabase

## 🚀 Setup Steps

### Step 1: Create .env File

**IMPORTANT:** You must create a `.env` file manually in the `my-app` folder.

1. Navigate to the `my-app` folder
2. Create a new file named `.env` (with the dot at the beginning)
3. Add the following content:

```env
REACT_APP_SUPABASE_URL=https://spinlhuugxeezldyozdj.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwaW5saHV1Z3hlZXpsZHlvemRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5MTgzNzksImV4cCI6MjA4MDQ5NDM3OX0.E73P54oq1Wi30wzprnvsoLzV6o-T1pEkK4N0vKHeLzM
HOST=0.0.0.0
PORT=3000
```

**Windows Users:**
- Right-click in the `my-app` folder → New → Text Document
- Name it `.env` (make sure the dot is included)
- Open and paste the content above
- Save and close

### Step 2: Set Up Supabase Database

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **SQL Editor**
4. Copy and run the SQL commands from `SUPABASE_SETUP.md`

The SQL will create:
- `users` table (with RLS policies)
- `courses` table
- `teaches` table (teacher-course relationship)
- `enrollments` table (student-course relationship)
- `submissions` table

### Step 3: Start the Application

```bash
cd my-app
npm start
```

The app will start on `http://localhost:3000`

### Step 4: Access from Other Devices

1. **Find your computer's IP address:**
   - Windows: Open Command Prompt → type `ipconfig`
   - Look for "IPv4 Address" (e.g., `192.168.1.100`)

2. **On other devices:**
   - Make sure they're on the same network
   - Open browser and go to: `http://YOUR_IP:3000`
   - Example: `http://192.168.1.100:3000`

3. **Firewall (if needed):**
   - Windows may ask to allow Node.js through firewall
   - Click "Allow access" when prompted

## 🧪 Testing

1. **Register a new user:**
   - Go to `/login`
   - Click "Register"
   - Fill in: Full Name, Email, Password, Role (Student/Teacher)
   - Click "Create Account"

2. **Verify in Supabase:**
   - Go to Supabase Dashboard → Authentication → Users
   - You should see the new user
   - Go to Table Editor → users
   - You should see the user profile with role

3. **Login:**
   - Use the email and password you registered
   - You should be redirected based on your role

## 📁 File Structure

```
my-app/
├── .env                    ← CREATE THIS FILE (see Step 1)
├── src/
│   ├── lib/
│   │   └── supabase.js    ← Supabase client configuration
│   ├── components/
│   │   └── login/
│   │       └── Login.jsx  ← Updated with Supabase auth
│   └── App.js             ← Updated with session management
├── SUPABASE_SETUP.md      ← Database setup instructions
└── ENV_SETUP_INSTRUCTIONS.txt ← Detailed .env setup guide
```

## 🔧 Troubleshooting

**"Missing Supabase environment variables" error:**
- Make sure `.env` file exists in `my-app` folder
- Restart the development server after creating `.env`

**Can't access from other devices:**
- Check that `HOST=0.0.0.0` is in `.env`
- Make sure both devices are on the same network
- Check Windows Firewall settings

**Database errors:**
- Make sure you've run all SQL commands in Supabase SQL Editor
- Check that RLS policies are created correctly

**Authentication errors:**
- Verify your Supabase URL and anon key in `.env`
- Check Supabase Dashboard → Authentication → Settings
- Make sure email authentication is enabled

## 📚 Next Steps

- Customize the database schema as needed
- Add more RLS policies for security
- Implement file upload to Supabase Storage
- Add real-time features with Supabase Realtime

## 🔐 Security Notes

- The `.env` file is already in `.gitignore` (won't be committed)
- Never commit your Supabase service role key
- The anon key is safe to use in frontend (it's public)
- RLS policies protect your data at the database level


