import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  Heart 
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-white">OffZone</span>
            </Link>
            <p className="mt-3 text-gray-400 text-sm">
              Discover the best offers and discounts from your favorite brands all in one place.
            </p>
            <div className="mt-5 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/offers" className="text-gray-400 hover:text-white transition-colors text-sm">
                  All Offers
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/1" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/category/2" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Fashion
                </Link>
              </li>
              <li>
                <Link to="/category/3" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Home & Kitchen
                </Link>
              </li>
              <li>
                <Link to="/category/4" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Beauty & Health
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-gray-400 mr-2 mt-0.5" />
                <span className="text-gray-400 text-sm">123 Main Street, City, Country</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-gray-400 mr-2" />
                <span className="text-gray-400 text-sm">+1 234 567 890</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-gray-400 mr-2" />
                <span className="text-gray-400 text-sm">info@offzone.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} OffZone. All rights reserved.</p>
          <p className="mt-2 flex items-center justify-center">
            Made with <Heart size={14} className="mx-1 text-red-500" /> by OffZone Team
          </p>
          <div className="mt-4 space-x-4">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;