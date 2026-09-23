
import { AboutPromillerSection } from "@/features/public/components/AboutPromillerSection";
import CloudShaderHeroDemo from "@/features/public/components/cloud-shader-hero-demo";

import WorldMapDemo from "@/features/public/components/world-map-demo";
import HeroScrollDemo from "@/features/public/components/container-scroll-animation-demo";
import SingleRowLogoCloud, {
  type Logo,
} from "@/features/public/components/single-row-logo-cloud";
import ContactSection from "@/features/public/components/contact-section";
import { Differences } from "@/features/public/components/Differences";
import ScrollableLaptop from "@/features/public/components/ScrollableLaptop";
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
      <CloudShaderHeroDemo />
      <AboutPromillerSection />
      <ScrollableLaptop />
      <SingleRowLogoCloud logos={logos} heading="Trusted by the best" />{" "}
      <Differences />
      <HeroScrollDemo />
      <WorldMapDemo />
      <ContactSection />
    </div>
  );
}
