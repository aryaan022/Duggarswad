import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Here you would typically send the email to your backend
      // For now, we'll just show a success message
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast.success("Thank you for subscribing! You'll receive our latest recipes and stories.");
      setEmail("");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400">
      <div className="container text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Stay Updated with Traditional Recipes
        </h2>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Get the latest traditional recipes and stories delivered to your inbox
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-white border-0 text-gray-900 placeholder:text-gray-500"
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-white text-primary hover:bg-gray-100 font-semibold px-8"
          >
            {isLoading ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </div>
    </section>
  );
};