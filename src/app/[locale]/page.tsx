import FeaturesSection from "@/components/layout/FeatuersSection";
import HeroSection from "@/components/layout/HeroSection";
import Nav from "@/components/layout/Nav";
import StepsSection from "@/components/layout/StepsSection";
import TemplatesSection from "@/components/layout/TemplatesSection";

export default function Home() {
  return (
    <>
      <Nav />
      <HeroSection />
      <TemplatesSection />
      <FeaturesSection />
      <StepsSection />
    </>
  );
}
