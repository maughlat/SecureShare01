import { createClient } from '@supabase/supabase-js'

// Get environment variables with fallback
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://spinlhuugxeezldyozdj.supabase.co'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwaW5saHV1Z3hlZXpsZHlvemRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5MTgzNzksImV4cCI6MjA4MDQ5NDM3OX0.E73P54oq1Wi30wzprnvsoLzV6o-T1pEkK4N0vKHeLzM'

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.')
  throw new Error('Missing Supabase environment variables. Please ensure REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY are set in your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

