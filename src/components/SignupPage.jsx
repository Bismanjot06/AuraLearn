import React, { useState } from 'react';
import { UserPlus, Mail, Lock, User, Briefcase, GraduationCap, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

import { useEffect } from 'react';

const SignupPage = ({ onSignup, onBackToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    teacherId: ''  
  });

  const [teachers, setTeachers] = useState([]);  //  Load teachers for students

  useEffect(() => {
    const loadTeachers = async () => {
      try {
        const res = await fetch("/api/teachers");
        const data = await res.json();
        setTeachers(data.teachers || []);
      } catch (err) {
        console.error("Failed to load teachers", err);
      }
    };
    loadTeachers();
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Email validation
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Password validation
  const validatePassword = (password) => ({
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  });

  const getPasswordStrength = (password) => {
    const checks = validatePassword(password);
    const score = Object.values(checks).filter(Boolean).length;
    if (score <= 2) return { label: 'Weak', color: 'bg-red-500', width: '33%' };
    if (score <= 4) return { label: 'Medium', color: 'bg-yellow-500', width: '66%' };
    return { label: 'Strong', color: 'bg-green-500', width: '100%' };
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (formData.name.length < 2) newErrors.name = 'Name must be at least 2 characters';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';

    if (!formData.password) newErrors.password = 'Password is required';
    else {
      const checks = validatePassword(formData.password);
      if (!Object.values(checks).every(Boolean))
        newErrors.password = 'Password does not meet all requirements';
    }

    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    if (!formData.role) newErrors.role = 'Please select a role';
    
    if (formData.role === 'student' && !formData.teacherId) {
      newErrors.teacherId = 'Please select your teacher/mentor';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };


   const signupUser = async (formData) => {
  try {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Signup failed");
    }

    return data; // user ko return karta hai
  } catch (error) {
    throw error;
  }
};


  const handleSubmit = async (e) => {
  e.preventDefault();
  setTouched({
    name: true,
    email: true,
    password: true,
    confirmPassword: true,
    role: true,
    teacherId: formData.role === 'student'
  });

  // Validate
  if (!validateForm()) return;

  try {
    const response = await signupUser({
      name: formData.name,
      email: formData.email.toLowerCase(),
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      role: formData.role,
      teacher_id: formData.role === 'student' ? formData.teacherId : null,
    });

    onSignup(response.user); // backend se user aya hoga

  } catch (error) {
    setErrors({ email: error.message }); // backend error show
  }
};

  const passwordChecks = formData.password ? validatePassword(formData.password) : null;
  const passwordStrength = formData.password ? getPasswordStrength(formData.password) : null;

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4 relative overflow-hidden">

      <div className="w-full max-w-md relative z-10">

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl mb-4 shadow-lg shadow-primary/20">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Join AuraLearn</h1>
          <p className="text-white/60">Create your account to get started</p>
        </div>

        <div className="glass-panel p-8 rounded-2xl">

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* NAME */}
            <div>
              <label className="block text-white/80 text-sm mb-2">Full Name</label>
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
                  } rounded-xl px-4 py-3 pl-11 text-white`}
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

            {/* EMAIL */}
            <div>
              <label className="block text-white/80 text-sm mb-2">Email Address</label>
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
                  } rounded-xl px-4 py-3 pl-11 text-white`}
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

            {/* PASSWORD */}
            <div>
              <label className="block text-white/80 text-sm mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 w-5 h-5 text-white/40 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={() => handleBlur('password')}
                  className={`w-full bg-dark-card/50 border ${
                    touched.password && errors.password ? "border-red-500" : "border-white/10"
                  } rounded-xl px-4 py-3 pl-11 pr-11 text-white`}
                  placeholder="Create a strong password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>

              {/* PASSWORD STRENGTH BAR */}
              {passwordStrength && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-white/60">Password Strength</span>
                    <span className={`text-xs font-medium ${
                      passwordStrength.label === "Weak"
                        ? "text-red-400"
                        : passwordStrength.label === "Medium"
                        ? "text-yellow-400"
                        : "text-green-400"
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

              {/* REQUIREMENTS */}
              {passwordChecks && (
                <div className="mt-3 space-y-1">
                  {[
                    { key: "minLength", label: "At least 8 characters" },
                    { key: "hasUpperCase", label: "One uppercase letter" },
                    { key: "hasLowerCase", label: "One lowercase letter" },
                    { key: "hasNumber", label: "One number" },
                    { key: "hasSpecial", label: "One special character" },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center gap-2">
                      <CheckCircle
                        className={`w-3.5 h-3.5 ${
                          passwordChecks[key] ? "text-green-400" : "text-white/20"
                        }`}
                      />
                      <span
                        className={`text-xs ${
                          passwordChecks[key] ? "text-white/70" : "text-white/40"
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="block text-white/80 text-sm mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 w-5 h-5 text-white/40 -translate-y-1/2" />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={() => handleBlur('confirmPassword')}
                  className={`w-full bg-dark-card/50 border ${
                    touched.confirmPassword && errors.confirmPassword
                      ? "border-red-500"
                      : touched.confirmPassword && formData.confirmPassword
                      ? "border-green-500"
                      : "border-white/10"
                  } rounded-xl px-4 py-3 pl-11 pr-11 text-white`}
                  placeholder="Re-enter password"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>

              {touched.confirmPassword && errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.confirmPassword}
                </p>
              )}

              {touched.confirmPassword &&
                formData.confirmPassword &&
                !errors.confirmPassword && (
                  <p className="text-green-400 text-sm mt-1 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Passwords match
                  </p>
                )}
            </div>

            {/* ROLE SELECT */}
            <div>
              <label className="block text-white/80 text-sm mb-3">I am a...</label>
              <div className="grid grid-cols-2 gap-3">

                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: "teacher" }))}
                  className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 ${
                    formData.role === "teacher"
                      ? "bg-primary border-primary"
                      : "bg-dark-card/30 border-white/10"
                  }`}
                >
                  <Briefcase className="w-8 h-8 text-white" />
                  <span className="font-medium text-white">Teacher</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: "student" }))}
                  className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 ${
                    formData.role === "student"
                      ? "bg-primary border-primary"
                      : "bg-dark-card/30 border-white/10"
                  }`}
                >
                  <GraduationCap className="w-8 h-8 text-white" />
                  <span className="font-medium text-white">Student</span>
                </button>

              </div>

              {touched.role && errors.role && (
                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.role}
                </p>
              )}
            </div>

            {/* Teacher/Mentor Selection - Only for Students */}
            {formData.role === 'student' && (
              <div className="animate-slide-up">
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Select Your Teacher/Mentor
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <select
                    name="teacherId"
                    value={formData.teacherId}
                    onChange={handleChange}
                    onBlur={() => handleBlur('teacherId')}
                    className={`w-full bg-dark-card/50 border ${
                      touched.teacherId && errors.teacherId ? 'border-red-500' : 'border-white/10'
                    } rounded-xl px-4 py-3 pl-11 text-white focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer`}
                  >
                    <option value="" className="bg-dark-card text-white/60">
                      Choose a teacher...
                    </option>
                    {teachers.map(teacher => (
                      <option key={teacher.id} value={teacher.id} className="bg-dark-card text-white">
                        {teacher.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {touched.teacherId && errors.teacherId && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.teacherId}
                  </p>
                )}
              </div>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full btn-primary py-3.5 rounded-xl font-semibold text-white"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              Already have an account?{" "}
              <button onClick={onBackToLogin} className="text-primary font-medium">
                Sign in here
              </button>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-white/40 text-xs">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
