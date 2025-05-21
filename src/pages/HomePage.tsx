import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Percent, Calendar } from 'lucide-react';
import { mockCategories, mockOffers, mockAds } from '../data/mockData';
import FeaturedOfferCard from '../components/offers/FeaturedOfferCard';
import OfferCard from '../components/offers/OfferCard';
import CategoryCard from '../components/categories/CategoryCard';

const HomePage: React.FC = () => {
  // Get featured and non-featured offers
  const featuredOffers = mockOffers.filter(offer => offer.featured && !offer.isExpired).slice(0, 3);
  const recentOffers = mockOffers.filter(offer => !offer.isExpired).slice(0, 8);
  
  // Get top advertisement
  const topAd = mockAds.find(ad => ad.position === 'home_top' && ad.active);
  const middleAd = mockAds.find(ad => ad.position === 'home_middle' && ad.active);

  return (
    <div className="animate-fade-in">
      {/* Hero section */}
      <section className="relative">
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="md:w-2/3">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Discover the Best Deals and Discounts
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-primary-100">
                Find amazing offers from your favorite brands all in one place.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/offers" 
                  className="btn bg-white text-primary-700 hover:bg-primary-50"
                >
                  Browse All Offers
                </Link>
                <Link 
                  to="/categories" 
                  className="btn bg-primary-700 text-white border border-primary-400 hover:bg-primary-600"
                >
                  Explore Categories
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave SVG separator */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
          <svg 
            className="w-full h-auto" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
          >
            <path 
              fill="#FFFFFF" 
              fillOpacity="1" 
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
            />
          </svg>
        </div>
      </section>
      
      {/* Top advertisement if active */}
      {topAd && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link to={topAd.targetUrl}>
            <div className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src={topAd.imageUrl} 
                alt={topAd.title} 
                className="w-full h-48 md:h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <p className="text-sm uppercase tracking-wider mb-1">Sponsored</p>
                  <h3 className="text-xl md:text-2xl font-bold">{topAd.title}</h3>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}
      
      {/* Featured offers section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Offers</h2>
          <Link 
            to="/offers" 
            className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            View all <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredOffers.map((offer) => (
            <FeaturedOfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </section>
      
      {/* Categories section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Browse Categories</h2>
            <Link 
              to="/categories" 
              className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              All categories <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {mockCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Middle advertisement if active */}
      {middleAd && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link to={middleAd.targetUrl}>
            <div className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src={middleAd.imageUrl} 
                alt={middleAd.title} 
                className="w-full h-48 md:h-72 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <p className="text-sm uppercase tracking-wider mb-1">Advertisement</p>
                  <h3 className="text-xl md:text-2xl font-bold">{middleAd.title}</h3>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}
      
      {/* Recent offers section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Recent Offers</h2>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 flex items-center">
              <Calendar size={16} className="mr-1" />
              <span className="text-sm">Updated daily</span>
            </span>
            <Link 
              to="/offers" 
              className="flex items-center text-primary-600 hover:text-primary-700 font-medium ml-4"
            >
              View all <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recentOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </section>
      
      {/* CTA section */}
      <section className="bg-accent-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Percent size={48} className="mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Never Miss a Deal</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Sign up for our newsletter to receive the latest offers and discounts directly in your inbox.
          </p>
          <div className="max-w-md mx-auto">
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button
                type="submit"
                className="bg-white text-accent-600 hover:bg-accent-50 px-6 py-2 rounded-md font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs mt-2 text-accent-100">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;