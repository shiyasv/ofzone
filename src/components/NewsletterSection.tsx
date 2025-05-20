
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Mail } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (email && email.includes("@")) {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      setEmail("");
    } else {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="bg-blue-600 text-white py-16">
      <div className="container mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-white/20 rounded-full p-4">
            <Mail className="h-10 w-10" />
          </div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Get Exclusive Deals Straight To Your Inbox
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Be the first to know about the hottest deals, exclusive offers, and limited-time discounts.
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-2">
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow h-12 text-black"
            required
          />
          <Button 
            type="submit" 
            className="h-12 px-6 bg-orange-500 hover:bg-orange-600 text-white font-medium"
          >
            Subscribe Now
          </Button>
        </form>
        
        <p className="text-sm mt-4 opacity-90">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};

export default NewsletterSection;
