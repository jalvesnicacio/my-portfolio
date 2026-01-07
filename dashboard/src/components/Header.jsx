// components/Header.jsx
import { Link, useNavigate } from "react-router-dom";

export default function Header({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#1F1F1F] text-white flex flex-col shadow-lg">
      {/* Logo / título */}
      <div className="h-16 flex items-center px-6 border-b border-gray-800">
        <h1 className="text-lg font-bold">My Portfolio</h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 flex flex-col px-4 py-6 space-y-2">
        <Link to="/" className="px-4 py-2 rounded hover:bg-gray-800 transition">
          Home
        </Link>
      </nav>

      {/* Footer - Logout */}
      <div className="px-4 py-4 border-t border-gray-800">
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 rounded bg-red-600 hover:bg-red-700 transition"
          >
            Logout
          </button>
        )}
      </div>
    </aside>
  );
}
