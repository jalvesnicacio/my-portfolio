"use client";
import { Button } from "../ui/button";
import Image from "next/image";
import { Download, FolderGit2 } from "lucide-react";

export default function AboutSection() {
  return (
    <section
      className="py-10 px-50 flex items-center justify-center"
      id="about"
    >
      <div className="px-10 py-10 bg-white border-[#f5f7fa] border-1 rounded-sm shadow-md flex flex-col md:flex-row items-center gap-10">
        {/* Imagem */}
        <Image
          src="/about-jalves.png"
          alt="About Me"
          width={768}
          height={868}
          className="mx-auto mb-6"
        />
        {/* Texto */}
        <div className="container px-6 text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Full Stack Web Developer & Accessibility Specialist
          </h2>
          <p className="text-lg md:text-lg mb-8 max-w-2xl">
            I design and develop digital solutions — from modern websites to web
            applications — always with a focus on clarity, usability, and
            accessibility.
          </p>
          <p className="text-lg md:text-lg mb-8 max-w-2xl">
            My passion is to create experiences that connect people and make
            technology more human.
          </p>
          <div>
            <Button asChild>
              <a href="#projects">
                <FolderGit2 />
                My Projects
              </a>
            </Button>
            <Button asChild variant="outline" className="ml-4">
              <a href="#contact">
                <Download />
                Download CV
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
