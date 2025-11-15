import React, { useState } from 'react';

const SignupPage = ({ onSignup, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('teacher');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Call the signup handler
    onSignup({ name, email, role });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="particles-bg">
        <div className="particle w-96 h-96 bg-primary/10 -top-32 -left-32 blur-3xl animate-float"></div>
        <div className="particle w-80 h-80 bg-accent/8 top-1/4 right-0 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="particle w-72 h-72 bg-primary/6 bottom-0 left-1/4 blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Signup Card */}
      <div className="glass-panel p-8 md:p-12 max-w-md w-full relative z-10 animate-scale-in">
        {/* Logo and Tagline */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-3 text-iridescent">
            AuraLearn
          </h1>
          <p className="text-white/60 text-sm md:text-base">
            Create Your Learning Journey
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium mb-2 text-white/80">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="input-glass"
              required
            />
          </div>

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
              placeholder="Create a password"
              className="input-glass"
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-sm font-medium mb-2 text-white/80">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="input-glass"
              required
            />
          </div>

          {/* Role Selector */}
          <div>
            <label className="block text-sm font-medium mb-3 text-white/80">
              I am a
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

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full btn-primary text-lg py-4 mt-6 animate-glow"
          >
            Create Account
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center mt-6 text-white/50 text-sm">
          Already have an account?{' '}
          <button 
            onClick={onSwitchToLogin}
            className="text-primary hover:text-primary-light transition-colors"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
