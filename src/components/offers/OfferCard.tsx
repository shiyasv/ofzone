import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ExternalLink } from 'lucide-react';
import { Offer } from '../../data/mockData';

interface OfferCardProps {
  offer: Offer;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
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
    <div className="card h-full flex flex-col overflow-hidden hover:shadow-md transition-all duration-300">
      {/* Image container with discount tag */}
      <div className="relative h-40 overflow-hidden">
        <img 
          src={offer.image} 
          alt={offer.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-0 right-0 bg-accent-500 text-white px-2 py-0.5 text-sm">
          <span className="font-bold">{offer.discount}% OFF</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 flex flex-col p-4">
        <div className="flex items-center text-xs text-gray-600 mb-2">
          <span>{offer.store}</span>
          <span className="mx-1">•</span>
          <span className="flex items-center">
            <Calendar size={12} className="mr-1" />
            Until {formatDate(offer.validUntil)}
          </span>
        </div>
        
        <Link to={`/offer/${offer.id}`} className="group">
          <h3 className="font-semibold group-hover:text-primary-600 transition-colors line-clamp-2 mb-2">
            {offer.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{offer.description}</p>
        
        <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">
          {offer.code ? (
            <span className="text-xs font-medium bg-primary-50 text-primary-700 px-2 py-0.5 rounded">
              CODE: {offer.code}
            </span>
          ) : (
            <span className="text-xs font-medium bg-accent-50 text-accent-700 px-2 py-0.5 rounded">
              No Code Needed
            </span>
          )}
          
          <Link 
            to={`/offer/${offer.id}`}
            className="text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium"
          >
            View <ExternalLink size={14} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;