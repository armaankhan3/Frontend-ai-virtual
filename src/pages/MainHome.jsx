import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MainHome = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const particles = Array.from({ length: 15 }, (_, i) => (
    <div
      key={i}
      className="absolute rounded-full opacity-40"
      style={{
        width: `${Math.random() * 4 + 2}px`,
        height: `${Math.random() * 4 + 2}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        background: `linear-gradient(45deg, #00fff0, #822aff)`,
        animation: `float ${Math.random() * 3 + 4}s ease-in-out infinite`,
        animationDelay: `${Math.random() * 2}s`,
        zIndex: 1
      }}
    />
  ));

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#0f0c29] via-[#302b63] to-[#24243e] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Interactive Mouse Glow */}
      <div
        className="absolute w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle, rgba(0,255,240,0.3) 0%, transparent 70%)`,
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          transition: 'all 0.1s ease-out',
          zIndex: 1
        }}
      />
      {/* Enhanced Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">{particles}</div>
      {/* Navigation Bar */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-6">
        <div className="text-3xl font-bold bg-gradient-to-r from-[#00fff0] to-[#822aff] bg-clip-text text-transparent">
          NewWave AI
        </div>
        
      </nav>
      {/* Original Floating Orbs with VR enhancement */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className={`absolute rounded-full blur-3xl opacity-30 animate-orb${i % 3 + 1}`}
          style={{
            width: `${80 + i * 30}px`,
            height: `${80 + i * 30}px`,
            background: `radial-gradient(circle, #${['00fff0','822aff','ff00c8','00ffb3','ffb300','00b3ff'][i]}99 0%, transparent 80%)`,
            top: `${10 + i * 12}%`,
            left: `${i % 2 === 0 ? 5 + i * 10 : 60 - i * 7}%`,
            zIndex: 0,
          }}
        />
      ))}
      {/* VR-style number indicator */}
      <div className="absolute top-32 left-8 text-6xl md:text-8xl font-thin text-white/10 tracking-widest z-10">01</div>
      {/* Enhanced Title with VR styling */}
      <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00fff0] via-[#822aff] to-[#00fff0] animate-text-glow text-center mb-6 z-10 drop-shadow-[0_0_40px_#00fff088] tracking-wider">
        Welcome to NewWave AI
      </h1>
      {/* VR-style subtitle enhancement */}
      <div className="text-center mb-4 z-10">
        <p className="text-lg md:text-xl text-white/60 tracking-widest font-light uppercase">
          THE FUTURE IS NOW
        </p>
      </div>
      {/* Original Subtitle */}
      <p className="text-xl md:text-2xl font-medium text-gray-300 text-center mb-12 max-w-2xl z-10 animate-fade-in delay-100">
        Your futuristic AI assistant hub — build, personalize, and interact with your own smart virtual guide.
      </p>
      {/* Enhanced Action Buttons with VR styling */}
      <div className="flex flex-col md:flex-row gap-6 z-10 animate-fade-in delay-200">
        <button
          type="button"
          onClick={() => navigate('/signin')}
          className="group relative px-12 py-4 bg-gradient-to-r from-[#00fff0] to-[#822aff] text-white text-2xl font-bold rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_#00fff0aa]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#822aff] to-[#00fff0] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative flex items-center justify-center space-x-3">
            <span>Sign In</span>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </div>
          </div>
        </button>
        <button
          type="button"
          onClick={() => navigate('/signup')}
          className="group relative px-12 py-4 bg-gradient-to-r from-[#822aff] to-[#00fff0] text-white text-2xl font-bold rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_#822affaa]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#00fff0] to-[#822aff] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative flex items-center justify-center space-x-3">
            <span>Sign Up</span>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
          </div>
        </button>
      </div>
      {/* VR-style Feature Cards */}
      <div className="absolute bottom-8 left-8 right-8 grid md:grid-cols-3 gap-4 max-w-4xl mx-auto z-10">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00fff0] to-[#822aff] flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">Smart AI</h3>
              <p className="text-white/60 text-xs">Intelligent responses</p>
            </div>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#822aff] to-[#00fff0] flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">Customize</h3>
              <p className="text-white/60 text-xs">Personalize your AI</p>
            </div>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00fff0] to-[#ff00c8] flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">Fast & Secure</h3>
              <p className="text-white/60 text-xs">Lightning speed</p>
            </div>
          </div>
        </div>
      </div>
      {/* Enhanced Glowing Grid Background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00fff0" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      {/* Custom CSS for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }
        @keyframes orb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.1); }
        }
        @keyframes orb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, 30px) scale(0.9); }
        }
        @keyframes orb3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 20px) scale(1.05); }
        }
        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 20px #00fff088, 0 0 40px #822aff44; }
          50% { text-shadow: 0 0 30px #822aff88, 0 0 60px #00fff044; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-orb1 { animation: orb1 8s ease-in-out infinite; }
        .animate-orb2 { animation: orb2 10s ease-in-out infinite; }
        .animate-orb3 { animation: orb3 12s ease-in-out infinite; }
        .animate-text-glow { animation: text-glow 3s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>
    </div>
  );
};

export default MainHome;