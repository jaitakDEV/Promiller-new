import { AboutusSection } from "@/features/public/components/AboutusSection";
import HeroSection from "@/features/public/components/HeroSection";

import WorldMapDemo from "@/features/public/components/world-map-demo";
import LandingMarquee, {
  type Logo,
} from "@/features/public/components/LandingMarquee";
import ContactSection from "@/features/public/components/ContactSection";
import WhyPromiller from "@/features/public/components/WhyPromiller";
import LandingIntroSection from "@/features/public/components/LandingIntroSection";
import HowItWorks from "@/features/public/components/how-it-works/HowItWorks";
import ProcessSteps from "@/features/public/components/process-steps/ProcessSteps";
import WhenAndWhom from "@/features/public/components/WhenAndWhom";

const logos: Logo[] = [
  // Set 1
  { name: "Client A", src: "/logos/dovly.webp" },
  { name: "Client B", src: "/logos/netflix.webp" },
  { name: "Client C", src: "/logos/portola.webp" },
  { name: "Client D", src: "/logos/spotify.webp" },
  { name: "Client E", src: "/logos/twitch.webp" },
  // Set 2 (2 sec baad yeh aayenge)
  { name: "Client F", src: "/logos/twitch.webp" },
  { name: "Client G", src: "/logos/spotify.webp" },
  { name: "Client H", src: "/logos/portola.webp" },
  { name: "Client I", src: "/logos/netflix.webp" },
  { name: "Client J", src: "/logos/dovly.webp" },
];

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <AboutusSection />
      <LandingIntroSection />
      <WhyPromiller />
      <WhenAndWhom />
      <ProcessSteps />
      <HowItWorks />
      <WorldMapDemo />
      <LandingMarquee logos={logos} heading="Trusted by the best" />{" "}
      <ContactSection />
    </div>
  );
}
