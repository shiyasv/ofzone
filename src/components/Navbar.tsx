
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
          <Link to="/" className="text-2xl font-bold text-blue-600">
            DealSpot
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="font-medium hover:text-blue-600">Home</Link>
            <Link to="/all-deals" className="font-medium hover:text-blue-600">All Deals</Link>
            <Link to="/categories" className="font-medium hover:text-blue-600">Categories</Link>
            <Link to="/popular" className="font-medium hover:text-blue-600">Popular</Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <div className="relative w-64 hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                type="search" 
                placeholder="Search deals..." 
                className="pl-10 w-full"
              />
            </div>
            
            {isAuthenticated ? (
              <Button variant="outline" onClick={onLogoutClick}>
                Logout
              </Button>
            ) : (
              <Button onClick={onLoginClick}>
                Admin
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
