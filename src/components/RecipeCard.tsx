import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";

interface RecipeCardProps {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  author: string;
  onReadMore?: (recipe: RecipeCardProps) => void;
}

export const RecipeCard = ({ id, title, excerpt, image, category, date, author, onReadMore }: RecipeCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-hover hover:-translate-y-1 shadow-card">
      <div className="aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <CardHeader className="space-y-3">
        <h3 className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{date}</span>
            </div>
          </div>
          <span className="text-primary font-medium">{category}</span>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground line-clamp-3 leading-relaxed">
          {excerpt}
        </p>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          variant="ghost" 
          className="text-primary hover:text-primary p-0 h-auto font-medium"
          onClick={() => onReadMore?.({ id, title, excerpt, image, category, date, author, onReadMore })}
        >
          Read More
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};