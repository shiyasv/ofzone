
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="bg-blue-600 text-white py-16">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Discover Amazing Deals & Save Big Today
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
          Your one-stop destination for the best deals, discounts, and offers across
          various categories. Never miss a chance to save!
        </p>
        
        <div className="max-w-2xl mx-auto flex">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Search for deals, brands, or categories..."
              className="w-full h-12 pl-12 rounded-l-full rounded-r-none text-black"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
          <Button className="h-12 px-8 rounded-r-full font-medium bg-blue-700 hover:bg-blue-800">
            Find Deals
          </Button>
        </div>
        
        <div className="mt-6 text-blue-100 flex flex-wrap justify-center gap-2">
          <span className="font-medium">Popular Searches:</span>
          <span className="px-2">Electronics</span>
          <span className="px-2">•</span>
          <span className="px-2">Fashion</span>
          <span className="px-2">•</span>
          <span className="px-2">Travel</span>
          <span className="px-2">•</span>
          <span className="px-2">Food</span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
