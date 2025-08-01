import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="text-primary text-2xl">🍁</div>
              <h3 className="text-xl font-bold text-primary">
                Duggarswad
              </h3>
            </div>
            <p className="text-muted-foreground">
              Preserving the traditional flavours and recipes of the Duggar land for future generations.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Post Your Recipe</a></li>
            </ul>
          </div>
          
          {/* Recipe Categories */}
          <div className="space-y-4">
            <h4 className="font-semibold">Recipe Categories</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Main Course</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Vegetarian</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Side Dishes</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Traditional Sweets</a></li>
            </ul>
          </div>
          
          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Connect With Us</h4>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" className="hover:bg-primary hover:text-primary-foreground">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="hover:bg-primary hover:text-primary-foreground">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="hover:bg-primary hover:text-primary-foreground">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="hover:bg-primary hover:text-primary-foreground">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Duggarswad. All rights reserved. Preserving heritage through food.</p>
        </div>
      </div>
    </footer>
  );
};