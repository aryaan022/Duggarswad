import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/dogra-hero.jpg";
import rajmaImage from "@/assets/rajma-bhaderwah.jpg";
import curryImage from "@/assets/dogra-curry.jpg";
import riceImage from "@/assets/jammu-rice.jpg";

const images = [
  { src: heroImage, alt: "Traditional Dogra Cuisine" },
  { src: rajmaImage, alt: "Traditional Rajma of Bhaderwah" },
  { src: curryImage, alt: "Authentic Dogra Vegetable Curry" },
  { src: riceImage, alt: "Heritage Jammu Rice Preparation" }
];

export const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const scrollToRecipes = () => {
    const recipesSection = document.querySelector('.recipe-section');
    if (recipesSection) {
      recipesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Promotional Banner Slideshow */}
      <section className="relative h-64 md:h-80 overflow-hidden bg-gradient-to-r from-orange-400 via-red-400 to-pink-400">
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
              {/* Left Content */}
              <div className="space-y-4 text-white animate-fade-in">
                <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                  Discover Traditional
                  <br />
                  <span className="text-yellow-200">Dogra Recipes</span>
                </h2>
                <p className="text-lg md:text-xl opacity-90 max-w-lg">
                  Authentic recipes passed down through generations. Experience the rich heritage of Jammu cuisine.
                </p>
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-gray-100 font-semibold shadow-lg"
                  onClick={scrollToRecipes}
                >
                  Learn More
                </Button>
              </div>
              
              {/* Right Images */}
              <div className="relative flex justify-center items-center">
                <div className="relative w-full max-w-md">
                  <img 
                    src={images[currentImageIndex].src}
                    alt={images[currentImageIndex].alt}
                    className="w-full h-48 md:h-64 object-cover rounded-2xl shadow-2xl transition-all duration-500"
                    key={currentImageIndex}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <button
            onClick={handlePrevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            onClick={handleNextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Main Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-background">
        <div className="container py-20">
          <div className="flex flex-col items-center text-center space-y-8">
            {/* Center Content */}
            <div className="space-y-8 animate-fade-in max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Taste the Tradition
                <br />
                <span className="text-primary">of Duggar</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Welcome to Flavours of Jammu, where we bring back the lost and traditional foods of the Duggar land. Share your family recipes and discover authentic Dogra cuisine.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/post-recipe">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-hover hover-scale w-full sm:w-auto">
                    <Plus className="h-5 w-5 mr-2" />
                    Share Your Recipe
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground hover-scale"
                  onClick={scrollToRecipes}
                >
                  <ChevronDown className="h-5 w-5 mr-2" />
                  Explore Recipes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};