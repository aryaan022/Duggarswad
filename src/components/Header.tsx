import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <img 
            src="/lovable-uploads/a247d7ef-81fd-40f1-9beb-b70ac0655036.png" 
            alt="Duggarswad Logo" 
            className="h-10 w-auto"
          />
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link to="/" className={location.pathname === "/" ? "text-primary border-b-2 border-primary pb-1" : "transition-colors hover:text-primary text-muted-foreground"}>Home</Link>
          <Link to="/about" className={location.pathname === "/about" ? "text-primary border-b-2 border-primary pb-1" : "transition-colors hover:text-primary text-muted-foreground"}>About Us</Link>
          <Link to="/contact" className={location.pathname === "/contact" ? "text-primary border-b-2 border-primary pb-1" : "transition-colors hover:text-primary text-muted-foreground"}>Contact</Link>
          <Link to="/post-recipe" className={location.pathname === "/post-recipe" ? "text-primary border-b-2 border-primary pb-1" : "transition-colors hover:text-primary text-muted-foreground"}>Post Your Recipe</Link>
        </nav>
        
        <div className="flex items-center space-x-2">
          <Link to="/admin/login">
            <Button variant="ghost" className="hidden md:flex items-center space-x-2 text-muted-foreground">
              <User className="h-4 w-4" />
              <span>Admin Access</span>
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};