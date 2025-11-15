import React from 'react';

const Topbar = ({ userName = 'Teacher' }) => {
  return (
    <header className="glass-card h-16 fixed top-0 right-0 left-64 z-10 px-6 flex items-center justify-between">
      {/* Search Bar (Optional) */}
      <div className="flex-1 max-w-md">
        <input
          type="search"
          placeholder="Search..."
          className="input-glass text-sm py-2"
        />
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-dark-card/70 transition-all duration-300">
          <span className="text-xl">🔔</span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="text-right">
            <p className="text-sm font-medium text-white">{userName}</p>
            <p className="text-xs text-white/50">Educator</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-bold">
            {userName.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
