
import { useAuth } from "@/context/AuthContext";
import { Offer, formatDate } from "@/utils/offerData";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
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
      {/* Badge display on top-left */}
      <div className="relative">
        {offer.isLimited && (
          <span className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 text-xs font-bold rounded-full">
            {offer.discountPercentage}%
          </span>
        )}
        {offer.isFeatured && (
          <span className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 text-xs font-bold rounded-full">
            Popular
          </span>
        )}
        <div className="h-3 bg-blue-600"></div>
      </div>
      
      <div className="p-5 flex-grow">
        <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
        <p className="text-gray-600 mb-4">{offer.description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span className="font-medium">{offer.category}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span>Expires: {formatDate(offer.validUntil)}</span>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-md mb-4 flex justify-between items-center">
          <code className="font-mono font-medium">{offer.code}</code>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleCopyCode}
            className="text-blue-600 hover:text-blue-800"
          >
            {copied ? "Copied!" : "Copy"}
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
          className="bg-blue-600 hover:bg-blue-700 text-white w-full"
        >
          View Deal
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
