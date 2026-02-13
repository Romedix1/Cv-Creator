import FeaturesSection from "@/app/[locale]/(main)/_components/FeaturesSection";
import HeroSection from "@/app/[locale]/(main)/_components/HeroSection";
import StepsSection from "@/components/layout/StepsSection";
import TemplatesSection from "@/app/[locale]/(main)/_components/TemplatesSection";

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
