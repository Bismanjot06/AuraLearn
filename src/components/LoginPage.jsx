import React, { useState } from 'react';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('teacher');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, role });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="particles-bg">
        <div className="particle w-96 h-96 bg-primary/10 -top-32 -left-32 blur-3xl animate-float"></div>
        <div className="particle w-80 h-80 bg-accent/8 top-1/4 right-0 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="particle w-72 h-72 bg-primary/6 bottom-0 left-1/4 blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Login Card */}
      <div className="glass-panel p-8 md:p-12 max-w-md w-full relative z-10 animate-scale-in">
        {/* Logo and Tagline */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-3 text-iridescent">
            AuraLearn
          </h1>
          <p className="text-white/60 text-sm md:text-base">
            Intelligent Learning Begins Here
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium mb-2 text-white/80">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input-glass"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium mb-2 text-white/80">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="input-glass"
              required
            />
          </div>

          {/* Role Selector */}
          <div>
            <label className="block text-sm font-medium mb-3 text-white/80">
              Select Role
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setRole('teacher')}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  role === 'teacher'
                    ? 'bg-gradient-to-r from-primary-dark to-accent text-white shadow-lg shadow-primary/30'
                    : 'bg-dark-card/40 border border-primary/20 text-white/60 hover:bg-dark-card/60'
                }`}
              >
                Teacher
              </button>
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  role === 'student'
                    ? 'bg-gradient-to-r from-primary-dark to-accent text-white shadow-lg shadow-primary/30'
                    : 'bg-dark-card/40 border border-primary/20 text-white/60 hover:bg-dark-card/60'
                }`}
              >
                Student
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full btn-primary text-lg py-4 mt-6 animate-glow"
          >
            Login
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center mt-6 text-white/50 text-sm">
          Don't have an account?{' '}
          <a href="#" className="text-primary hover:text-primary-light transition-colors">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
