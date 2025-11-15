import React from 'react';

const StudentHome = () => {
  const learningPath = [
    { id: 1, icon: '📹', label: 'Watch Video', completed: true },
    { id: 2, icon: '📖', label: 'Read Article', completed: true },
    { id: 3, icon: '📝', label: 'Take Quiz', completed: false },
    { id: 4, icon: '🎯', label: 'Practice', completed: false },
  ];

  const recommendations = [
    {
      type: 'video',
      title: 'Introduction to Calculus',
      description: 'Master the fundamentals of differential calculus',
      duration: '15 min',
      thumbnail: '📹',
    },
    {
      type: 'article',
      title: 'Physics: Newton\'s Laws',
      description: 'Comprehensive guide to motion and forces',
      duration: '10 min read',
      thumbnail: '📖',
    },
    {
      type: 'quiz',
      title: 'Chemistry Basics Quiz',
      description: 'Test your knowledge on atomic structure',
      duration: '12 questions',
      thumbnail: '📝',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="glass-panel p-8 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
            Welcome, Student! 🎓
          </h1>
          <p className="text-white/70">
            Continue your learning journey where you left off
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      {/* Learning Path */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span>🛤️</span> Your Learning Path
        </h2>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          {learningPath.map((step) => (
            <div
              key={step.id}
              className={`flex-shrink-0 w-32 h-32 rounded-xl flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
                step.completed
                  ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}
            >
              <span className="text-4xl">{step.icon}</span>
              <p className="text-sm text-center text-white/80">{step.label}</p>
              {step.completed && <span className="text-xs text-emerald-400">✓ Done</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Content */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span>✨</span> Recommended for You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map((content, index) => (
            <div
              key={index}
              className="glass-card p-5 hover-glow group cursor-pointer"
            >
              <div className="text-5xl mb-3">{content.thumbnail}</div>
              <h3 className="font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                {content.title}
              </h3>
              <p className="text-white/60 text-sm mb-3">{content.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-xs">{content.duration}</span>
                <button className="btn-primary py-2 px-4 text-sm">
                  Start
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🏆</span>
            <div>
              <p className="text-white/60 text-sm">Points Earned</p>
              <p className="text-2xl font-bold">1,250</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📚</span>
            <div>
              <p className="text-white/60 text-sm">Courses Completed</p>
              <p className="text-2xl font-bold">8</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🔥</span>
            <div>
              <p className="text-white/60 text-sm">Day Streak</p>
              <p className="text-2xl font-bold">15</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
