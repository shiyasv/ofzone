import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Tag, 
  Percent, 
  ImageIcon, 
  Settings, 
  LogOut, 
  Menu, 
  X
} from 'lucide-react';

const AdminLayout: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/admin/categories', label: 'Categories', icon: <Tag size={20} /> },
    { path: '/admin/offers', label: 'Offers & Discounts', icon: <Percent size={20} /> },
    { path: '/admin/ads', label: 'Advertisements', icon: <ImageIcon size={20} /> },
    { path: '/admin/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 z-50 m-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-md bg-white shadow-md text-gray-700 hover:bg-gray-50"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform z-45 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:static lg:w-64 lg:min-h-screen`}>
        <div className="h-full flex flex-col">
          {/* Sidebar header */}
          <div className="px-6 py-4 border-b">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary-600">OffZone</span>
              <span className="text-xs ml-2 bg-primary-100 text-primary-800 px-2 py-0.5 rounded">Admin</span>
            </Link>
          </div>
          
          {/* User info */}
          <div className="px-6 py-4 border-b">
            <p className="font-medium text-gray-900">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-2.5 rounded-md transition-colors ${
                      location.pathname === item.path
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Logout button */}
          <div className="px-4 py-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 w-full text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              <LogOut size={20} className="mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-x-hidden overflow-y-auto">
        {/* Admin header */}
        <header className="bg-white shadow-sm px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">
            {navItems.find(item => item.path === location.pathname)?.label || 'Admin Panel'}
          </h1>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;