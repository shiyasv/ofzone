import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Search, 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronDown, 
  User, 
  LogOut, 
  Settings
} from 'lucide-react';
import { mockCategories } from '../../data/mockData';

const Navbar: React.FC = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and left nav */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <ShoppingBag className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">OffZone</span>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              <Link to="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600">
                Home
              </Link>
              
              {/* Categories dropdown */}
              <div className="relative">
                <button
                  type="button"
                  className="group px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 flex items-center"
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                >
                  <span>Categories</span>
                  <ChevronDown 
                    size={16} 
                    className={`ml-1 transition-transform duration-200 ${categoriesOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                {/* Categories dropdown menu */}
                {categoriesOpen && (
                  <div 
                    className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                    onMouseLeave={() => setCategoriesOpen(false)}
                  >
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      {mockCategories.map((category) => (
                        <Link
                          key={category.id}
                          to={`/category/${category.id}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setCategoriesOpen(false)}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <Link to="/offers" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600">
                Offers
              </Link>
            </div>
          </div>
          
          {/* Right side nav */}
          <div className="flex items-center">
            {/* Search form */}
            <form onSubmit={handleSearch} className="hidden md:block relative mr-4">
              <input
                type="text"
                placeholder="Search offers..."
                className="w-64 px-4 py-1.5 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </form>
            
            {/* User menu */}
            {isAuthenticated ? (
              <div className="relative ml-3">
                <button
                  type="button"
                  className="flex items-center text-sm focus:outline-none"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
                    {user?.name.charAt(0)}
                  </div>
                  <span className="hidden md:inline ml-2 font-medium text-gray-700">{user?.name}</span>
                  <ChevronDown size={16} className="ml-1 text-gray-500" />
                </button>
                
                {/* User dropdown menu */}
                {userMenuOpen && (
                  <div 
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    onMouseLeave={() => setUserMenuOpen(false)}
                  >
                    <div className="py-1" role="menu">
                      <div className="px-4 py-2 text-xs text-gray-500 border-b">{user?.email}</div>
                      
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Settings size={16} className="mr-2" />
                          <span>Admin Dashboard</span>
                        </Link>
                      )}
                      
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User size={16} className="mr-2" />
                        <span>Your Profile</span>
                      </Link>
                      
                      <button
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleLogout}
                      >
                        <LogOut size={16} className="mr-2" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            <button
              className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setCategoriesOpen(!categoriesOpen)}
            >
              <span>Categories</span>
              <ChevronDown size={16} className={categoriesOpen ? 'rotate-180' : ''} />
            </button>
            
            {categoriesOpen && (
              <div className="pl-6 space-y-1 animate-slide-up">
                {mockCategories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.id}`}
                    className="block px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
            
            <Link
              to="/offers"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Offers
            </Link>
            
            {/* Mobile search */}
            <form onSubmit={handleSearch} className="px-3 py-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search offers..."
                  className="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;