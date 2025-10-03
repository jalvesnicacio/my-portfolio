import Image from "next/image";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";

export default function Home() {
  return (
    <main>
      <HeroSection />

      <AboutSection />

      <PortfolioSection />
    </main>
  );
}
