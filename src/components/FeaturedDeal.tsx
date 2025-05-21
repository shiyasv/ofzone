
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const FeaturedDeal = () => {
  return (
    <div className="container py-8">
      <div className="bg-gradient-to-r from-blue-500 to-blue-400 rounded-lg text-white overflow-hidden">
        <div className="p-8 md:p-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white p-2 rounded-full">
              <ShoppingBag className="h-5 w-5 text-blue-500" />
            </div>
            <span className="inline-block px-3 py-1 bg-orange-500 text-white text-sm font-medium rounded-full">
              Featured Deal
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            50% Off Premium Headphones
          </h2>
          
          <p className="mb-6 text-lg">
            High-quality noise-cancelling headphones at half price. Limited time offer!
          </p>
          
          <Separator className="bg-white/20 mb-6" />
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center bg-blue-600/30 px-3 py-2 rounded-md">
              <span className="font-medium mr-2">SoundWave</span>
            </div>
            
            <div className="flex items-center bg-blue-600/30 px-3 py-2 rounded-md">
              <span className="font-medium">Expires: Jun 30, 2025</span>
            </div>
          </div>
          
          <Button className="px-6 py-2 bg-white text-blue-600 hover:bg-gray-100 flex items-center gap-2">
            Grab This Deal
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedDeal;
