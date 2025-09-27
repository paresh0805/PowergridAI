import { useState } from "react";
import { Home, FilePlus, ShieldAlert, TrendingUp, Layers, Monitor, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/dashboard" },
    { name: "New Project", icon: <FilePlus size={20} />, path: "/new-project" },
    { name: "Risk Analysis", icon: <ShieldAlert size={20} />, path: "/risk-analysis" },
    { name: "Predictions", icon: <TrendingUp size={20} />, path: "/predictions" },
    { name: "Scenarios", icon: <Layers size={20} />, path: "/scenarios" },
    { name: "Live Monitor", icon: <Monitor size={20} />, path: "/live-monitor" },
  ];

  return (
    <div
      className={`h-screen bg-white shadow-lg flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 p-4 border-b">
        {!collapsed && (
          <>
            <img src="/assets/logo.png" alt="Logo" className="w-10 h-10" />
            <span className="font-bold text-lg text-gray-800">POWERGRID AI</span>
          </>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Menu Items */}
      <div className="flex-1 mt-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg transition-all duration-200
                ${isActive ? "bg-blue-50 border-l-4 border-blue-600 text-blue-600 font-semibold shadow-sm" : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}
              `}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!collapsed && <span className="flex-1">{item.name}</span>}
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t text-sm text-gray-500">
          v1.0.0 | POWERGRID
        </div>
      )}
    </div>
  );
}
