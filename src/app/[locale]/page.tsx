import FeaturesSection from "@/components/layout/FeaturesSection";
import Footer from "@/components/layout/Footer";
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
      <Footer />
    </>
  );
}
