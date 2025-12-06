import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import logo from "../assets/img/logo2.png";

export default function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setIsAuthenticated(true);
      navigate("/");
    } catch (err) {
      alert("Invalid login credentials");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      {/* LOGO + título */}
      <div className="text-center mb-6 flex flex-col items-center">
        {logo && (
          <img
            src={logo}
            alt="Logo"
            className="w-40 h-40 mb-3 object-contain"
          />
        )}
      </div>

      {/* LOGIN CARD */}
      <div className="w-full max-w-sm bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Login</h1>
          <p className="text-gray-500 text-sm mt-1">
            Administrative panel access
          </p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2.5 border border-gray-300 rounded-lg 
                focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Senha */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              type="password"
              className="w-full p-2.5 border border-gray-300 rounded-lg 
                focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold 
              hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>

        {/* Rodapé opcional */}
        <p className="text-center text-gray-400 text-xs mt-6">
          © {new Date().getFullYear()} Jalves Nicacio — Admin
        </p>
      </div>
    </div>
  );
}
