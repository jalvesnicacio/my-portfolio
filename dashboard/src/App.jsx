import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
import Login from "./pages/Login";
import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject";
import EditProject from "./pages/EditProject";
import { useState } from "react";
import Header from "./components/Header";
import "./App.css";
import Sidebar from "./components/Sidebar";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("token");
  });

  return (
    <Router>
      {/* Só mostra o Header se o usuário estiver autenticado */}
      {/* {isAuthenticated && (
        <Header
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
      )} */}
      {isAuthenticated && (
        <Sidebar
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
      )}
      <main
        className={`${
          isAuthenticated ? "pl-64" : "pl-0"
        } px-6 bg-gray-50 min-h-screen pb-6`}
      >
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? <Projects /> : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/Login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />

          <Route
            path="/projects"
            element={isAuthenticated ? <Projects /> : <Navigate to="/login" />}
          />

          <Route
            path="/projects/new"
            element={
              isAuthenticated ? <NewProject /> : <Navigate to="/login" />
            }
          />

          <Route
            path="/projects/:id/edit"
            element={
              isAuthenticated ? <EditProject /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
