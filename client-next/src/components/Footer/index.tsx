"use client";

export default function Footer() {
  return (
    <footer className="relative z-10 w-full bg-gray-800 text-gray-300 pt-20 pb-10 mt-[-30px]">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        {/* Esquerda */}
        <div className="flex items-center gap-3 mb-6 md:mb-0">
          <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-semibold">
            JN
          </div>
          <span className="text-lg font-medium">Jalves Nicacio</span>
        </div>

        {/* Centro - Menu */}
        <nav className="flex gap-6 text-sm">
          <a href="#home" className="hover:text-white transition">
            Home
          </a>
          <a href="#about" className="hover:text-white transition">
            About
          </a>
          {/* <a href="#services" className="hover:text-white transition">
            Services
          </a>
          <a href="#process" className="hover:text-white transition">
            Process
          </a> */}
          <a href="#portfolio" className="hover:text-white transition">
            Portfolio
          </a>
          {/* <a href="#blog" className="hover:text-white transition">
            Blog
          </a> */}
          <a href="#contact" className="hover:text-white transition">
            Contact
          </a>
        </nav>

        {/* Direita */}
        <div className="text-sm text-gray-400 mt-6 md:mt-0">
          Copyright © 2025 Jalves Nicacio
        </div>
      </div>
    </footer>
  );
}
