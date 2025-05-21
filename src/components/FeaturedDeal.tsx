
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getOffers } from "@/utils/offerData";

const FeaturedDeal = () => {
  const offers = getOffers().filter(offer => offer.isFeatured).slice(0, 3);
  
  return (
    <div className="container py-8">
      <h2 className="text-2xl font-bold mb-6">Featured Offers</h2>
      
      {offers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div key={offer.id} className="bg-white rounded-lg border shadow-sm overflow-hidden">
              {/* Offer image with discount badge */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                {/* Placeholder image - in a real app, you would use real product images */}
                <img 
                  src={`https://source.unsplash.com/random/600x400/?${offer.category}`} 
                  alt={offer.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 text-sm font-bold rounded">
                  {offer.discountPercentage}% OFF
                </div>
              </div>
              
              <div className="p-4">
                {/* Store name and valid until date */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span className="font-medium">{offer.category?.toUpperCase() || 'STORE'}</span>
                  <span className="flex items-center">
                    <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    Valid until {new Date(offer.validUntil).toLocaleDateString()}
                  </span>
                </div>
                
                {/* Offer title */}
                <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                
                {/* Offer description */}
                <p className="text-gray-600 mb-4 text-sm">{offer.description}</p>
                
                {/* Price if exists */}
                {offer.title.includes("MacBook") && (
                  <div className="mb-3">
                    <span className="text-xl font-bold text-blue-600">$999.50 </span>
                    <span className="text-gray-400 line-through text-sm">$1999.00</span>
                  </div>
                )}
                
                {/* Coupon code */}
                <div className="bg-gray-50 p-2 rounded-md mb-4 flex justify-between items-center">
                  <code className="font-mono font-medium">{offer.code}</code>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  </Button>
                </div>
                
                {/* Action buttons */}
                <div className="flex gap-2">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    View Details
                  </Button>
                  <Button variant="outline" className="px-2">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default FeaturedDeal;
