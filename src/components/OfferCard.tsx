
import { useAuth } from "@/context/AuthContext";
import { Offer, formatDate } from "@/utils/offerData";
import { Button } from "@/components/ui/button";
import { Trash2, ExternalLink, Copy } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface OfferCardProps {
  offer: Offer;
  onDelete?: (id: string) => void;
}

const OfferCard = ({ offer, onDelete }: OfferCardProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const isExpired = new Date(offer.validUntil) < new Date();
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(offer.code);
    setCopied(true);
    toast({
      title: "Code copied",
      description: `${offer.code} has been copied to clipboard`,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm overflow-hidden flex flex-col h-full">
      {/* Image with discount badge */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img 
          src={`https://source.unsplash.com/random/600x400/?${offer.category}`} 
          alt={offer.title}
          className="w-full h-full object-cover"
        />
        {offer.isLimited && (
          <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 text-sm font-bold rounded">
            {offer.discountPercentage}% OFF
          </div>
        )}
      </div>
      
      <div className="p-5 flex-grow">
        {/* Store name and expiry date */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span className="font-medium">{offer.category?.toUpperCase() || 'STORE'}</span>
          <span className="flex items-center">
            <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Valid until {formatDate(offer.validUntil)}
          </span>
        </div>
        
        <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
        <p className="text-gray-600 mb-4">{offer.description}</p>
        
        {/* Coupon code */}
        <div className="bg-gray-50 p-3 rounded-md mb-4 flex justify-between items-center">
          <code className="font-mono font-medium">{offer.code}</code>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleCopyCode}
            className="text-blue-600 hover:text-blue-800"
          >
            {copied ? "Copied!" : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        
        {/* Time left counter */}
        {!isExpired && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-1">Time left:</p>
            <div className="flex gap-2">
              <div className="bg-gray-100 rounded p-1 text-center w-12">
                <span className="block text-lg font-bold">56</span>
                <span className="text-xs text-gray-500">Days</span>
              </div>
              <div className="bg-gray-100 rounded p-1 text-center w-12">
                <span className="block text-lg font-bold">7</span>
                <span className="text-xs text-gray-500">Hours</span>
              </div>
              <div className="bg-gray-100 rounded p-1 text-center w-12">
                <span className="block text-lg font-bold">12</span>
                <span className="text-xs text-gray-500">Mins</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="px-5 pb-5 mt-auto flex justify-between">
        <Button 
          variant="default" 
          className="bg-blue-600 hover:bg-blue-700 text-white flex-grow flex gap-2 items-center justify-center"
        >
          View Deal
          <ExternalLink className="h-4 w-4" />
        </Button>
        
        {onDelete && (
          <Button 
            variant="ghost" 
            className="ml-2 text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={() => onDelete(offer.id)}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default OfferCard;
