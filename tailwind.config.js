module.exports = {
  theme: {
    extend: {
      animation: {
        orbit: 'orbit 10s linear infinite',
        glow: 'glow 1.5s ease-in-out infinite alternate',
        glitch: 'glitch 1.5s infinite linear alternate',
        ping: 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'ping-slow': 'ping 4s cubic-bezier(0, 0, 0.2, 1) infinite',
        'fadeIn': 'fadeIn 2s ease forwards',
        'scroll-up': 'scrollUp 10s linear infinite',
      },
      keyframes: {
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(140px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(140px) rotate(-360deg)' },
        },
        glow: {
          '0%': { opacity: 0.4 },
          '100%': { opacity: 0.8 },
        },
        glitch: {
          '0%, 100%': { transform: 'skewX(0deg)' },
          '25%': { transform: 'skewX(5deg)' },
          '50%': { transform: 'skewX(-5deg)' },
          '75%': { transform: 'skewX(2deg)' },
        },
        scrollUp: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
