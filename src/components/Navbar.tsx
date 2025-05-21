
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface NavbarProps {
  isAuthenticated: boolean;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

const Navbar = ({ isAuthenticated, onLoginClick, onLogoutClick }: NavbarProps) => {
  return (
    <header className="border-b">
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-blue-500 w-8 h-8 flex items-center justify-center bg-blue-100 rounded">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-5 h-5"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                <path d="M15 5c.5 0 1.5 1 2 2" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-blue-600">Offzone</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="font-medium hover:text-blue-600">Home</Link>
            <Link to="/all-deals" className="font-medium hover:text-blue-600">All Deals</Link>
            <Link to="/categories" className="font-medium hover:text-blue-600">Categories</Link>
            <Link to="/popular" className="font-medium hover:text-blue-600">Popular</Link>
            {isAuthenticated && (
              <Link to="/admin" className="font-medium text-blue-600 hover:text-blue-700">Admin Panel</Link>
            )}
          </nav>
          
          <div className="flex items-center gap-4">
            <div className="relative w-64 hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                type="search" 
                placeholder="Search offers..." 
                className="pl-10 w-full"
              />
            </div>
            
            {isAuthenticated ? (
              <Button variant="outline" onClick={onLogoutClick}>
                Logout
              </Button>
            ) : (
              <Button onClick={onLoginClick} className="bg-blue-500 hover:bg-blue-600">
                Sign in
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
