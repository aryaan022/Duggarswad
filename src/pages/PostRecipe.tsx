import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "@/components/ImageUpload";
import { Upload, Camera, FileText, Heart, Clock, Users, ChefHat, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const PostRecipe = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    submittedBy: "",
    prepTime: "",
    cookTime: "",
    servings: "",
    ingredients: "",
    instructions: "",
    story: "",
    tips: "",
    email: "",
    phone: "",
    termsAccepted: false,
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImagesChange = (images: File[]) => {
    setUploadedImages(images);
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.ingredients || !formData.instructions) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields (marked with *)",
        variant: "destructive",
      });
      return;
    }

    if (!formData.termsAccepted) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      let imageUrl = null;

      // Upload image if provided
      if (uploadedImages.length > 0) {
        const file = uploadedImages[0];
        const fileName = `${Date.now()}-${file.name}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('recipe-images')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        // Get public URL for the uploaded image
        const { data: { publicUrl } } = supabase.storage
          .from('recipe-images')
          .getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      // Parse ingredients and instructions into arrays
      const ingredientsArray = formData.ingredients
        .split('\n')
        .map(item => item.trim())
        .filter(item => item.length > 0);
      
      const instructionsArray = formData.instructions
        .split('\n')
        .map(item => item.trim())
        .filter(item => item.length > 0);

      // Parse time and servings to numbers
      const prepTimeNumber = parseInt(formData.prepTime.replace(/\D/g, '')) || 0;
      const cookTimeNumber = parseInt(formData.cookTime.replace(/\D/g, '')) || 0;
      const servingsNumber = parseInt(formData.servings.replace(/\D/g, '')) || 0;

      const recipeData = {
        title: formData.title,
        description: formData.story || null,
        ingredients: ingredientsArray,
        instructions: instructionsArray,
        prep_time: prepTimeNumber,
        cook_time: cookTimeNumber,
        servings: servingsNumber,
        submitted_by: formData.submittedBy || "Anonymous",
        image_url: imageUrl,
      };

      const { error } = await supabase
        .from("recipes")
        .insert([recipeData]);

      if (error) throw error;

      toast({
        title: "Recipe Submitted Successfully! 🎉",
        description: "Your recipe has been delivered to our team. We will review and approve it soon. Thank you for sharing your culinary heritage!",
      });

      // Reset form
      setFormData({
        title: "",
        category: "",
        submittedBy: "",
        prepTime: "",
        cookTime: "",
        servings: "",
        ingredients: "",
        instructions: "",
        story: "",
        tips: "",
        email: "",
        phone: "",
        termsAccepted: false,
      });
      setUploadedImages([]);

    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your recipe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Share Your Traditional Recipe
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Help preserve our culinary heritage by sharing your family's authentic recipes
          </p>
        </section>

        {/* Recipe Submission Guidelines */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Recipe Submission Guidelines
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-primary">Authentic Recipes</h3>
              <p className="text-sm text-muted-foreground">
                Share traditional recipes that have been passed down through generations
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-primary">Include Photos</h3>
              <p className="text-sm text-muted-foreground">
                Add high-quality images of your dish to make it more appealing
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-primary">Detailed Instructions</h3>
              <p className="text-sm text-muted-foreground">
                Provide clear, step-by-step cooking instructions
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-primary">Share the Story</h3>
              <p className="text-sm text-muted-foreground">
                Include the cultural significance or family story behind the recipe
              </p>
            </Card>
          </div>
        </section>

        {/* Recipe Form */}
        <section className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Recipe Details</CardTitle>
              <p className="text-center text-muted-foreground">All fields marked with * are required</p>
            </CardHeader>
            
            <CardContent className="space-y-8">
              {/* Basic Information */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Basic Information</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="recipeTitle" className="text-sm font-medium">
                      Recipe Title *
                    </Label>
                    <Input 
                      id="recipeTitle" 
                      placeholder="e.g., Traditional Rajma of Bhaderwah" 
                      className="mt-1"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Choose a descriptive title that reflects the dish's origin
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="category" className="text-sm font-medium">
                      Category *
                    </Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main-course">Main Course</SelectItem>
                        <SelectItem value="appetizer">Appetizer</SelectItem>
                        <SelectItem value="dessert">Dessert</SelectItem>
                        <SelectItem value="beverages">Beverages</SelectItem>
                        <SelectItem value="snacks">Snacks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-4 gap-4 mt-6">
                  <div>
                    <Label htmlFor="yourName" className="text-sm font-medium">
                      Your Name
                    </Label>
                    <Input 
                      id="yourName" 
                      placeholder="Your name (optional)" 
                      className="mt-1"
                      value={formData.submittedBy}
                      onChange={(e) => handleInputChange("submittedBy", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      This will be displayed as the recipe contributor
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="prepTime" className="text-sm font-medium">
                      Preparation Time
                    </Label>
                    <Input 
                      id="prepTime" 
                      placeholder="e.g., 30 minutes" 
                      className="mt-1"
                      value={formData.prepTime}
                      onChange={(e) => handleInputChange("prepTime", e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cookTime" className="text-sm font-medium">
                      Cooking Time
                    </Label>
                    <Input 
                      id="cookTime" 
                      placeholder="e.g., 45 minutes" 
                      className="mt-1"
                      value={formData.cookTime}
                      onChange={(e) => handleInputChange("cookTime", e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="servings" className="text-sm font-medium">
                      Servings
                    </Label>
                    <Input 
                      id="servings" 
                      placeholder="e.g., 4-6 people" 
                      className="mt-1"
                      value={formData.servings}
                      onChange={(e) => handleInputChange("servings", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Recipe Images */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Recipe Images</h3>
                <Label className="text-sm font-medium block mb-2">Upload Images</Label>
                
                <ImageUpload 
                  onImagesChange={handleImagesChange}
                  maxImages={5}
                />
              </div>

              {/* Ingredients */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Ingredients</h3>
                <div>
                  <Label htmlFor="ingredients" className="text-sm font-medium">
                    Ingredients List *
                  </Label>
                  <Textarea 
                    id="ingredients"
                    placeholder="List all ingredients with quantities, one per line:&#10;• 2 cups Basmati rice&#10;• 1 kg mutton, cut into pieces&#10;• 2 large onions, sliced&#10;• 1 tbsp ginger-garlic paste&#10;• ..."
                    className="mt-1 min-h-[120px]"
                    value={formData.ingredients}
                    onChange={(e) => handleInputChange("ingredients", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    List each ingredient on a new line with quantities
                  </p>
                  <p className="text-xs text-muted-foreground">0/2000 characters</p>
                </div>
              </div>

              {/* Cooking Instructions */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Cooking Instructions</h3>
                <div>
                  <Label htmlFor="instructions" className="text-sm font-medium">
                    Step-by-step Instructions *
                  </Label>
                  <Textarea 
                    id="instructions"
                    placeholder="Provide detailed cooking instructions:&#10;&#10;1. Wash and soak the rice for 30 minutes&#10;2. Heat oil in a heavy-bottomed pot&#10;3. Add whole spices and let them splutter&#10;4. Add sliced onions and cook until golden brown&#10;5. ..."
                    className="mt-1 min-h-[150px]"
                    value={formData.instructions}
                    onChange={(e) => handleInputChange("instructions", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Number each step clearly for easy following
                  </p>
                  <p className="text-xs text-muted-foreground">0/5000 characters</p>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Additional Information</h3>
                
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="story" className="text-sm font-medium">
                      Recipe Story & Cultural Significance
                    </Label>
                    <Textarea 
                      id="story"
                      placeholder="Share the story behind this recipe:&#10;- Where did you learn it?&#10;- What makes it special?&#10;- When is it traditionally prepared?&#10;- Any family memories associated with it?"
                      className="mt-1 min-h-[120px]"
                      value={formData.story}
                      onChange={(e) => handleInputChange("story", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      This helps preserve the cultural context of the recipe
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="tips" className="text-sm font-medium">
                      Chef's Tips & Variations
                    </Label>
                    <Textarea 
                      id="tips"
                      placeholder="Share any special tips, tricks, or variations:&#10;- Secret ingredients that make it special&#10;- Common mistakes to avoid&#10;- Regional variations&#10;- Storage instructions&#10;- ..."
                      className="mt-1 min-h-[100px]"
                      value={formData.tips}
                      onChange={(e) => handleInputChange("tips", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Contact Information (Optional)
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <Input 
                      id="email" 
                      type="email"
                      placeholder="your.email@example.com" 
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      We'll use this to contact you about your recipe
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </Label>
                    <Input 
                      id="phone" 
                      type="tel"
                      placeholder="+91 9876543210" 
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Terms and Submit */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => handleInputChange("termsAccepted", !!checked)}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the terms and conditions and confirm that this recipe is authentic and I have the right to share it.
                  </Label>
                </div>
                
                <div className="flex justify-center space-x-4">
                  <Button variant="outline" className="px-8">
                    Preview Recipe
                  </Button>
                  <Button 
                    className="px-8 bg-primary hover:bg-primary/90" 
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit for Review"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PostRecipe;