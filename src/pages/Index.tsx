
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { getOffers, deleteOffer, Offer } from "@/utils/offerData";
import AuthModal from "@/components/AuthModal";
import OfferCard from "@/components/OfferCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturedDeal from "@/components/FeaturedDeal";
import CategorySection from "@/components/CategorySection";
import NewsletterSection from "@/components/NewsletterSection";
import { Instagram } from "lucide-react";
import { incrementVisitorCount } from "@/utils/visitorCounter";

const Offzone = () => {
  const { isAuthenticated, logout } = useAuth();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { toast } = useToast();
  const [instagramLink, setInstagramLink] = useState('');
  const [appLink, setAppLink] = useState('');
  const [mainHeading, setMainHeading] = useState('Trending Deals');
  
  useEffect(() => {
    setOffers(getOffers());
    setInstagramLink(localStorage.getItem('instagram_link') || '');
    setAppLink(localStorage.getItem('app_link') || '');
    
    // Get the main heading from localStorage, with fallback to 'Trending Deals'
    const savedHeading = localStorage.getItem('main_heading');
    setMainHeading(savedHeading || 'Trending Deals');
    
    // Track visitor
    incrementVisitorCount();

    // Add Google Ads script if available
    const googleAdScript = localStorage.getItem('google_ad_script');
    if (googleAdScript) {
      const scriptElement = document.createElement('script');
      scriptElement.innerHTML = googleAdScript;
      document.head.appendChild(scriptElement);
    }
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        isAuthenticated={isAuthenticated}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onLogoutClick={logout}
      />
      
      <HeroSection />
      
      <main className="flex-grow">
        <FeaturedDeal />
        
        <div className="container py-8">
          {/* Social Links */}
          {(instagramLink || appLink) && (
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-4">
                {instagramLink && (
                  <a 
                    href={instagramLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-pink-600 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Instagram className="h-5 w-5" />
                      <span className="font-medium">Follow us</span>
                    </div>
                  </a>
                )}
                
                {appLink && (
                  <a 
                    href={appLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                        <circle cx="12" cy="18" r="1" />
                      </svg>
                      <span className="font-medium">Get our app</span>
                    </div>
                  </a>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">{mainHeading}</h2>
            <div className="flex gap-2">
              <Button variant="default" className="bg-blue-600 hover:bg-blue-700">All Deals</Button>
              <Button variant="outline">Newest</Button>
              <Button variant="outline">Ending Soon</Button>
              <Button variant="outline">Most Popular</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {offers.length > 0 ? (
              offers.map((offer) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  onDelete={isAuthenticated ? handleDeleteOffer : undefined}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <h3 className="text-xl font-medium text-muted-foreground">
                  No offers available
                </h3>
                {isAuthenticated && (
                  <p className="mt-2">
                    Visit the <a href="/admin" className="text-blue-600 hover:underline">admin panel</a> to create your first offer!
                  </p>
                )}
              </div>
            )}
          </div>
          
          <CategorySection />
        </div>
      </main>
      
      <NewsletterSection />
      
      <Footer />

      <AuthModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </div>
  );
};

const Index = () => {
  return <Offzone />;
};

export default Index;
