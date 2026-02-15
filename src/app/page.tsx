import Hero from "@/components/home/Hero";
import ServicesPreview from "@/components/home/ServicesPreview";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import LatestPosts from "@/components/home/LatestPosts";
import TechStack from "@/components/home/TechStack";
import CTABanner from "@/components/layout/CTABanner";

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesPreview />
      <div className="section-alt">
        <FeaturedProjects />
      </div>
      <LatestPosts />
      <div className="section-alt">
        <TechStack />
      </div>
      <CTABanner />
    </main>
  );
}