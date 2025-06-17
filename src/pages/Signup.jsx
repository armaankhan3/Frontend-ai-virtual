import React, { useState, useContext } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contaxt/UserContext';
import axios from 'axios';

// Futuristic animated background component
const FuturisticBG = () => (
  <>
    <div className="absolute inset-0 bg-gradient-to-br from-[#0f0026] via-[#1a0a3c] to-[#0a0f1c] animate-bg-fade z-0" />
    <div className="absolute inset-0 pointer-events-none z-0">
      {/* Neon grid */}
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
      {/* Floating hologram orbs */}
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
  <div className="relative w-[380px] min-h-[520px] bg-[#181c2f]/90 rounded-3xl shadow-[0_0_40px_#822aff55] border-2 border-[#822aff44] flex flex-col items-center px-8 py-10 z-10 overflow-hidden">
    {/* Animated neon ring */}
    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[340px] h-[340px] border-4 border-[#00fff0]/30 rounded-full animate-spin-slow blur-xl opacity-40 z-0" />
    {/* Animated floating chips */}
    {[...Array(4)].map((_, i) => (
      <div key={i} className={`absolute w-16 h-4 bg-gradient-to-r from-[#822aff] to-[#00fff0] rounded-full blur-md opacity-30 animate-chip${i+1}`} style={{top: `${20+i*60}px`, left: `${i%2===0?'-40px':'auto'}`, right: `${i%2!==0?'-40px':'auto'}`}} />
    ))}
    <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#822aff] to-[#00fff0] mb-8 z-10 tracking-wider drop-shadow-lg">{title}</h2>
    <div className="w-full flex flex-col gap-5 z-10">{children}</div>
    <div className="mt-8 w-full text-center z-10">{footer}</div>
  </div>
);

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { serverUrl, userdata, setUserdata } = useContext(UserContext);

  // Restore user from localStorage if available
  React.useEffect(() => {
    if (!userdata) {
      const stored = localStorage.getItem('userdata');
      if (stored) setUserdata(JSON.parse(stored));
    }
  }, []);

  const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(password);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();
    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      setError("All fields are required.");
      return;
    }
    if (!validatePassword(trimmedPassword)) {
      setError("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
      return;
    }
    try {
      // Use /api/auth/signup for backend compatibility
      const result = await axios.post(`${serverUrl}/api/auth/signup`, { name: trimmedName, email: trimmedEmail, password: trimmedPassword }, { withCredentials: true });
      if (!result.data.user && !result.data._id) {
        setError("Signup failed. Please try again.");
        return;
      }
      setUserdata(result.data.user || result.data);
      localStorage.setItem('userdata', JSON.stringify(result.data.user || result.data));
      setError("");
      navigate('/customize'); // Redirect to customization page
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <FuturisticBG />
      <AuthCard
        title="Create Your AI Account"
        footer={<>
          <button
            type="submit"
            className="w-full py-3 mt-2 rounded-2xl bg-gradient-to-r from-[#191819] to-[#00fff0] text-white font-bold text-lg shadow-lg hover:from-[#00fff0] hover:to-[#822aff] transition-all duration-200 tracking-wider"
            form="signup-form"
          >Signin</button>
          <div className="mt-4 text-[#bfaaff] text-sm">
            Already have an account?{' '}
            <span className="text-[#00fff0] cursor-pointer hover:underline" onClick={() => navigate('/signin')}>Sign In</span>
          </div>
        </>}
      >
        <form id="signup-form" onSubmit={handleSignup} className="flex flex-col gap-5">
          <Input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            autoComplete="username"
          />
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
            autoComplete="new-password"
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

export default Signup;
