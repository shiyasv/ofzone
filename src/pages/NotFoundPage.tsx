import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-16 bg-gray-50">
      <div className="text-center max-w-md mx-auto">
        <div className="text-primary-600 mb-4">
          <h1 className="text-9xl font-bold">404</h1>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="btn btn-primary py-2.5 flex items-center justify-center"
          >
            <Home size={18} className="mr-2" />
            Go Home
          </Link>
          <Link 
            to="/offers" 
            className="btn btn-secondary py-2.5 flex items-center justify-center"
          >
            <Search size={18} className="mr-2" />
            Browse Offers
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;