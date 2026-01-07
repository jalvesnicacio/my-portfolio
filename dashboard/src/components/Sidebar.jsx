import { NavLink, useNavigate } from "react-router-dom";
import { Home, FolderKanban, Plus, LogOut } from "lucide-react";

export default function Sidebar({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();

  const linkClass =
    "flex items-center gap-3 px-5 py-3 rounded-lg text-sm font-medium transition-colors";
  const activeClass = "bg-gray-200 text-gray-900 font-semibold";
  const baseClass = "text-gray-300 hover:bg-gray-700 hover:text-white";

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#2B2B2A] text-white shadow-lg flex flex-col py-8">
      {/* Logo / Title */}
      <div className="px-6 mb-10">
        <h1 className="text-xl font-bold tracking-wide">My Portfolio</h1>
        <p className="text-sm text-gray-400 mt-1">Admin Panel</p>
      </div>

      {/* NAVIGATION */}
      <nav className="flex flex-col gap-2 px-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : baseClass}`
          }
        >
          <Home size={18} />
          Home
        </NavLink>

        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : baseClass}`
          }
        >
          <FolderKanban size={18} />
          Projects
        </NavLink>

        <NavLink
          to="/projects/new"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : baseClass}`
          }
        >
          <Plus size={18} />
          Add New Project
        </NavLink>
      </nav>

      {/* LOGOUT */}
      {isAuthenticated && (
        <div className="mt-auto px-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-5 py-3 w-full rounded-lg bg-red-600 hover:bg-red-700 font-medium text-sm"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </aside>
  );
}
