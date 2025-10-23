import { useState } from 'react';

const Login = () => {
  const [action, setAction] = useState("Sign In");

  return (
    <div className='container mx-auto bg-[#F2F2F2] min-h-screen'>
      <header>
        <section className='h-screen grid grid-cols-1 lg:grid-cols-2 justify-items-center items-center text-lg px-8 gap-8'>
          <div className='max-w-2xl'>
            <h1 className='text-4xl lg:text-6xl text-[#7A1C1C] font-black tracking-tight mb-10'>
              Secure File Sharing for Academic Excellence
            </h1>
            <p className='mb-8'>
              A trusted platform for students and teachers to share assignments, lecture notes, and research documents with end-to-end encryption and role-based access control.
            </p>
            <ul className='flex flex-col sm:flex-row gap-4 lg:gap-10'>
              <li>
                <div className='bg-white hover:bg-[#F9F0D9] px-6 py-5 text-sm rounded-lg border-solid border-2 border-black transition-colors cursor-default'>
                  <span className='font-semibold block'>Encrypted</span>
                  <span className='text-xs block mt-1'>End-to-end encryption for all file transfers and storage</span>
                </div>
              </li>
              <li>
                <div className='bg-white hover:bg-[#F9F0D9] px-6 py-5 text-sm rounded-lg border-solid border-2 border-black transition-colors cursor-default'>
                  <span className='font-semibold block'>Role-Based</span>
                  <span className='text-xs block mt-1'>Separate access controls for students and teachers</span>
                </div>
              </li>
              <li>
                <div className='bg-white hover:bg-[#F9F0D9] px-6 py-5 text-sm rounded-lg border-solid border-2 border-black transition-colors cursor-default'>
                  <span className='font-semibold block'>Reliable</span>
                  <span className='text-xs block mt-1'>Secure database storage with backup and recovery</span>
                </div>
              </li>
            </ul>
          </div>

          <div className='w-full max-w-[450px] rounded-lg bg-white text-center p-8 border-2 border-gray-200 ${
    action === "Register" ? "h-auto lg:h-[640px]" : "h-auto lg:h-[520px]"
  }`}'>
            <div className='text-4xl bg-yellow-200 border-solid border-2 border-black inline-block rounded-full w-16 h-16 items-center justify-center font-bold text-[#7A1C1C] mb-2'>
              .o.
            </div>
            <h1 className='text-xl font-bold text-[#7A1C1C] mt-4 mb-2'>Welcome to SecureShare</h1>
            <p className='font-light text-sm mb-6'>
              {action === "Sign In" ? "Sign in to access your secure academic files" : "Create an account to start sharing files securely"}
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
                        <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full outline-none bg-transparent"
                        />
                    </div>
                    </>
                )}

                <label className="flex justify-start text-sm font-semibold text-[#7A1C1C] mb-1">
                    Email
                </label>
                <div className="text-sm flex items-center h-10 border border-gray-400 rounded-lg px-3 mb-4">
                    <input
                    type="email"
                    placeholder="student@university.edu"
                    className="w-full outline-none bg-transparent"
                    />
                </div>

                {action === "Sign In"? <div></div>:<div><div className="flex justify-start text-sm font-semibold text-[#7A1C1C] mb-1">
                    Role
                </div>
                <div className="text-sm flex items-center h-10 border border-gray-400 rounded-lg px-3 mb-6 ">
            
                    <select>
                        <option>Select your role</option>
                        <option>Student</option>
                        <option>Instructor</option>
                        </select>
                </div>
                </div>}

                <label className="flex justify-start text-sm font-semibold text-[#7A1C1C] mb-1">
                    Password
                </label>
                <div className="text-sm flex items-center h-10 border border-gray-400 rounded-lg px-3 mb-6">
                    <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full outline-none bg-transparent"
                    />
                </div>

                  <button className="text-sm w-full bg-[#7A1C1C] hover:bg-[#5a1515] text-white font-semibold py-2.5 rounded-lg transition-colors">
                    {action === "Sign In" ? "Sign In" : "Create Account"}
                  </button>
                

            </div>
          </div>
        </section>
      </header>
    </div>
  );
};

export default Login;