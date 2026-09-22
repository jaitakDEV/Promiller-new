import HeroSection from "@/features/public/components/hero-section";
import AboutPage from "@/features/public/components/Aboutmdssc";
import { BannerCarousel } from "@/features/public/components/BannerCarousel";
import { ProgrammesSection } from "@/features/public/components/ProgrammesSection";
import { NewsEventsSection } from "@/features/public/components/NewsEventsSection";
import OdooSection from "@/features/public/components/OdooSection";

export default function HomePage() {
  return (
    <div>
      <CloudShaderHeroDemo />
      <AboutPromillerSection />
      <SingleRowLogoCloud logos={logos} heading="Trusted by the best" />{" "}
      <Differences />
      <WorldMapDemo />
      <HeroScrollDemo />
      <ContactSection />
    </div>
  );
}
