import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="px-10">
      <HeroSection />

      <AboutSection />

      <PortfolioSection />

      <ContactSection />

      <Footer />
    </main>
  );
}
