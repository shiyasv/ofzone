
import { useAuth } from "@/context/AuthContext";
import { Offer, formatDate } from "@/utils/offerData";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface OfferCardProps {
  offer: Offer;
  onDelete: (id: string) => void;
}

const OfferCard = ({ offer, onDelete }: OfferCardProps) => {
  const { isAuthenticated } = useAuth();
  const isExpired = new Date(offer.validUntil) < new Date();

  return (
    <Card className={`${isExpired ? 'opacity-70' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{offer.title}</CardTitle>
          {isAuthenticated && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={() => onDelete(offer.id)}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-1 mt-1">
          <span className="offer-badge offer-badge-discount">
            {offer.discountPercentage}% OFF
          </span>
          {offer.isFeatured && (
            <span className="offer-badge offer-badge-featured">
              Featured
            </span>
          )}
          {offer.isLimited && (
            <span className="offer-badge offer-badge-limited">
              Limited Time
            </span>
          )}
          {isExpired && (
            <span className="offer-badge bg-gray-100 text-gray-800">
              Expired
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">{offer.description}</p>
        <div className="bg-muted p-2 rounded-md flex justify-between items-center">
          <code className="text-sm font-mono">{offer.code}</code>
          <Button variant="ghost" size="sm" className="h-7 text-xs" 
                  onClick={() => {
                    navigator.clipboard.writeText(offer.code);
                  }}>
            Copy
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between text-xs text-muted-foreground pt-2">
        <span>Category: {offer.category}</span>
        <span>Valid until: {formatDate(offer.validUntil)}</span>
      </CardFooter>
    </Card>
  );
};

export default OfferCard;
