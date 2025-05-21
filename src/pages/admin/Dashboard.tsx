import React from 'react';
import { mockCategories, mockOffers, mockAds } from '../../data/mockData';
import { 
  BarChart, 
  Percent, 
  Tag, 
  Users, 
  Image as ImageIcon, 
  TrendingUp,
  Eye
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  // Calculate stats
  const totalOffers = mockOffers.length;
  const activeOffers = mockOffers.filter(offer => !offer.isExpired).length;
  const totalCategories = mockCategories.length;
  const totalAds = mockAds.length;
  const activeAds = mockAds.filter(ad => ad.active).length;
  
  // Top categories by offer count
  const categoryCounts = mockCategories.map(category => {
    const offerCount = mockOffers.filter(offer => offer.categoryId === category.id).length;
    return {
      id: category.id,
      name: category.name,
      count: offerCount
    };
  }).sort((a, b) => b.count - a.count);
  
  return (
    <div>
      {/* Stats overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Offers */}
        <div className="card p-6">
          <div className="flex items-start">
            <div className="p-2 rounded-full bg-primary-100 text-primary-600">
              <Percent size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Offers</p>
              <h3 className="text-2xl font-bold text-gray-900">{totalOffers}</h3>
              <p className="text-xs text-gray-500 mt-1">
                <span className="text-green-500 font-medium">{activeOffers} active</span> offers
              </p>
            </div>
          </div>
        </div>
        
        {/* Categories */}
        <div className="card p-6">
          <div className="flex items-start">
            <div className="p-2 rounded-full bg-accent-100 text-accent-600">
              <Tag size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Categories</p>
              <h3 className="text-2xl font-bold text-gray-900">{totalCategories}</h3>
              <p className="text-xs text-gray-500 mt-1">
                Across <span className="font-medium">{totalCategories}</span> different groups
              </p>
            </div>
          </div>
        </div>
        
        {/* Advertisements */}
        <div className="card p-6">
          <div className="flex items-start">
            <div className="p-2 rounded-full bg-success-100 text-success-600">
              <ImageIcon size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Advertisements</p>
              <h3 className="text-2xl font-bold text-gray-900">{totalAds}</h3>
              <p className="text-xs text-gray-500 mt-1">
                <span className="text-green-500 font-medium">{activeAds} active</span> ads
              </p>
            </div>
          </div>
        </div>
        
        {/* Views (mock data) */}
        <div className="card p-6">
          <div className="flex items-start">
            <div className="p-2 rounded-full bg-warning-100 text-warning-600">
              <Eye size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Page Views</p>
              <h3 className="text-2xl font-bold text-gray-900">2,458</h3>
              <p className="text-xs text-gray-500 mt-1">
                <span className="text-green-500 font-medium">↑ 12%</span> vs last week
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Popular offers chart - 2/3 width */}
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Popular Offers</h3>
            <select className="text-sm border border-gray-300 rounded-md py-1 px-3">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          
          {/* Chart placeholder */}
          <div className="bg-gray-50 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <BarChart size={48} className="mx-auto text-gray-400 mb-2" />
              <p className="text-gray-500">Analytics chart will appear here</p>
            </div>
          </div>
          
          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-3 bg-gray-50 rounded-md">
              <p className="text-2xl font-bold text-primary-600">234</p>
              <p className="text-xs text-gray-500">Offer Views</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-md">
              <p className="text-2xl font-bold text-accent-600">142</p>
              <p className="text-xs text-gray-500">Code Copies</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-md">
              <p className="text-2xl font-bold text-success-600">68</p>
              <p className="text-xs text-gray-500">Click-throughs</p>
            </div>
          </div>
        </div>
        
        {/* Category stats - 1/3 width */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Top Categories</h3>
            <button className="text-primary-600 hover:text-primary-700 text-sm">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {categoryCounts.slice(0, 5).map((category) => (
              <div key={category.id} className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-3">
                  <Tag size={16} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900">{category.name}</span>
                    <span className="text-sm text-gray-600">{category.count} offers</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary-600 rounded-full" 
                      style={{ width: `${(category.count / totalOffers) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Recent activity */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Recent Activity</h3>
          <button className="text-primary-600 hover:text-primary-700 text-sm">
            View All
          </button>
        </div>
        
        <div className="card">
          <div className="divide-y">
            <div className="p-4 flex items-start">
              <div className="p-2 rounded-full bg-green-100 text-green-600 mr-3">
                <Percent size={16} />
              </div>
              <div>
                <p className="font-medium text-gray-900">New offer added</p>
                <p className="text-sm text-gray-500">
                  "50% Off Movie Tickets" was added to Entertainment category
                </p>
                <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
              </div>
            </div>
            
            <div className="p-4 flex items-start">
              <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                <Tag size={16} />
              </div>
              <div>
                <p className="font-medium text-gray-900">Category updated</p>
                <p className="text-sm text-gray-500">
                  Electronics category description was updated
                </p>
                <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
              </div>
            </div>
            
            <div className="p-4 flex items-start">
              <div className="p-2 rounded-full bg-purple-100 text-purple-600 mr-3">
                <ImageIcon size={16} />
              </div>
              <div>
                <p className="font-medium text-gray-900">Advertisement activated</p>
                <p className="text-sm text-gray-500">
                  "Summer Sale" advertisement was activated
                </p>
                <p className="text-xs text-gray-400 mt-1">Yesterday at 3:45 PM</p>
              </div>
            </div>
            
            <div className="p-4 flex items-start">
              <div className="p-2 rounded-full bg-red-100 text-red-600 mr-3">
                <Percent size={16} />
              </div>
              <div>
                <p className="font-medium text-gray-900">Offer expired</p>
                <p className="text-sm text-gray-500">
                  "30% Off Winter Collection" offer has expired
                </p>
                <p className="text-xs text-gray-400 mt-1">Yesterday at 10:30 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;