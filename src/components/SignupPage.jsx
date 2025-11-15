import React, { useState } from 'react';
import { UserPlus, Mail, Lock, User, Briefcase, GraduationCap, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

const SignupPage = ({ onSignup, onBackToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validation functions
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
  };

  const getPasswordStrength = (password) => {
    const checks = validatePassword(password);
    const score = Object.values(checks).filter(Boolean).length;
    if (score <= 2) return { label: 'Weak', color: 'bg-red-500', width: '33%' };
    if (score <= 4) return { label: 'Medium', color: 'bg-yellow-500', width: '66%' };
    return { label: 'Strong', color: 'bg-green-500', width: '100%' };
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordChecks = validatePassword(formData.password);
      if (!Object.values(passwordChecks).every(Boolean)) {
        newErrors.password = 'Password does not meet all requirements';
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true, confirmPassword: true, role: true });
    
    if (validateForm()) {
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('auralearn_users') || '[]');
      const userExists = existingUsers.some(user => user.email === formData.email);
      
      if (userExists) {
        setErrors({ email: 'An account with this email already exists' });
        return;
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        email: formData.email.toLowerCase().trim(),
        password: formData.password, // In production, this should be hashed
        role: formData.role,
        createdAt: new Date().toISOString()
      };

      // Save to localStorage
      existingUsers.push(newUser);
      localStorage.setItem('auralearn_users', JSON.stringify(existingUsers));

      // Auto login after signup
      const userForLogin = { ...newUser };
      delete userForLogin.password; // Don't store password in session
      onSignup(userForLogin);
    }
  };

  const passwordChecks = formData.password ? validatePassword(formData.password) : null;
  const passwordStrength = formData.password ? getPasswordStrength(formData.password) : null;

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl mb-4 shadow-lg shadow-primary/20">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Join AuraLearn</h1>
          <p className="text-white/60">Create your account to get started</p>
        </div>

        {/* Signup Form */}
        <div className="glass-panel p-8 rounded-2xl animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={() => handleBlur('name')}
                  className={`w-full bg-dark-card/50 border ${
                    touched.name && errors.name ? 'border-red-500' : 'border-white/10'
                  } rounded-xl px-4 py-3 pl-11 text-white placeholder-white/30 focus:outline-none focus:border-primary transition-all`}
                  placeholder="Enter your full name"
                />
              </div>
              {touched.name && errors.name && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur('email')}
                  className={`w-full bg-dark-card/50 border ${
                    touched.email && errors.email ? 'border-red-500' : 'border-white/10'
                  } rounded-xl px-4 py-3 pl-11 text-white placeholder-white/30 focus:outline-none focus:border-primary transition-all`}
                  placeholder="you@example.com"
                />
              </div>
              {touched.email && errors.email && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={() => handleBlur('password')}
                  className={`w-full bg-dark-card/50 border ${
                    touched.password && errors.password ? 'border-red-500' : 'border-white/10'
                  } rounded-xl px-4 py-3 pl-11 pr-11 text-white placeholder-white/30 focus:outline-none focus:border-primary transition-all`}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && passwordStrength && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-white/60">Password Strength</span>
                    <span className={`text-xs font-medium ${
                      passwordStrength.label === 'Weak' ? 'text-red-400' :
                      passwordStrength.label === 'Medium' ? 'text-yellow-400' : 'text-green-400'
                    }`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-dark-card rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${passwordStrength.color} transition-all duration-300`}
                      style={{ width: passwordStrength.width }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Password Requirements */}
              {formData.password && passwordChecks && (
                <div className="mt-3 space-y-1">
                  {[
                    { key: 'minLength', label: 'At least 8 characters' },
                    { key: 'hasUpperCase', label: 'One uppercase letter' },
                    { key: 'hasLowerCase', label: 'One lowercase letter' },
                    { key: 'hasNumber', label: 'One number' },
                    { key: 'hasSpecial', label: 'One special character' }
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center gap-2">
                      <CheckCircle className={`w-3.5 h-3.5 ${
                        passwordChecks[key] ? 'text-green-400' : 'text-white/20'
                      }`} />
                      <span className={`text-xs ${
                        passwordChecks[key] ? 'text-white/70' : 'text-white/40'
                      }`}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              
              {touched.password && errors.password && !passwordChecks && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={() => handleBlur('confirmPassword')}
                  className={`w-full bg-dark-card/50 border ${
                    touched.confirmPassword && errors.confirmPassword ? 'border-red-500' : 
                    touched.confirmPassword && formData.confirmPassword && !errors.confirmPassword ? 'border-green-500' : 
                    'border-white/10'
                  } rounded-xl px-4 py-3 pl-11 pr-11 text-white placeholder-white/30 focus:outline-none focus:border-primary transition-all`}
                  placeholder="Re-enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.confirmPassword}
                </p>
              )}
              {touched.confirmPassword && formData.confirmPassword && !errors.confirmPassword && (
                <p className="text-green-400 text-sm mt-1 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Passwords match
                </p>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-3">I am a...</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, role: 'teacher' }));
                    setErrors(prev => ({ ...prev, role: '' }));
                  }}
                  className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    formData.role === 'teacher'
                      ? 'bg-primary border-primary shadow-lg shadow-primary/20'
                      : 'bg-dark-card/30 border-white/10 hover:border-primary/50'
                  }`}
                >
                  <Briefcase className={`w-8 h-8 ${
                    formData.role === 'teacher' ? 'text-white' : 'text-white/60'
                  }`} />
                  <span className={`font-medium ${
                    formData.role === 'teacher' ? 'text-white' : 'text-white/70'
                  }`}>
                    Teacher
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, role: 'student' }));
                    setErrors(prev => ({ ...prev, role: '' }));
                  }}
                  className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    formData.role === 'student'
                      ? 'bg-primary border-primary shadow-lg shadow-primary/20'
                      : 'bg-dark-card/30 border-white/10 hover:border-primary/50'
                  }`}
                >
                  <GraduationCap className={`w-8 h-8 ${
                    formData.role === 'student' ? 'text-white' : 'text-white/60'
                  }`} />
                  <span className={`font-medium ${
                    formData.role === 'student' ? 'text-white' : 'text-white/70'
                  }`}>
                    Student
                  </span>
                </button>
              </div>
              {touched.role && errors.role && (
                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.role}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full btn-primary py-3.5 rounded-xl font-semibold text-white shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
            >
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              Already have an account?{' '}
              <button
                onClick={onBackToLogin}
                className="text-primary hover:text-accent font-medium transition-colors"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-white/40 text-xs">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
