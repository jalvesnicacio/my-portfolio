import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProjectShowcase from "./components/ProjectShowcase";
import ProjectDetails from "./components/ProjectDetails";
import AdminPanel from "./components/AdminPanel";
import Login from "./pages/Login";
import { useState } from "react";
import Header from "./components/Header";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("token");
  });

  return (
    <Router>
      <Header
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <main className="px-0 bg-gray-50 pb-6">
        <Routes>
          <Route path="/" element={<ProjectShowcase />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route
            path="/admin"
            element={
              isAuthenticated ? (
                <AdminPanel />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/Login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
