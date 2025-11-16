import React from "react";

const handleLogout = async () => {
  try {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.reload(); // or redirect to login page
  } catch (err) {
    alert("Logout failed. Please try again.");
  }
};

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: "home", icon: "🏠", label: "Home" },
    { id: "upload", icon: "📤", label: "Upload" },
    { id: "quizzes", icon: "📝", label: "Quizzes" },
    { id: "analytics", icon: "📊", label: "Analytics" },
  ];

  return (
    <aside className="w-64 glass-panel h-screen fixed left-0 top-0 p-6 flex flex-col">
      {/* Logo */}
      <div className="mb-8">
        <h2 className="text-2xl font-display font-bold text-iridescent">
          AuraLearn
        </h2>
        <p className="text-white/50 text-xs mt-1">Teacher Portal</p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === item.id
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "text-white/70 hover:bg-dark-card/60 hover:text-white"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="pt-4 border-t border-white/10">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-dark-card/60 hover:text-white transition-all duration-300">
          <span className="text-xl">⚙️</span>
          <span>Settings</span>
        </button>

        <button
          onClick={handleLogout} // add your logout function here
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-dark-card/60 hover:text-white transition-all duration-300"
        >
          <span className="text-xl">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
