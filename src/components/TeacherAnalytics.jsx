import React from 'react';

const TeacherAnalytics = () => {
  const atRiskStudents = [
    { name: 'Alex Johnson', score: 45, risk: 'high', trend: 'down' },
    { name: 'Maria Garcia', score: 58, risk: 'medium', trend: 'down' },
    { name: 'James Wilson', score: 52, risk: 'medium', trend: 'stable' },
    { name: 'Sarah Lee', score: 38, risk: 'high', trend: 'down' },
    { name: 'Michael Brown', score: 62, risk: 'low', trend: 'up' },
    { name: 'Emma Davis', score: 55, risk: 'medium', trend: 'stable' },
  ];

  const insights = [
    { icon: '⚠️', label: '3 Students At Risk', value: 'High Priority', color: 'from-red-500 to-pink-500' },
    { icon: '🔍', label: 'Learning Gaps Detected', value: '2 Topics', color: 'from-yellow-500 to-orange-500' },
    { icon: '📈', label: 'Average Score Improved', value: '+12%', color: 'from-primary to-accent' },
  ];

  const getRiskBadge = (risk) => {
    switch (risk) {
      case 'high':
        return <span className="badge-red">High Risk</span>;
      case 'medium':
        return <span className="badge-yellow">Medium Risk</span>;
      case 'low':
        return <span className="badge-green">Low Risk</span>;
      default:
        return null;
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return '📈';
      case 'down':
        return '📉';
      case 'stable':
        return '➡️';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-display font-bold mb-2">
            Analytics Dashboard 📊
          </h1>
          <p className="text-white/70">
            AI-powered insights into student performance and learning gaps
          </p>
        </div>
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight, index) => (
          <div key={index} className="glass-card p-6 hover-glow">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${insight.color} flex items-center justify-center text-2xl mb-4`}>
              {insight.icon}
            </div>
            <p className="text-white/60 text-sm mb-1">{insight.label}</p>
            <p className="text-2xl font-bold text-white">{insight.value}</p>
          </div>
        ))}
      </div>

      {/* Performance Chart Placeholder */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span>📈</span> Performance Trend
        </h2>
        <div className="h-64 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
          <div className="text-center">
            <div className="text-5xl mb-2 opacity-30">📊</div>
            <p className="text-white/50 text-sm">
              Chart visualization (integrate Recharts or Chart.js)
            </p>
            <div className="mt-4 flex gap-2 justify-center">
              {[60, 75, 65, 80, 70, 85, 78].map((height, i) => (
                <div
                  key={i}
                  className="w-8 bg-gradient-to-t from-primary to-accent rounded-t-lg transition-all duration-300 hover:opacity-80"
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* At-Risk Students Table */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span>👥</span> At-Risk Students
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-white/70 font-semibold text-sm">
                  Student Name
                </th>
                <th className="text-left py-3 px-4 text-white/70 font-semibold text-sm">
                  Recent Score
                </th>
                <th className="text-left py-3 px-4 text-white/70 font-semibold text-sm">
                  Trend
                </th>
                <th className="text-left py-3 px-4 text-white/70 font-semibold text-sm">
                  Risk Level
                </th>
                <th className="text-left py-3 px-4 text-white/70 font-semibold text-sm">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {atRiskStudents.map((student, index) => (
                <tr
                  key={index}
                  className="border-b border-white/5 hover:bg-white/5 transition-all duration-300"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white text-sm font-bold">
                        {student.name.charAt(0)}
                      </div>
                      <span className="text-white/90">{student.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-white/80 font-medium">{student.score}%</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-2xl">{getTrendIcon(student.trend)}</span>
                  </td>
                  <td className="py-4 px-4">{getRiskBadge(student.risk)}</td>
                  <td className="py-4 px-4">
                    <button className="btn-secondary py-2 px-4 text-sm">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommended Actions */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span>💡</span> Recommended Actions
        </h2>
        <div className="space-y-3">
          {[
            { action: 'Schedule one-on-one session with Alex Johnson', priority: 'high' },
            { action: 'Assign remedial content for Algebra basics', priority: 'medium' },
            { action: 'Create practice quiz for struggling students', priority: 'medium' },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg bg-dark-card/40 hover:bg-dark-card/60 transition-all duration-300"
            >
              <p className="text-white/80">{item.action}</p>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  item.priority === 'high'
                    ? 'bg-red-500/20 text-red-300'
                    : 'bg-yellow-500/20 text-yellow-300'
                }`}
              >
                {item.priority.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherAnalytics;
