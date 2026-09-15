import HeroSection from "@/features/public/components/hero-section";
import AboutPage from "@/features/public/components/Aboutmdssc";
import { BannerCarousel } from "@/features/public/components/BannerCarousel";
import { ProgrammesSection } from "@/features/public/components/ProgrammesSection";
import { NewsEventsSection } from "@/features/public/components/NewsEventsSection";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <AboutPage />
      <BannerCarousel />
      <ProgrammesSection />
      <NewsEventsSection />
    </div>
  );
}
