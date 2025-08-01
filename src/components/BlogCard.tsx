import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";

interface BlogCardProps {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
}

export const BlogCard = ({ title, excerpt, image, category, date, readTime, author }: BlogCardProps) => {
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
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
            {category}
          </Badge>
        </div>
        
        <h3 className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground line-clamp-3 leading-relaxed">
          {excerpt}
        </p>
      </CardContent>
      
      <CardFooter className="flex items-center justify-between text-sm text-muted-foreground pt-0">
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
        
        <div className="flex items-center space-x-1">
          <Clock className="h-4 w-4" />
          <span>{readTime}</span>
        </div>
      </CardFooter>
    </Card>
  );
};