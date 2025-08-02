import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="bg-slate-700 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">🍁</div>
              <h3 className="text-xl font-bold">
                Duggarswad
              </h3>
            </div>
            <p className="text-gray-300">
              Preserving the traditional flavours of Jammu, one recipe at a time.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="bg-red-500 hover:bg-red-600 text-white">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="bg-red-500 hover:bg-red-600 text-white">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="bg-red-500 hover:bg-red-600 text-white">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="bg-red-500 hover:bg-red-600 text-white">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="/post-recipe" className="hover:text-white transition-colors">Post Recipe</a></li>
            </ul>
          </div>
          
          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Categories</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Main Course</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Appetizers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Desserts</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Beverages</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Contact Info</h4>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-red-400" />
                <span>info@duggarswad.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">📞</span>
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">📍</span>
                <span>Jammu, J&K, India</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Duggarswad. All rights reserved. Made with ❤️ for preserving Jammu's culinary heritage.</p>
        </div>
      </div>
    </footer>
  );
};