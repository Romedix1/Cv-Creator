import FeaturesSection from "@/app/[locale]/(main)/_components/FeaturesSection";
import HeroSection from "@/app/[locale]/(main)/_components/HeroSection";
import TemplatesSection from "@/app/[locale]/(main)/_components/TemplatesSection";
import StepsSection from "./_components/StepsSection";

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
