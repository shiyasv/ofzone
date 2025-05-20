
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { getOffers, deleteOffer, Offer } from "@/utils/offerData";
import AuthModal from "@/components/AuthModal";
import OfferCard from "@/components/OfferCard";
import CreateOfferForm from "@/components/CreateOfferForm";

const OffersAndDiscounts = () => {
  const { isAuthenticated, logout } = useAuth();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    setOffers(getOffers());
  }, []);

  const handleDeleteOffer = (id: string) => {
    if (deleteOffer(id)) {
      setOffers(getOffers());
      toast({
        title: "Success",
        description: "Offer has been deleted successfully",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to delete offer",
        variant: "destructive",
      });
    }
  };

  const handleOfferAdded = () => {
    setOffers(getOffers());
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Offers & Discounts</h1>
        <div>
          {isAuthenticated ? (
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Button onClick={() => setIsLoginModalOpen(true)}>
              Admin Login
            </Button>
          )}
        </div>
      </div>

      {isAuthenticated && (
        <div className="mb-8">
          <CreateOfferForm onOfferAdded={handleOfferAdded} />
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.length > 0 ? (
          offers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              onDelete={handleDeleteOffer}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <h3 className="text-xl font-medium text-muted-foreground">
              No offers available
            </h3>
            {isAuthenticated && (
              <p className="mt-2">Create your first offer to get started!</p>
            )}
          </div>
        )}
      </div>

      <AuthModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </div>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <OffersAndDiscounts />
    </AuthProvider>
  );
};

export default Index;
