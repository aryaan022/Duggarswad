import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Share, Printer, User, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import rajmaImage from "@/assets/rajma-bhaderwah.jpg";
import curryImage from "@/assets/dogra-curry.jpg";
import riceImage from "@/assets/jammu-rice.jpg";

const recipes = [
  {
    id: 1,
    title: "Traditional Rajma of Bhaderwah",
    image: rajmaImage,
    category: "Main Course",
    date: "Jan 15, 2024",
    author: "Priya Sharma",
    ingredients: [
      "2 cups rajma (kidney beans), soaked overnight",
      "3 tbsp mustard oil",
      "2 large onions, finely chopped",
      "2 tbsp ginger-garlic paste",
      "3 tomatoes, pureed",
      "1 tsp cumin seeds",
      "2 tsp red chili powder",
      "1 tsp turmeric powder",
      "1 tsp garam masala",
      "Salt to taste",
      "Fresh coriander for garnish"
    ],
    instructions: [
      "Pressure cook the soaked rajma with salt and turmeric until soft and tender.",
      "Heat mustard oil in a heavy-bottomed pan and add chopped onions.",
      "Cook until golden brown; then add ginger-garlic paste.",
      "Add tomato puree and cook until oil separates.",
      "Add all the spices and cook for 2-3 minutes.",
      "Add the cooked rajma along with its water.",
      "Simmer for 20-25 minutes until the gravy thickens.",
      "Garnish with fresh coriander and serve hot with rice."
    ],
    tips: "The dish tastes even better the next day! Always use mustard oil for authentic flavor."
  },
  {
    id: 2,
    title: "Authentic Dogra Vegetable Curry",
    image: curryImage,
    category: "Vegetarian",
    date: "Jan 10, 2024",
    author: "Ravi Kumar",
    ingredients: [
      "2 cups mixed vegetables (potato, cauliflower, peas)",
      "2 tbsp mustard oil",
      "1 tsp cumin seeds",
      "2 onions, sliced",
      "2 tbsp yogurt",
      "1 tsp turmeric powder",
      "2 tsp coriander powder",
      "1 tsp red chili powder",
      "1 tsp garam masala",
      "Salt to taste",
      "Fresh mint leaves"
    ],
    instructions: [
      "Heat mustard oil and add cumin seeds.",
      "Add sliced onions and cook until golden.",
      "Add mixed vegetables and stir well.",
      "Mix yogurt with all spices and add to vegetables.",
      "Cover and cook on low heat for 15-20 minutes.",
      "Stir occasionally to prevent sticking.",
      "Garnish with fresh mint and serve hot.",
      "Best enjoyed with steamed rice or roti."
    ],
    tips: "Use fresh seasonal vegetables for the best taste. Don't overcook to maintain texture."
  },
  {
    id: 3,
    title: "Heritage Jammu Rice Preparation",
    image: riceImage,
    category: "Side Dish",
    date: "Jan 5, 2024",
    author: "Meera Devi",
    ingredients: [
      "2 cups basmati rice",
      "3 tbsp pure ghee",
      "4-5 green cardamom pods",
      "2 bay leaves",
      "1 cinnamon stick",
      "3-4 cloves",
      "1 tsp cumin seeds",
      "Salt to taste",
      "4 cups water",
      "Fresh herbs for garnish"
    ],
    instructions: [
      "Wash and soak basmati rice for 30 minutes.",
      "Heat ghee in a heavy-bottomed pot.",
      "Add whole spices and let them splutter.",
      "Add cumin seeds and let them turn golden.",
      "Add drained rice and gently mix.",
      "Add hot water and salt to taste.",
      "Bring to boil, then reduce heat and cover.",
      "Cook for 18-20 minutes until fluffy and aromatic."
    ],
    tips: "Use aged basmati rice for best results. The ratio of rice to water should be 1:2."
  }
];

export const RecipeDetail = () => {
  const { id } = useParams();
  const recipe = recipes.find(r => r.id === parseInt(id || '0'));

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Recipe Not Found</h1>
          <Link to="/">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.title,
          text: `Check out this traditional recipe: ${recipe.title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Recipes
            </Button>
          </Link>
        </div>

        {/* Recipe Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{recipe.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{recipe.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{recipe.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              <span>{recipe.category}</span>
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <Button onClick={handleShare} variant="outline" className="gap-2">
              <Share className="h-4 w-4" />
              Share Recipe
            </Button>
            <Button onClick={handlePrint} variant="outline" className="gap-2">
              <Printer className="h-4 w-4" />
              Print Recipe
            </Button>
          </div>
        </div>

        {/* Recipe Image */}
        <div className="mb-8">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ingredients */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-2">•</span>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Instructions</h2>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-4">
                  <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">
                    {index + 1}
                  </span>
                  <span className="leading-relaxed">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Chef's Tips */}
        {recipe.tips && (
          <div className="mt-8 p-6 bg-primary/5 rounded-lg border-l-4 border-primary">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <span>💡</span> Chef's Tips
            </h3>
            <p className="text-muted-foreground">{recipe.tips}</p>
          </div>
        )}

        {/* Recipe Attribution */}
        <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
          <p>Recipe shared by {recipe.author} on {recipe.date}</p>
          <p className="text-sm mt-2">
            Part of the Duggarswad traditional recipe collection
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};