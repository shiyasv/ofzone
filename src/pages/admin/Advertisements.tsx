import React, { useState } from 'react';
import { mockAds, Advertisement } from '../../data/mockData';
import { 
  Plus, 
  Pencil, 
  Trash, 
  Eye, 
  ChevronDown,
  ToggleLeft,
  ToggleRight,
  Link as LinkIcon
} from 'lucide-react';

const AdminAdvertisements: React.FC = () => {
  const [ads, setAds] = useState<Advertisement[]>(mockAds);
  const [filterPosition, setFilterPosition] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  // Filter ads
  const filteredAds = ads.filter(ad => {
    const matchesPosition = filterPosition === 'all' || ad.position === filterPosition;
    const matchesStatus = filterStatus === 'all' || 
                          (filterStatus === 'active' && ad.active) || 
                          (filterStatus === 'inactive' && !ad.active);
    
    return matchesPosition && matchesStatus;
  });
  
  const toggleAdStatus = (id: string) => {
    setAds(ads.map(ad => 
      ad.id === id ? { ...ad, active: !ad.active } : ad
    ));
  };
  
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this advertisement?')) {
      setAds(ads.filter(ad => ad.id !== id));
    }
  };
  
  // Format position for display
  const formatPosition = (position: string) => {
    return position.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div>
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Advertisements</h1>
        <button 
          className="btn btn-primary flex items-center"
        >
          <Plus size={18} className="mr-1" />
          Add Advertisement
        </button>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm mb-6 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <select
              className="input appearance-none pr-8"
              value={filterPosition}
              onChange={(e) => setFilterPosition(e.target.value)}
            >
              <option value="all">All Positions</option>
              <option value="home_top">Home Top</option>
              <option value="home_middle">Home Middle</option>
              <option value="category_top">Category Top</option>
              <option value="sidebar">Sidebar</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          
          <div className="relative">
            <select
              className="input appearance-none pr-8"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          
          <button 
            onClick={() => {
              setFilterPosition('all');
              setFilterStatus('all');
            }}
            className="btn btn-secondary"
          >
            Clear Filters
          </button>
        </div>
      </div>
      
      {/* Ads grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAds.map((ad) => (
          <div key={ad.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={ad.imageUrl} 
                alt={ad.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
                <div className="p-4 text-white">
                  <span className="text-xs uppercase tracking-wider bg-primary-600 px-2 py-1 rounded-sm">
                    {formatPosition(ad.position)}
                  </span>
                  <h3 className="text-lg font-semibold mt-2">{ad.title}</h3>
                </div>
              </div>
              
              {/* Status indicator */}
              <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold ${
                ad.active ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}>
                {ad.active ? 'Active' : 'Inactive'}
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center text-sm text-gray-600 mb-4">
                <LinkIcon size={14} className="mr-1" />
                <a 
                  href={ad.targetUrl} 
                  className="truncate hover:text-primary-600 transition-colors"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {ad.targetUrl}
                </a>
              </div>
              
              <div className="flex justify-between items-center">
                {/* Toggle button */}
                <button 
                  onClick={() => toggleAdStatus(ad.id)}
                  className={`flex items-center text-sm font-medium ${
                    ad.active ? 'text-green-600' : 'text-gray-500'
                  }`}
                >
                  {ad.active ? (
                    <>
                      <ToggleRight size={20} className="mr-1" />
                      Active
                    </>
                  ) : (
                    <>
                      <ToggleLeft size={20} className="mr-1" />
                      Inactive
                    </>
                  )}
                </button>
                
                {/* Action buttons */}
                <div className="flex space-x-1">
                  <button 
                    className="text-gray-500 hover:text-primary-600 p-1.5 rounded-full hover:bg-gray-100"
                    aria-label="View advertisement"
                  >
                    <Eye size={16} />
                  </button>
                  <button 
                    className="text-gray-500 hover:text-primary-600 p-1.5 rounded-full hover:bg-gray-100"
                    aria-label="Edit advertisement"
                  >
                    <Pencil size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(ad.id)}
                    className="text-gray-500 hover:text-red-600 p-1.5 rounded-full hover:bg-gray-100"
                    aria-label="Delete advertisement"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {filteredAds.length === 0 && (
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-500">
              No advertisements found. Try a different filter or add a new advertisement.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAdvertisements;