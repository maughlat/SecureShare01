import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, CircleUserRound, ShieldCheck } from 'lucide-react';
import { FaLock,  FaShieldAlt, FaUsers } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";
import Navbar from './Navbar';

const Login = () => {
  const [action, setAction] = useState("Sign In");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Demo-only auth: accept any non-empty email/password
    if (action === "Sign In") {
      if (!email || !password) return;
      localStorage.setItem(
        'authUser',
        JSON.stringify({ email })
      );
      navigate('/portal');
      return;
    }

    // Register flow (demo): require minimal fields
    if (!fullName || !email || !password || !role) return;
    localStorage.setItem(
      'authUser',
      JSON.stringify({ fullName, email, role })
    );
    navigate('/portal');
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
                <div className="text-sm flex items-center h-10 border border-gray-400 rounded-lg px-3 mb-6">
                  <Lock size={20} color="#7A1C1C" className='mr-2'/>
                    <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full outline-none bg-transparent"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                  <button onClick={handleSubmit} className="text-sm w-full bg-[#7A1C1C] hover:bg-[#5a1515] text-white font-semibold py-2.5 rounded-lg transition-colors">
                    {action === "Sign In" ? "Sign In" : "Create Account"}
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

