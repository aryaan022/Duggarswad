import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock, Users, Share2, Printer, X } from "lucide-react";

interface RecipeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: {
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
  };
}

export const RecipeDetailModal = ({ isOpen, onClose, recipe }: RecipeDetailModalProps) => {

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: recipe.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handlePrint = () => {
    const printContent = document.getElementById('recipe-content');
    if (printContent) {
      const printWindow = window.open('', '', 'width=800,height=600');
      printWindow?.document.write(`
        <html>
          <head>
            <title>${recipe.title}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h1 { color: #333; margin-bottom: 10px; }
              h3 { color: #666; margin-top: 20px; margin-bottom: 10px; }
              .meta { color: #888; font-size: 14px; margin-bottom: 20px; }
              .ingredient { margin-bottom: 5px; }
              .instruction { margin-bottom: 10px; display: flex; align-items: start; }
              .instruction-number { 
                background: #333; 
                color: white; 
                border-radius: 50%; 
                width: 24px; 
                height: 24px; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                font-size: 12px; 
                margin-right: 10px; 
                flex-shrink: 0;
                margin-top: 2px;
              }
              .tips { background: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 20px; }
              img { max-width: 100%; height: auto; margin-bottom: 20px; }
            </style>
          </head>
          <body>
            ${printContent.innerHTML}
          </body>
        </html>
      `);
      printWindow?.document.close();
      printWindow?.print();
      printWindow?.close();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{recipe.title}</DialogTitle>
        </DialogHeader>
        
        <div id="recipe-content" className="space-y-6">
          <h1>{recipe.title}</h1>
          <div className="meta">
            By {recipe.author} • {recipe.date} • {recipe.category}
          </div>
          
          {/* Recipe Image */}
          <div className="aspect-video overflow-hidden rounded-lg">
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Recipe Meta */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{recipe.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{recipe.date}</span>
              </div>
            </div>
            <Badge variant="secondary">{recipe.category}</Badge>
          </div>

          {/* Ingredients */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Ingredients</h3>
            <ul>
              {(recipe.ingredients || []).map((ingredient, index) => (
                <li key={index} className="ingredient">• {ingredient}</li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-destructive flex items-center">
              <span className="mr-2">🍴</span>
              Instructions
            </h3>
            <div>
              {(recipe.instructions || []).map((instruction, index) => (
                <div key={index} className="instruction">
                  <div className="instruction-number">
                    {index + 1}
                  </div>
                  <p>{instruction}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Chef's Tips */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-destructive flex items-center">
              <span className="mr-2">💡</span>
              Chef's Tips
            </h3>
            <div className="tips">
              <p>💡 {recipe.tips || "The dish tastes even better the next day! Always use authentic ingredients for best flavor."}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 pt-4 border-t">
            <Button onClick={handleShare} className="bg-destructive hover:bg-destructive/90 text-white">
              <Share2 className="h-4 w-4 mr-2" />
              Share Recipe
            </Button>
            <Button onClick={handlePrint} variant="outline" className="border-destructive text-destructive hover:bg-destructive hover:text-white">
              <Printer className="h-4 w-4 mr-2" />
              Print Recipe
            </Button>
          </div>

          {/* Recipe Attribution */}
          <div className="text-center text-sm text-muted-foreground pt-4 border-t">
            Recipe shared by <span className="font-medium">{recipe.author}</span> • Contact: priya@example.com
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};