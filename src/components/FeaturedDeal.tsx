
import { Button } from "@/components/ui/button";

const FeaturedDeal = () => {
  return (
    <div className="container py-8">
      <div className="bg-slate-600/90 rounded-lg text-white overflow-hidden">
        <div className="p-8 md:p-10 max-w-[800px]">
          <span className="inline-block px-3 py-1 bg-orange-500 text-white text-sm font-medium rounded-full mb-4">
            Featured Deal
          </span>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            50% Off Premium Headphones
          </h2>
          
          <p className="mb-6 text-lg">
            High-quality noise-cancelling headphones at half price. Limited time offer!
          </p>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center bg-slate-700/50 px-3 py-2 rounded-md">
              <span className="font-medium mr-2">SoundWave</span>
            </div>
            
            <div className="flex items-center bg-slate-700/50 px-3 py-2 rounded-md">
              <span className="font-medium">Expires: Jun 30, 2025</span>
            </div>
          </div>
          
          <Button className="px-6 py-2 bg-white text-blue-700 hover:bg-gray-100 flex items-center gap-2">
            Grab This Deal
            <svg 
              className="h-4 w-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Button>
        </div>
        
        <div className="bg-blue-700 p-6 md:absolute md:right-10 md:top-1/2 md:transform md:-translate-y-1/2 md:rounded-lg md:shadow-lg">
          <div className="mb-2 text-center">Use Coupon Code:</div>
          <div className="bg-white text-blue-800 text-center py-3 px-6 rounded mb-3 font-mono text-lg font-bold">
            SOUND50
          </div>
          <Button variant="outline" className="w-full bg-blue-600 border-white hover:bg-blue-700 text-white">
            Copy Code
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedDeal;
