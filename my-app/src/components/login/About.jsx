import React from 'react'
import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from "react-icons/fa6";
import toniPic from '../../assets/toni_pic.JPG'
import mikaPic from '../../assets/mika_pic.JPG'
import andrianPic from '../../assets/andrian_pic.JPG'

export const About = () => {
  return (
    <div className="min-h-screen bg-radial-at-center from-[#F9F0D9] to-[#F2F2F2] py-16 px-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="w-full">
          <div className="w-full text-center bg-white/30 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl px-6 py-12 md:px-12 md:py-16">
            <h1 className="text-4xl md:text-6xl font-black text-[#7A1C1C] mb-6 leading-tight text-pretty">
              Our mission is to make academic collaboration<br />safer, simpler, and<br />more organized.
            </h1>
            <p className="text-base md:text-xl text-[#7A1C1C] opacity-80">
              A secure platform for students and teachers to share and manage files with confidence.
            </p>
          </div>
        </div>

        {/* Our Team Section */}
        <div className="w-full bg-[#7A1C1C]/65 backdrop-blur-3xl border border-white/30 rounded-3xl shadow-xl px-6 py-12 md:px-10 md:py-14">
          <h2 className="text-3xl md:text-4xl font-black text-white text-center mb-10">
            Our Team
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
            {/* Toni Ahn Narra */}
            <div className="max-w-sm mx-auto rounded-[32px] overflow-hidden shadow-2xl border border-white/25 backdrop-blur-xl bg-white/5">
              {/* Image */}
              <div className="bg-[#111111]">
                <img 
                  src={toniPic} 
                  alt="Toni Ahn Narra" 
                  className="w-full h-[360px] object-cover"
                />
              </div>
              {/* Glass bottom panel */}
              <div className="bg-[#F2C4C4]/65 backdrop-blur-2xl border-t border-white/40 px-6 py-5 flex flex-col items-center">
                <h3 className="text-lg font-bold text-[#7A1C1C] mb-1">
                  Toni Ahn Narra
                </h3>
                <p className="text-xs text-[#7A1C1C]/80 mb-4">
                  Developed the Back End
                </p>
                <div className="flex justify-center gap-5 text-[#7A1C1C] text-lg">
                  <a href="https://www.facebook.com/to.ni.345792" target="_blank" className="cursor-pointer hover:text-[#a53131] transition-colors"><FaFacebook /></a>
                  <a href="https://linkedin.com/in/toni-ahn-narra-703421299" target="_blank" className="cursor-pointer hover:text-[#a53131] transition-colors"><FaLinkedin /></a>
                  <a href="https://www.instagram.com/tonisoprano._/" target="_blank" className="cursor-pointer hover:text-[#a53131] transition-colors"><FaInstagram /></a>
                </div>
              </div>
            </div>

            {/* Jan Mikylla Tabamo */}
            <div className="max-w-sm mx-auto rounded-[32px] overflow-hidden shadow-2xl border border-white/25 backdrop-blur-xl bg-white/5">
              {/* Image */}
              <div className="bg-[#111111]">
                <img 
                  src={mikaPic} 
                  alt="Jan Mikylla Tabamo" 
                  className="w-full h-[360px] object-cover"
                />
              </div>
              {/* Glass bottom panel */}
              <div className="bg-[#F2C4C4]/65 backdrop-blur-2xl border-t border-white/40 px-6 py-5 flex flex-col items-center">
                <h3 className="text-lg font-bold text-[#7A1C1C] mb-1">
                  Jan Mikylla Tabamo
                </h3>
                <p className="text-xs text-[#7A1C1C]/80 mb-4">
                  Developed the Front End &amp; Back End
                </p>
                <div className="flex justify-center gap-5 text-[#7A1C1C] text-lg">
                  <a href="https://www.facebook.com/janmikylla.tabamo" target="_blank" className="cursor-pointer hover:text-[#a53131] transition-colors"><FaFacebook /></a>
                   <a href="https://linkedin.com/in/mikylla-tabamo-49a526338" target="_blank" className="cursor-pointer hover:text-[#a53131] transition-colors"><FaLinkedin /></a>
                  <a href="https://www.instagram.com/bbly.mika/" target="_blank" className="cursor-pointer hover:text-[#a53131] transition-colors"><FaInstagram /></a>
                </div>
              </div>
            </div>

            {/* Andrian Veliganio */}
            <div className="max-w-sm mx-auto rounded-[32px] overflow-hidden shadow-2xl border border-white/25 backdrop-blur-xl bg-white/5">
              {/* Image */}
              <div className="bg-[#111111]">
                <img  
                  src={andrianPic} 
                  alt="Andrian Veliganio" 
                  className="w-full h-[360px] object-cover"
                />
              </div>
              {/* Glass bottom panel */}
              <div className="bg-[#F2C4C4]/65 backdrop-blur-2xl border-t border-white/40 px-6 py-5 flex flex-col items-center">
                <h3 className="text-lg font-bold text-[#7A1C1C] mb-1">
                  Andrian Veliganio
                </h3>
                <p className="text-xs text-[#7A1C1C]/80 mb-4">
                  Developed the Front End
                </p>
                <div className="flex justify-center gap-5 text-[#7A1C1C] text-lg">
                  <a href="https://www.facebook.com/andrian.2005" target="_blank" className="cursor-pointer hover:text-[#a53131] transition-colors"><FaFacebook /></a>
                  <a href="https://www.linkedin.com/in/andrian-veliganio-3b9813381/" target="_blank" className="cursor-pointer hover:text-[#a53131] transition-colors"><FaLinkedin /></a>
                  <a href="https://www.instagram.com/andriaaanxx/" target="_blank" className="cursor-pointer hover:text-[#a53131] transition-colors"><FaInstagram /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


