import React from 'react';
import { ShieldCheck, Lock, KeyRound, FileLock } from 'lucide-react';

export const Security = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: 'User Authentication',
      description: 'Robust login process that verifies user identity before granting access to files and features.',
    },
    {
      icon: Lock,
      title: 'TLS/SSL Encryption',
      description: 'All file uploads and downloads are encrypted using TLS/SSL to prevent data interception.',
    },
    {
      icon: KeyRound,
      title: 'Secure Endpoints',
      description: 'Secure login and registration endpoints with password hashing for enhanced protection.',
    },
    {
      icon: FileLock,
      title: 'AES-256 File Encryption',
      description: 'Files are encrypted using AES-256 encryption before storage to ensure maximum security.',
    },
  ];

  return (
    <div className='bg-radial-at-center from-[#F9F0D9] to-[#F2F2F2] min-h-screen'>
      <header className='mx-auto px-4 max-w-7xl'>
        <section className='w-full min-h-[calc(100vh-140px)] flex items-start py-8'>
          <div className='w-full rounded-3xl bg-white/30 backdrop-blur-xl border border-white/20 shadow-2xl px-6 py-10 lg:px-12 lg:py-14'>
            <div className='text-center mb-10'>
              <h1 className='text-4xl lg:text-5xl text-[#7A1C1C] font-black tracking-tight mb-4'>
                Security
              </h1>
              <p className='text-lg text-[#7A1C1C]/80 max-w-2xl mx-auto text-pretty'>
                Discover the security features that make SecureShare the perfect platform for academic collaboration.
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8'>
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={index}
                    className='bg-white/40 backdrop-blur-lg border border-white/50 rounded-2xl p-6 lg:p-8 shadow-lg hover:bg-white/50 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 cursor-default'
                  >
                    <div className='bg-[#EAC9C9]/80 inline-flex items-center justify-center p-3 rounded-xl mb-4 border border-white/40'>
                      <IconComponent size={24} color="#7A1C1C" strokeWidth={2.5} />
                    </div>
                    <h3 className='text-xl font-bold text-[#7A1C1C] mb-3'>
                      {feature.title}
                    </h3>
                    <p className='text-sm text-[#7A1C1C]/80 leading-relaxed'>
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </header>
    </div>
  );
};

