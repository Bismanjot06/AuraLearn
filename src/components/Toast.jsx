import React from 'react';

const Toast = ({ type = 'success', message, onClose }) => {
  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
  };

  const colors = {
    success: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30',
    error: 'from-red-500/20 to-pink-500/20 border-red-500/30',
    warning: 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30',
    info: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
  };

  return (
    <div className={`glass-card p-4 max-w-md animate-slide-up border ${colors[type]}`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icons[type]}</span>
          <p className="text-white/90">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white/80 transition-colors"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default Toast;
