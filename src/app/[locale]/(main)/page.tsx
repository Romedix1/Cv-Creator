import FeaturesSection from "@/components/layout/FeaturesSection";
import HeroSection from "@/components/layout/HeroSection";
import StepsSection from "@/components/layout/StepsSection";
import TemplatesSection from "@/components/layout/TemplatesSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TemplatesSection />
      <FeaturesSection />
      <StepsSection />
    </>
  );
}
