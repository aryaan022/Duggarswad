import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { StatsSection } from "@/components/StatsSection";
import { RecipeGrid } from "@/components/BlogGrid";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <StatsSection />
      <RecipeGrid />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default Index;
