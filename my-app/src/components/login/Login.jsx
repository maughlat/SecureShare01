import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, CircleUserRound, ShieldCheck } from 'lucide-react';
import { FaLock,  FaShieldAlt, FaUsers } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";
import Navbar from './Navbar';
import { supabase } from '../../lib/supabase';

const Login = () => {
  const [action, setAction] = useState("Sign In");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      if (action === "Sign In") {
        if (!email || !password) {
          setError("Please fill in all fields");
          setLoading(false);
          return;
        }

        // Sign in with Supabase
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;

        // Get user role from user metadata or profiles table
        let userRole = data.user?.user_metadata?.role || 'Student';
        
        // If role is not in metadata, try to fetch from profiles table
        if (!userRole || userRole === 'Student') {
          const { data: profileData } = await supabase
            .from('users')
            .select('role')
            .eq('user_id', data.user.id)
            .single();
          
          if (profileData) {
            userRole = profileData.role;
          }
        }

        // Store user session
        localStorage.setItem(
          'authUser',
          JSON.stringify({ 
            id: data.user.id,
            email: data.user.email,
            fullName: data.user.user_metadata?.full_name || fullName,
            role: userRole 
          })
        );

        // Redirect based on role
        if (userRole === 'Teacher') {
          navigate('/teacher-dashboard');
        } else {
          navigate('/portal');
        }
      } else {
        // Register flow
        if (!fullName || !email || !password || !role) {
          setError("Please fill in all fields");
          setLoading(false);
          return;
        }

        // Sign up with Supabase
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              role: role,
            },
          },
        });

        if (signUpError) throw signUpError;

        // Create user profile in users table
        if (data.user) {
          const { error: profileError } = await supabase
            .from('users')
            .insert([
              {
                user_id: data.user.id,
                email: email,
                full_name: fullName,
                role: role,
                student_id: role === 'Student' ? `STU-${Date.now()}` : null,
              },
            ]);

          if (profileError) {
            console.error('Error creating profile:', profileError);
            // Continue anyway as auth was successful
          }
        }

        // Store user session
        localStorage.setItem(
          'authUser',
          JSON.stringify({ 
            id: data.user?.id,
            email: email,
            fullName: fullName,
            role: role 
          })
        );

        // Redirect based on role
        if (role === 'Teacher') {
          navigate('/teacher-dashboard');
        } else {
          navigate('/portal');
        }
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-radial-at-center from-[#F9F0D9] to-[#F2F2F2] min-h-screen'>
      <Navbar />
      <header className='mx-auto px-4 max-w-7xl'>
        <section className='w-full min-h-[calc(100vh-120px)] flex items-start py-4'>
          <div className='w-full min-h-full rounded-3xl bg-white/30 backdrop-blur-xl border border-white/20 shadow-2xl px-6 py-8 lg:px-12 lg:py-12 text-lg flex flex-col lg:flex-row items-start gap-12'>
            <div className='w-full lg:max-w-2xl'>
            <h1 className='text-4xl lg:text-7xl text-[#7A1C1C] font-black tracking-tight mb-5 '>
              Secure File Sharing for Academic Excellence
            </h1>
            <p className='mb-10'>
            A trusted platform for students and teachers to share assignments, lecture notes, and research documents with end-to-end encryption and role-based access control.
            </p>
            <ul className='flex flex-col sm:flex-row gap-4 lg:gap-10'>
              <li>
                <div className='bg-white/30 backdrop-blur-xl border border-white/40 shadow-lg hover:bg-white/50 hover:-translate-y-1 hover:shadow-2xl px-6 py-5 text-sm rounded-2xl transition-all duration-300 cursor-pointer'>
                   <div className="bg-white/60 inline-flex items-center justify-center px-3 py-1 rounded-md mb-3 border border-white/40">
                    <FaLock size={20} color="#7A1C1C" strokeWidth={2.5} />
                  </div>
                  <span className='font-semibold block text-[#4B1B1B]'>Encrypted</span>
                  <span className='text-xs block mt-1 text-[#4B1B1B]/80'>End-to-end encryption for all file transfers and storage</span>
                </div>
              </li>
              <li>
                <div className='bg-white/30 backdrop-blur-xl border border-white/40 shadow-lg hover:bg-white/50 hover:-translate-y-1 hover:shadow-2xl px-6 py-5 text-sm rounded-2xl transition-all duration-300 cursor-pointer'>
                  <div className="bg-white/60 inline-flex items-center justify-center px-3 py-1 rounded-md mb-3 border border-white/40">
                    <FaUsers size={22} color="#7A1C1C" strokeWidth={2.5} />
                  </div>
                  <span className='font-semibold block text-[#4B1B1B]'>Role-Based</span>
                  <span className='text-xs block mt-1 text-[#4B1B1B]/80'>Separate access controls for students and teachers</span>
                </div>
              </li>
              <li>
                <div className='bg-white/30 backdrop-blur-xl border border-white/40 shadow-lg hover:bg-white/50 hover:-translate-y-1 hover:shadow-2xl px-6 py-5 text-sm rounded-2xl transition-all duration-300 cursor-pointer'>
                  <div className="bg-white/60 inline-flex items-center justify-center px-3 py-1 rounded-md mb-3 border border-white/40">
                    <IoShieldCheckmark size={20} color="#7A1C1C" strokeWidth={2.5} /> 
                  </div>
                  <span className='font-semibold block text-[#4B1B1B]'>Reliable</span>
                  <span className='text-xs block mt-1 text-[#4B1B1B]/80'>Secure database storage with backup and recovery</span>
                </div>
              </li>
            </ul>
          </div>

          <div className='w-full lg:max-w-sm rounded-2xl bg-white/40 backdrop-blur-lg text-center p-8 border border-white/50 shadow-2xl text-[#4B1B1B] lg:ml-auto'>
              <div className="flex flex-col items-center space-y-2 mb-6">
              <div className='bg-gradient-to-br from-[#7A1C1C] to-[#9B2D2D] p-2.5 rounded-lg shadow-lg'>
                <ShieldCheck className="text-white w-8 h-8" />
              </div>
                <h1 className="text-xl font-bold text-[#7A1C1C]">Welcome to SecureShare</h1>
              </div>

            <p className="font-light text-sm mb-6">
              {action === "Sign In"
                ? "Sign in to access your secure academic files"
                : "Create an account to start sharing files securely"}
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className='flex mb-6 bg-black rounded-lg p-1'>
              <button
                onClick={() => setAction("Sign In")}
                className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${
                  action === "Sign In" ? "bg-[#7A1C1C] text-white" : "text-white"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setAction("Register")}
                className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${
                  action === "Register" ? "bg-[#7A1C1C] text-white" : "text-white"
                }`}
              >
                Register
              </button>
            </div>

            <div className="w-full max-w-xs mx-auto">
                {action === "Register" && (
                    <>
                    <label className="flex justify-start text-sm font-semibold text-[#7A1C1C] mb-1">
                        Full Name
                    </label>
                    <div className="text-sm flex items-center h-10 border border-gray-400 rounded-lg px-3 mb-4">
                      <CircleUserRound size={20} color="#7A1C1C" className='mr-2' />
                    <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full outline-none bg-transparent"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    </>
                )}

                <label className="flex justify-start text-sm font-semibold text-[#7A1C1C] mb-1">
                    Email
                </label>
                <div className="text-sm flex items-center h-10 border border-gray-400 rounded-lg px-3 mb-4">
                  <Mail size={20} color="#7A1C1C" className="mr-2" />
                    <input
                    type="email"
                    placeholder="student@university.edu"
                    className="w-full outline-none bg-transparent"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <label className="flex justify-start text-sm font-semibold text-[#7A1C1C] mb-1">
                    Password
                </label>
                <div className="text-sm flex items-center h-10 border border-gray-400 rounded-lg px-3 mb-4">
                  <Lock size={20} color="#7A1C1C" className='mr-2'/>
                    <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full outline-none bg-transparent"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {action === "Register" && (
                    <>
                    <label className="flex justify-start text-sm font-semibold text-[#7A1C1C] mb-1">
                        Role <span className="text-red-500">*</span>
                    </label>
                    <div className="text-sm flex items-center border border-gray-400 rounded-lg px-3 mb-4">
                      <div className="flex gap-4 py-2 w-full">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="role"
                            value="Student"
                            checked={role === "Student"}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-4 h-4 text-[#7A1C1C] focus:ring-[#7A1C1C]"
                          />
                          <span className="text-[#7A1C1C]">Student</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="role"
                            value="Teacher"
                            checked={role === "Teacher"}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-4 h-4 text-[#7A1C1C] focus:ring-[#7A1C1C]"
                          />
                          <span className="text-[#7A1C1C]">Teacher</span>
                        </label>
                      </div>
                    </div>
                    </>
                )}

                  <button 
                    onClick={handleSubmit} 
                    disabled={loading}
                    className="text-sm w-full bg-[#7A1C1C] hover:bg-[#5a1515] text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Loading..." : action === "Sign In" ? "Sign In" : "Create Account"}
                  </button>
                

            </div>
          </div>
          </div>
        </section>
      </header>
    </div>
  );
};

export default Login;

