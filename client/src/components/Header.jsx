// components/Header.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/img/jalvesnicacio_logo2.png";
import hero from "../assets/img/header_hero.png";

function Header({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      console.log("scrollY:", window.scrollY);
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scoll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div className="flex flex-col">
      <header
        className={`flex h-14 itens-center justify-between px-6 fixed top-0 left-0 w-full shadow z-10 trasition-colors duration-300 ${
          scrolled ? "bg-white text-[#2B2B2A]" : "bg-[#2B2B2A] text-white"
        }`}
      >
        <h1 className="text-2x1 font-bold text-gray-800 pt-2">
          <img src={logo} alt="Jalves Nicacio" className="h-10" />
        </h1>
        <nav className="flex items-center scape-x-6">
          <Link
            to="/"
            className="text-white montserrat-bold hover:underline mx-2"
          >
            Home
          </Link>
          <Link
            to="/admin"
            className="text-white montserrat-bold hover:underline mx-2"
          >
            Admin
          </Link>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-white montserrat-bold hover:underline"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-white montserrat-bold hover:underline"
            >
              Login
            </Link>
          )}
        </nav>
      </header>

      <div className="z-5 w-full flex bg-white mt-14 bg-cover bg-center">
        <div className="hero-text flex flex-col w-4/5 justify-center items-center mr-10">
          <div className="flex flex-col items-start">
            <span className="reddit-sans-condensed-bold text-[30px]">
              Hi, I am
            </span>
            <span className="reddit-sans-condensed-bold text-[70px]">
              Jalves Nicacio
            </span>
            <span className="hero-description trebuchet-bold text-[20px]">
              Full stack developer / WCAG specialist
            </span>
          </div>
        </div>

        <div className="w-1/5 text-white">
          <img src={hero} alt="Jalves Nicacio" className="w-180 h-auto" />
        </div>
      </div>
    </div>
  );
}

export default Header;
