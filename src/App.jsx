import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import TeacherHome from './components/TeacherHome';
import UploadQuiz from './components/UploadQuiz';
import TeacherAnalytics from './components/TeacherAnalytics';
import StudentSidebar from './components/StudentSidebar';
import StudentHome from './components/StudentHome';
import QuizAttempt from './components/QuizAttempt';
import StudentChatBot from './components/StudentChatBot';
import './App.css';


function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [showSignup, setShowSignup] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
    setActiveTab('home');
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('home');
  };

  // Login/Signup Page
  if (!user) {
    if (showSignup) {
      return (
        <SignupPage 
          onSignup={handleLogin} 
          onBackToLogin={() => setShowSignup(false)} 
        />
      );
    }
    return (
      <LoginPage 
        onLogin={handleLogin} 
        onShowSignup={() => setShowSignup(true)} 
      />
    );
  }

  // Teacher Dashboard
  if (user.role === 'teacher') {
    return (
      <div className="min-h-screen">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <Topbar userName={user.email?.split('@')[0] || 'Teacher'} />
        
        <main className="ml-64 mt-16 p-8">
          {activeTab === 'home' && <TeacherHome />}
          {activeTab === 'upload' && <UploadQuiz />}
          {activeTab === 'analytics' && <TeacherAnalytics />}
          {activeTab === 'quizzes' && (
            <div className="glass-card p-12 text-center">
              <div className="text-6xl mb-4 opacity-30">📝</div>
              <p className="text-white/50">Quizzes management coming soon...</p>
            </div>
          )}
        </main>
      </div>
    );
  }

  // Student Dashboard
  if (user.role === 'student') {
    return (
      <div className="min-h-screen">
        <StudentSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <Topbar userName={user.email?.split('@')[0] || 'Student'} />
        
        <main className="ml-64 mt-16 p-8">
          {activeTab === 'home' && <StudentHome />}
          {activeTab === 'learning' && <QuizAttempt />}
          {activeTab === 'chatbot' && <StudentChatBot />}
          {activeTab === 'quizzes' && (
            <div className="glass-card p-12 text-center">
              <div className="text-6xl mb-4 opacity-30">📝</div>
              <p className="text-white/50">Your quizzes will appear here...</p>
            </div>
          )}
          {activeTab === 'progress' && (
            <div className="glass-card p-12 text-center">
              <div className="text-6xl mb-4 opacity-30">📊</div>
              <p className="text-white/50">Progress tracking coming soon...</p>
            </div>
          )}
        </main>
      </div>
    );
  }

  return null;
}

export default App;
