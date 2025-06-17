import React, { useState, useContext } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contaxt/UserContext';
import axios from 'axios';

const FuturisticBG = () => (
  <>
    <div className="absolute inset-0 bg-gradient-to-br from-[#0f0026] via-[#1a0a3c] to-[#0a0f1c] animate-bg-fade z-0" />
    <div className="absolute inset-0 pointer-events-none z-0">
      <svg className="absolute w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="grid" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#822aff" />
            <stop offset="100%" stopColor="#00fff0" />
          </linearGradient>
        </defs>
        {[...Array(20)].map((_, i) => (
          <line key={i} x1={i * 5} y1="0" x2={i * 5} y2="100" stroke="url(#grid)" strokeWidth="0.2" />
        ))}
        {[...Array(20)].map((_, i) => (
          <line key={i+100} x1="0" y1={i * 5} x2="100" y2={i * 5} stroke="url(#grid)" strokeWidth="0.2" />
        ))}
      </svg>
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className={`absolute rounded-full blur-2xl opacity-40 animate-orb${i%3+1}`}
          style={{
            width: `${80 + i*20}px`,
            height: `${80 + i*20}px`,
            background: `radial-gradient(circle, #${['822aff','00fff0','ff00c8','00ffb3','ffb300','00b3ff'][i]}99 0%, transparent 80%)`,
            top: `${10 + i*12}%`,
            left: `${i%2===0 ? 5+i*10 : 60-i*7}%`,
            zIndex: 0
          }}
        />
      ))}
    </div>
  </>
);

const Input = ({ type, placeholder, value, onChange, autoComplete, icon, show, onIconClick }) => (
  <div className="relative w-full">
    <input
      type={type}
      placeholder={placeholder}
      className="w-full h-12 px-5 pr-12 rounded-2xl border border-[#822aff] bg-[#181c2f]/80 text-white placeholder:text-[#bfaaff] focus:ring-2 focus:ring-[#00fff0] focus:outline-none text-lg transition-all duration-200 shadow-[0_0_16px_#822aff33]"
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
    />
    {icon && (
      <span className="absolute top-1/2 right-4 -translate-y-1/2 text-xl text-[#bfaaff] cursor-pointer" onClick={onIconClick}>
        {show ? <IoEyeOff /> : <IoEye />}
      </span>
    )}
  </div>
);

const AuthCard = ({ title, children, footer }) => (
  <div className="relative w-[380px] min-h-[420px] bg-[#181c2f]/90 rounded-3xl shadow-[0_0_40px_#822aff55] border-2 border-[#822aff44] flex flex-col items-center px-8 py-10 z-10 overflow-hidden">
    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[340px] h-[340px] border-4 border-[#00fff0]/30 rounded-full animate-spin-slow blur-xl opacity-40 z-0" />
    {[...Array(4)].map((_, i) => (
      <div key={i} className={`absolute w-16 h-4 bg-gradient-to-r from-[#822aff] to-[#00fff0] rounded-full blur-md opacity-30 animate-chip${i+1}`} style={{top: `${20+i*60}px`, left: `${i%2===0?'-40px':'auto'}`, right: `${i%2!==0?'-40px':'auto'}`}} />
    ))}
    <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#822aff] to-[#00fff0] mb-8 z-10 tracking-wider drop-shadow-lg">{title}</h2>
    <div className="w-full flex flex-col gap-5 z-10">{children}</div>
    <div className="mt-8 w-full text-center z-10">{footer}</div>
  </div>
);

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { serverUrl, userdata, setUserdata } = useContext(UserContext);

  React.useEffect(() => {
    if (!userdata) {
      const stored = localStorage.getItem('userdata');
      if (stored) setUserdata(JSON.parse(stored));
    }
  }, []);

  const handleSignin = async (e) => {
    e.preventDefault();
    setError("");
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();
    if (!trimmedEmail || !trimmedPassword) {
      setError("All fields are required.");
      return;
    }
    try {
      // Use /api/auth/login for backend compatibility
      const result = await axios.post(`${serverUrl}/api/auth/login`, { email: trimmedEmail, password: trimmedPassword }, { withCredentials: true });
      if (!result.data.user) {
        setError("Invalid credentials or user not found.");
        return;
      }
      setUserdata(result.data.user);
      localStorage.setItem('userdata', JSON.stringify(result.data.user));
      setError("");
      if (result.data.user?.assistantImage && result.data.user?.assistantName) {
        navigate('/home');
      } else {
        navigate('/customize');
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Signin failed. Please check your credentials and try again.");
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <FuturisticBG />
      <AuthCard
        title="Welcome Back, Human"
        footer={(
          <>
            <button
              type="submit"
              className="w-full py-3 mt-2 rounded-2xl bg-gradient-to-r from-[#822aff] to-[#00fff0] text-white font-bold text-lg shadow-lg hover:from-[#00fff0] hover:to-[#822aff] transition-all duration-200 tracking-wider"
              form="signin-form"
            >Sign In</button>
            <div className="mt-4 text-[#bfaaff] text-sm">
              {`Don't have an account? `}
              <span className="text-[#00fff0] cursor-pointer hover:underline" onClick={() => navigate('/signup')}>Sign Up</span>
            </div>
          </>
        )}
      >
        <form id="signin-form" onSubmit={handleSignin} className="flex flex-col gap-5">
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
          />
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
            icon
            show={showPassword}
            onIconClick={() => setShowPassword(s => !s)}
          />
          {error && (
            <div className="text-pink-400 text-xs text-center animate-pulse mt-2">{error}</div>
          )}
        </form>
      </AuthCard>
    </div>
  );
};

export default Signin;
