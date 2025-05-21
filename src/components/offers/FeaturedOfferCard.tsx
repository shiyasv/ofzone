import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ExternalLink, Copy, Check } from 'lucide-react';
import { Offer } from '../../data/mockData';

interface FeaturedOfferCardProps {
  offer: Offer;
}

const FeaturedOfferCard: React.FC<FeaturedOfferCardProps> = ({ offer }) => {
  const [copied, setCopied] = React.useState(false);

  const copyCode = () => {
    if (!offer.code) return;
    navigator.clipboard.writeText(offer.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="card h-full flex flex-col hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Image container with tag */}
      <div className="relative h-44 md:h-52 overflow-hidden">
        <img 
          src={offer.image} 
          alt={offer.title} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute top-0 right-0 bg-accent-500 text-white px-3 py-1">
          <span className="font-bold">{offer.discount}% OFF</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 flex flex-col p-4 md:p-5">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-sm text-gray-600">{offer.store}</span>
          <span className="inline-block w-1 h-1 rounded-full bg-gray-400"></span>
          <span className="text-sm flex items-center text-gray-600">
            <Calendar size={14} className="mr-1" />
            Valid until {formatDate(offer.validUntil)}
          </span>
        </div>
        
        <Link to={`/offer/${offer.id}`} className="group">
          <h3 className="text-lg md:text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
            {offer.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{offer.description}</p>
        
        {/* Price if available */}
        {offer.originalPrice && offer.currentPrice && (
          <div className="mb-4 mt-auto">
            <div className="flex items-baseline">
              <span className="text-xl font-bold text-gray-900">${offer.currentPrice.toFixed(2)}</span>
              <span className="ml-2 text-sm line-through text-gray-500">${offer.originalPrice.toFixed(2)}</span>
            </div>
          </div>
        )}
        
        {/* Code and action buttons */}
        <div className="mt-auto">
          {offer.code && (
            <div className="flex items-center mb-4 bg-gray-100 rounded-md overflow-hidden">
              <div className="flex-1 px-3 py-2 font-mono text-sm md:text-base font-medium">
                {offer.code}
              </div>
              <button 
                onClick={copyCode}
                className="bg-primary-600 text-white h-full px-3 py-2 flex items-center hover:bg-primary-700 transition-colors"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          )}
          
          <div className="flex space-x-2">
            <Link
              to={`/offer/${offer.id}`}
              className="btn btn-primary flex-1 flex justify-center items-center"
            >
              View Details
            </Link>
            <a
              href="#"
              className="btn btn-secondary flex items-center justify-center"
              aria-label="Open store in new tab"
            >
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedOfferCard;