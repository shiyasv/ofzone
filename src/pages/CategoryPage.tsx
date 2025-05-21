import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronRight, Filter, SortAsc, SortDesc } from 'lucide-react';
import { mockCategories, mockOffers, Category, Offer } from '../data/mockData';
import OfferCard from '../components/offers/OfferCard';

const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [sortOrder, setSortOrder] = useState<'newest' | 'discount'>('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  useEffect(() => {
    // Find the category
    const foundCategory = mockCategories.find(cat => cat.id === id);
    if (foundCategory) {
      setCategory(foundCategory);
      
      // Get offers for this category
      const categoryOffers = mockOffers.filter(offer => offer.categoryId === id && !offer.isExpired);
      setOffers(categoryOffers);
    }
  }, [id]);
  
  const handleSort = (order: 'newest' | 'discount') => {
    setSortOrder(order);
    
    if (order === 'newest') {
      // Sort by validity date (newest first)
      setOffers([...offers].sort((a, b) => 
        new Date(b.validUntil).getTime() - new Date(a.validUntil).getTime()
      ));
    } else {
      // Sort by discount percentage (highest first)
      setOffers([...offers].sort((a, b) => b.discount - a.discount));
    }
  };
  
  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Category not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Category header */}
      <section 
        className="relative bg-cover bg-center h-64 md:h-80"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.image})` 
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-sm md:text-base mb-2">
              <span>Home</span>
              <ChevronRight className="inline mx-2 h-4 w-4" />
              <span>Categories</span>
              <ChevronRight className="inline mx-2 h-4 w-4" />
              <span>{category.name}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{category.name}</h1>
            <p className="text-lg max-w-2xl">{category.description}</p>
          </div>
        </div>
      </section>
      
      {/* Filter and sort section */}
      <section className="bg-white border-b sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">
                Showing <span className="font-medium text-gray-900">{offers.length}</span> offers
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                <Filter size={16} className="mr-1" />
                Filters
              </button>
              
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleSort('newest')}
                  className={`flex items-center text-sm font-medium p-1 rounded ${
                    sortOrder === 'newest' 
                      ? 'text-primary-600 bg-primary-50' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <SortDesc size={16} className="mr-1" />
                  Newest
                </button>
                <button 
                  onClick={() => handleSort('discount')}
                  className={`flex items-center text-sm font-medium p-1 rounded ${
                    sortOrder === 'discount' 
                      ? 'text-primary-600 bg-primary-50' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <SortAsc size={16} className="mr-1" />
                  Highest Discount
                </button>
              </div>
            </div>
          </div>
          
          {/* Filter options */}
          {isFilterOpen && (
            <div className="mt-4 p-4 border rounded-md bg-gray-50 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Store
                  </label>
                  <select className="input">
                    <option value="">All Stores</option>
                    <option value="Apple Store">Apple Store</option>
                    <option value="Amazon">Amazon</option>
                    <option value="Samsung">Samsung</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount
                  </label>
                  <select className="input">
                    <option value="">Any Discount</option>
                    <option value="10">10% or more</option>
                    <option value="25">25% or more</option>
                    <option value="50">50% or more</option>
                    <option value="75">75% or more</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Validity
                  </label>
                  <select className="input">
                    <option value="">Any Time</option>
                    <option value="week">Expires this week</option>
                    <option value="month">Expires this month</option>
                    <option value="future">Future offers</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <button className="btn btn-secondary mr-2">
                  Reset
                </button>
                <button className="btn btn-primary">
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Offers grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {offers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {offers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No offers found</h3>
            <p className="text-gray-600">
              There are currently no active offers in this category.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default CategoryPage;