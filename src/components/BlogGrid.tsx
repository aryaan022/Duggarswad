import { useState, useEffect } from "react";
import { RecipeCard } from "./RecipeCard";
import { RecipeDetailModal } from "./RecipeDetailModal";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import rajmaImage from "@/assets/rajma-bhaderwah.jpg";
import curryImage from "@/assets/dogra-curry.jpg";
import riceImage from "@/assets/jammu-rice.jpg";

const recipes = [
  {
    id: 1,
    title: "Traditional Rajma of Bhaderwah",
    excerpt: "Pressure cook the soaked rajma with salt and turmeric until soft and tender. Heat mustard oil in a heavy-bottomed pan and...",
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
    excerpt: "A traditional mixed vegetable curry from the Dogra region, slow-cooked with aromatic spices and served with steamed rice...",
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
    excerpt: "Traditional basmati rice preparation from Jammu, cooked with whole spices and ghee, passed down through generations...",
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

interface Recipe {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  author: string;
  ingredients?: string[];
  instructions?: string[];
  tips?: string;
}

export const RecipeGrid = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dbRecipes, setDbRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApprovedRecipes();
  }, []);

  const fetchApprovedRecipes = async () => {
    try {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("status", "approved")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const formattedRecipes: Recipe[] = (data || []).map((recipe, index) => ({
        id: 1000 + index, // Use a different ID range to avoid conflicts
        title: recipe.title,
        excerpt: recipe.description ? recipe.description.substring(0, 150) + "..." : recipe.title,
        image: recipe.image_url || rajmaImage, // Use uploaded image or fallback to default
        category: "Traditional",
        date: new Date(recipe.submitted_at).toLocaleDateString(),
        author: recipe.submitted_by || "Anonymous",
        ingredients: recipe.ingredients || [],
        instructions: recipe.instructions || [],
        tips: recipe.description || "A delicious traditional recipe shared by our community."
      }));

      setDbRecipes(formattedRecipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Combine static recipes with database recipes
  const allRecipes = [...recipes, ...dbRecipes];

  const handleReadMore = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };
  return (
    <section className="py-20 bg-secondary/30 recipe-section">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Traditional Recipes & Stories
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover authentic flavours passed down through generations
          </p>
        </div>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search recipes..."
              className="pl-10"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="main">Main Course</SelectItem>
              <SelectItem value="vegetarian">Vegetarian</SelectItem>
              <SelectItem value="side">Side Dish</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full text-center">Loading recipes...</div>
          ) : (
            allRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} {...recipe} onReadMore={handleReadMore} />
            ))
          )}
        </div>

        {selectedRecipe && (
          <RecipeDetailModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            recipe={selectedRecipe}
          />
        )}
      </div>
    </section>
  );
};