import Hero from "@/components/home/Hero";
import ServicesPreview from "@/components/home/ServicesPreview";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import LatestPosts from "@/components/home/LatestPosts";
import TechStack from "@/components/home/TechStack";
import CTABanner from "@/components/layout/CTABanner";
import { WebSiteSchema } from "@/components/shared/JsonLd";

export default function Home() {
  return (
    <main>
      <WebSiteSchema />
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