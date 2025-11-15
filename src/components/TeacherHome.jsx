import React from 'react';

const TeacherHome = () => {
  const stats = [
    { id: 1, icon: '👥', label: 'Total Students', value: '248', color: 'from-primary-dark to-primary' },
    { id: 2, icon: '📝', label: 'Quizzes Created', value: '42', color: 'from-accent to-accent-light' },
    { id: 3, icon: '⚠️', label: 'At-Risk Alerts', value: '8', color: 'from-primary to-accent' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="glass-panel p-8 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
            Welcome back, Teacher! 👋
          </h1>
          <p className="text-white/70">
            Here's what's happening with your classes today.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.id} className="stats-card group">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
              {stat.icon}
            </div>
            <p className="text-white/60 text-sm mb-1">{stat.label}</p>
            <p className="text-4xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span>📋</span> Recent Activity
        </h2>
        <div className="space-y-3">
          {[
            { text: 'Quiz "Advanced Calculus" completed by 32 students', time: '2 hours ago' },
            { text: '5 new students enrolled in Chemistry 101', time: '5 hours ago' },
            { text: 'Learning gap detected in Physics module', time: '1 day ago' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-dark-card/40 hover:bg-dark-card/60 transition-all duration-300">
              <p className="text-white/80 text-sm">{activity.text}</p>
              <span className="text-white/40 text-xs">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span>⚡</span> Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="btn-primary text-left flex items-center gap-3 justify-start">
            <span className="text-2xl">📤</span>
            <div>
              <p className="font-semibold">Upload Syllabus</p>
              <p className="text-xs opacity-80">Generate AI-powered quizzes</p>
            </div>
          </button>
          <button className="btn-secondary text-left flex items-center gap-3 justify-start">
            <span className="text-2xl">📊</span>
            <div>
              <p className="font-semibold">View Analytics</p>
              <p className="text-xs opacity-80">Check student performance</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;
