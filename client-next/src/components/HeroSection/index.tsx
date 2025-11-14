"use client";
import styles from "./style.module.css";
import { Button } from "../ui/button";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className=" py-10 px-50 flex items-start justify-center-safe">
      <div className=" px-6 text-left">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Hello, I'm <br /> Jalves Nicacio
        </h1>
        <p className="text-lg md:text-lg mb-8 max-w-2xl">
          I'm a{" "}
          <span className={styles.highlight}>Full Stack Web Developer</span>{" "}
          with
          <span className={styles.highlight}>15+ years</span> of experience,
          based in Maceió, Brazil. My specialty is front-end development and
          WCAG accessibility, striving to build immersive and beautiful web
          applications through carefully crafted code and user-centric design.
        </p>
        <p className="text-lg md:text-lg mb-8 max-w-2xl">
          I believe that programming is more than writing code: it's about
          designing real solutions for real people. I am amazed when I see an
          application work and help someone.
        </p>
        <Button asChild>
          <a href="#contact">Say Hello!</a>
        </Button>
      </div>
      <Image
        src="/hero-jalves2.png" // coloque seu logo dentro de /public/logo.png
        alt="That's me, Jalves Nicacio!"
        width={437}
        height={476}
        className="mx-auto mb-6 rounded-xl"
      />
    </section>
  );
}
