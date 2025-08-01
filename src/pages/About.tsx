import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* About Duggarswad Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About Duggarswad
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Preserving the culinary heritage of Jammu & Kashmir
          </p>
        </section>

        {/* Our Story Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                Duggarswad was born from a deep love for the traditional 
                cuisine of Jammu and Kashmir. As we watched our 
                grandmothers' recipes slowly fade from memory and our 
                traditional cooking methods give way to modern 
                convenience, we realized the urgent need to preserve these 
                culinary treasures.
              </p>
              
              <p>
                The name "Duggarswad" combines "Duggar" (referring to the 
                Dogra people and region) with "swad" (meaning taste or 
                flavor in Hindi). It represents our mission to capture and share 
                the authentic taste of our homeland.
              </p>
              
              <p>
                Every recipe shared here carries with it the warmth of family 
                kitchens, the joy of festival preparations, and the love that 
                goes into feeding our families. We believe that food is not just 
                sustenance – it's culture, memory, and identity.
              </p>
            </div>
          </div>
          
          <div className="aspect-video overflow-hidden rounded-lg shadow-card">
            <img 
              src="/lovable-uploads/1d126f80-2712-4ab6-845c-3074252d0128.png"
              alt="Traditional drink representing Jammu & Kashmir culture"
              className="w-full h-full object-contain"
            />
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
            <div className="w-16 h-1 bg-destructive mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-destructive rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">P</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Preserve Heritage</h3>
              <p className="text-muted-foreground text-sm">
                Safeguard our culinary traditions by documenting authentic recipes and cooking techniques that have been passed down through generations.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-destructive rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">B</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Build Community</h3>
              <p className="text-muted-foreground text-sm">
                Create a platform where food lovers can connect, share stories, and learn from each other while celebrating our rich culinary heritage.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-destructive rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">S</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Share Knowledge</h3>
              <p className="text-muted-foreground text-sm">
                Make traditional recipes accessible to everyone, ensuring that future generations can experience and enjoy our authentic flavors and cooking methods.
              </p>
            </div>
          </div>
        </section>

        {/* What We Stand For Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">What We Stand For</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="border border-destructive/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-destructive mb-3">Authenticity</h3>
              <p className="text-sm text-muted-foreground">
                We ensure every recipe maintains its traditional roots and authentic preparation methods, preserving the true essence of our culinary heritage.
              </p>
            </div>
            
            <div className="border border-destructive/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-destructive mb-3">Community</h3>
              <p className="text-sm text-muted-foreground">
                Building bridges between generations and cultures through shared food experiences and storytelling traditions.
              </p>
            </div>
            
            <div className="border border-destructive/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-destructive mb-3">Accessibility</h3>
              <p className="text-sm text-muted-foreground">
                Making traditional recipes easy to understand and follow, with clear instructions accessible to cooks of all skill levels.
              </p>
            </div>
            
            <div className="border border-destructive/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-destructive mb-3">Quality</h3>
              <p className="text-sm text-muted-foreground">
                Maintaining high standards in recipe documentation, ingredient guidance, and cultural context to preserve authenticity.
              </p>
            </div>
          </div>
        </section>

        {/* Join Our Mission Section */}
        <section className="bg-gradient-to-r from-destructive to-destructive/80 text-white py-16 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Help us preserve the rich culinary heritage of Jammu & Kashmir by sharing your family recipes
          </p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => navigate('/post-recipe')}
              className="bg-white text-destructive px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Share Your Recipe
            </button>
            <button 
              onClick={() => navigate('/')}
              className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              Start Cooking
            </button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;