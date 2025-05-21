import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, 
  ExternalLink, 
  Clock, 
  Copy, 
  Check,
  Store,
  Share2,
  ChevronRight
} from 'lucide-react';
import { mockOffers, mockCategories, Offer, Category } from '../data/mockData';
import OfferCard from '../components/offers/OfferCard';

const OfferPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [offer, setOffer] = useState<Offer | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [relatedOffers, setRelatedOffers] = useState<Offer[]>([]);
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    // Find the offer
    const foundOffer = mockOffers.find(o => o.id === id);
    if (foundOffer) {
      setOffer(foundOffer);
      
      // Find category
      const foundCategory = mockCategories.find(cat => cat.id === foundOffer.categoryId);
      setCategory(foundCategory || null);
      
      // Get related offers from same category
      const related = mockOffers
        .filter(o => o.categoryId === foundOffer.categoryId && o.id !== id && !o.isExpired)
        .slice(0, 4);
      setRelatedOffers(related);
    }
  }, [id]);
  
  const copyCode = () => {
    if (!offer?.code) return;
    navigator.clipboard.writeText(offer.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Calculate days remaining
  const getDaysRemaining = (dateString: string) => {
    const validUntil = new Date(dateString);
    const today = new Date();
    const diffTime = validUntil.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  if (!offer) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Offer not found</h2>
        </div>
      </div>
    );
  }

  const daysRemaining = getDaysRemaining(offer.validUntil);

  return (
    <div className="animate-fade-in">
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-primary-600">Home</Link>
            <ChevronRight size={14} className="mx-2" />
            {category && (
              <>
                <Link to={`/category/${category.id}`} className="hover:text-primary-600">
                  {category.name}
                </Link>
                <ChevronRight size={14} className="mx-2" />
              </>
            )}
            <span className="text-gray-900 font-medium truncate">{offer.title}</span>
          </div>
        </div>
      </div>
      
      {/* Offer details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Offer image */}
          <div className="md:col-span-1">
            <div className="rounded-lg overflow-hidden shadow-md relative">
              <img 
                src={offer.image} 
                alt={offer.title} 
                className="w-full h-auto object-cover aspect-[4/3]"
              />
              <div className="absolute top-0 right-0 bg-accent-500 text-white px-3 py-1">
                <span className="font-bold">{offer.discount}% OFF</span>
              </div>
            </div>
            
            {/* Store info */}
            <div className="mt-6 bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <div className="flex items-center mb-4">
                <Store className="h-5 w-5 text-gray-700 mr-2" />
                <h3 className="font-medium">About {offer.store}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {offer.store} is a leading retailer providing high-quality products and services to customers worldwide.
              </p>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
              >
                Visit store <ExternalLink size={14} className="ml-1" />
              </a>
            </div>
          </div>
          
          {/* Offer details */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {offer.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6">
                <div className="flex items-center text-gray-700">
                  <Store size={16} className="mr-1" />
                  <span>{offer.store}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Calendar size={16} className="mr-1" />
                  <span>Valid until {formatDate(offer.validUntil)}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Clock size={16} className="mr-1" />
                  <span>{daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Expires today'}</span>
                </div>
              </div>
              
              {/* Discount details */}
              {(offer.originalPrice && offer.currentPrice) ? (
                <div className="mb-6">
                  <div className="flex items-baseline mb-1">
                    <span className="text-3xl font-bold text-gray-900">${offer.currentPrice.toFixed(2)}</span>
                    <span className="ml-2 text-xl line-through text-gray-500">${offer.originalPrice.toFixed(2)}</span>
                    <span className="ml-2 bg-accent-100 text-accent-800 text-sm font-medium px-2 py-0.5 rounded">
                      Save ${(offer.originalPrice - offer.currentPrice).toFixed(2)}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="mb-6">
                  <span className="inline-block bg-accent-500 text-white text-lg font-bold px-3 py-1 rounded">
                    {offer.discount}% OFF
                  </span>
                </div>
              )}
              
              {/* Description */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-gray-700">
                  {offer.description}
                </p>
                <p className="mt-4 text-gray-700">
                  Don't miss this amazing opportunity to save on your purchase. This exclusive offer is available for a limited time only, so act fast before it expires!
                </p>
              </div>
              
              {/* Promo code section */}
              {offer.code && (
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-3">Use this promo code</h2>
                  <div className="flex items-stretch border-2 border-primary-300 rounded-md overflow-hidden">
                    <div className="flex-1 bg-primary-50 px-4 py-3 font-mono text-lg font-medium flex items-center justify-center">
                      {offer.code}
                    </div>
                    <button 
                      onClick={copyCode}
                      className={`bg-primary-600 text-white px-4 py-3 font-medium flex items-center hover:bg-primary-700 transition-colors`}
                    >
                      {copied ? (
                        <>
                          <Check size={18} className="mr-1" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={18} className="mr-1" />
                          Copy Code
                        </>
                      )}
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    Copy this code and paste it at checkout to receive your discount.
                  </p>
                </div>
              )}
              
              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary py-3 flex-1 flex justify-center items-center text-center"
                >
                  <ExternalLink size={18} className="mr-2" />
                  Go to {offer.store}
                </a>
                <button className="btn btn-secondary py-3 flex justify-center items-center">
                  <Share2 size={18} className="mr-2" />
                  Share Offer
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related offers */}
      {relatedOffers.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Similar Offers</h2>
            {category && (
              <Link 
                to={`/category/${category.id}`} 
                className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
              >
                View all <ChevronRight size={16} className="ml-1" />
              </Link>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedOffers.map((relatedOffer) => (
              <OfferCard key={relatedOffer.id} offer={relatedOffer} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default OfferPage;