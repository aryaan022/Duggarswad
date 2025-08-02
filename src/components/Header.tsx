import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, User, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <img 
            src="/lovable-uploads/a247d7ef-81fd-40f1-9beb-b70ac0655036.png" 
            alt="Duggarswad Logo" 
            className="h-10 w-auto"
          />
          <h1 className="text-xl md:text-2xl font-bold text-primary">Duggarswad</h1>
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
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container py-4 space-y-3">
            <Link 
              to="/" 
              className={`block px-4 py-2 rounded-md transition-colors ${
                location.pathname === "/" ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`block px-4 py-2 rounded-md transition-colors ${
                location.pathname === "/about" ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className={`block px-4 py-2 rounded-md transition-colors ${
                location.pathname === "/contact" ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              to="/post-recipe" 
              className={`block px-4 py-2 rounded-md transition-colors ${
                location.pathname === "/post-recipe" ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Post Your Recipe
            </Link>
            <Link 
              to="/admin/login" 
              className="block px-4 py-2 rounded-md transition-colors hover:bg-muted text-muted-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Admin Access</span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};