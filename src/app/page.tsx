import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { HeroSection } from "@/components/landing/hero-section";
import { StatsSection } from "@/components/landing/stats-section";
import { FeaturedEventsSection } from "@/components/landing/featured-events-section";
import { HowItWorksPreview } from "@/components/landing/how-it-works-preview";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0d141d] text-white">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <HowItWorksPreview />
      <FeaturedEventsSection />
      <Footer />
    </main>
  );
}